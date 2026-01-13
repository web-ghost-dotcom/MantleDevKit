export const COMPILER_VERSION = "0.0.1";
export * from './templates';
export * from './subgraph';
export * from './verification';

export interface CompilationResult {
    bytecode: string;
    abi: any[];
    errors?: any[];
    contractName?: string;
}

// ============================================================================
// PRODUCTION-GRADE IMPORT RESOLVER
// Uses OpenZeppelin's GitHub raw content for reliable dependency resolution
// Handles all Solidity import patterns including named, default, and relative
// ============================================================================

interface DependencyCache {
    [key: string]: string;
}

// Global cache to avoid refetching in same session
const dependencyCache: DependencyCache = {};

// OpenZeppelin version mapping - we pin to a stable release
const OZ_VERSION = "v5.0.0";
const OZ_GITHUB_BASE = `https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/${OZ_VERSION}/contracts`;

// Multiple CDN fallbacks for resilience
const CDN_SOURCES = [
    (path: string) => `https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/${OZ_VERSION}/contracts/${path.replace('@openzeppelin/contracts/', '')}`,
    (path: string) => `https://unpkg.com/${path}`,
    (path: string) => `https://cdn.jsdelivr.net/npm/${path}`,
];

/**
 * Parse all import statements from Solidity source code
 * Handles: import "path"; import {A,B} from "path"; import * as X from "path";
 */
function extractImports(source: string): string[] {
    const imports: string[] = [];

    // Pattern 1: import "path.sol";
    const simpleImport = /import\s+["']([^"']+)["']\s*;/g;
    let match;
    while ((match = simpleImport.exec(source)) !== null) {
        imports.push(match[1]);
    }

    // Pattern 2: import {X, Y, Z} from "path.sol"; or import * as X from "path.sol";
    const fromImport = /import\s+(?:\{[^}]*\}|\*\s+as\s+\w+)\s+from\s+["']([^"']+)["']\s*;/g;
    while ((match = fromImport.exec(source)) !== null) {
        imports.push(match[1]);
    }

    // Pattern 3: import X from "path.sol"; (default import)
    const defaultImport = /import\s+(\w+)\s+from\s+["']([^"']+)["']\s*;/g;
    while ((match = defaultImport.exec(source)) !== null) {
        imports.push(match[2]);
    }

    return [...new Set(imports)]; // Dedupe
}

/**
 * Resolve a relative path against a base path
 * e.g., resolvePath("../utils/Context.sol", "@openzeppelin/contracts/access/Ownable.sol")
 *       -> "@openzeppelin/contracts/utils/Context.sol"
 */
function resolvePath(importPath: string, currentFile: string): string {
    if (!importPath.startsWith('.')) {
        return importPath;
    }

    // Get directory of current file
    const lastSlash = currentFile.lastIndexOf('/');
    const currentDir = lastSlash >= 0 ? currentFile.substring(0, lastSlash) : '';

    // Split and resolve
    const combined = currentDir ? `${currentDir}/${importPath}` : importPath;
    const parts = combined.split('/');
    const resolved: string[] = [];

    for (const part of parts) {
        if (part === '' || part === '.') continue;
        if (part === '..') {
            resolved.pop();
        } else {
            resolved.push(part);
        }
    }

    return resolved.join('/');
}

/**
 * Fetch a dependency with fallback across multiple CDNs
 */
async function fetchWithFallback(path: string): Promise<string> {
    // Check cache first
    if (dependencyCache[path]) {
        return dependencyCache[path];
    }

    const errors: string[] = [];

    for (const getUrl of CDN_SOURCES) {
        const url = getUrl(path);
        try {
            const response = await fetch(url);
            if (response.ok) {
                const content = await response.text();
                // Validate it looks like Solidity
                if (content.includes('pragma solidity') || content.includes('// SPDX-License-Identifier')) {
                    dependencyCache[path] = content;
                    return content;
                }
            }
        } catch (e) {
            errors.push(`${url}: ${e}`);
        }
    }

    throw new Error(`Failed to fetch ${path} from all sources. Tried: ${errors.join(', ')}`);
}

/**
 * Recursively resolve all imports for a Solidity source file
 * Returns a complete map of all source files needed for compilation
 */
async function resolveAllImports(
    source: string,
    filename: string = 'Contract.sol'
): Promise<Record<string, { content: string }>> {
    const sources: Record<string, { content: string }> = {
        [filename]: { content: source }
    };

    const processed = new Set<string>([filename]);
    const queue: Array<{ file: string; content: string }> = [{ file: filename, content: source }];

    while (queue.length > 0) {
        const current = queue.shift()!;
        const imports = extractImports(current.content);

        for (const importPath of imports) {
            const resolvedPath = resolvePath(importPath, current.file);

            if (processed.has(resolvedPath)) continue;
            processed.add(resolvedPath);

            try {
                const content = await fetchWithFallback(resolvedPath);
                sources[resolvedPath] = { content };
                queue.push({ file: resolvedPath, content });
            } catch (e) {
                console.error(`[Compiler] Failed to resolve: ${resolvedPath}`, e);
                // Continue - let solc report the actual error for better UX
            }
        }
    }

    return sources;
}

/**
 * Production-ready Solidity Compiler
 * - Recursive dependency resolution with CDN fallback
 * - Web Worker isolation for non-blocking compilation
 * - Comprehensive error handling
 */
export class SolidityCompiler {
    private workerUrl: URL;

    constructor() {
        this.workerUrl = new URL('./workers/solc.worker.js', import.meta.url);
    }

    async compile(source: string, contractFilename: string = 'Contract.sol'): Promise<CompilationResult> {
        // Step 1: Resolve all dependencies
        const sources = await resolveAllImports(source, contractFilename);

        // Step 2: Compile in Web Worker
        return new Promise((resolve, reject) => {
            const worker = new Worker(this.workerUrl);

            const timeout = setTimeout(() => {
                worker.terminate();
                reject(new Error('Compilation timed out after 60 seconds'));
            }, 60000);

            worker.onmessage = (e) => {
                clearTimeout(timeout);
                const { type, output, error } = e.data;

                if (type === 'error') {
                    worker.terminate();
                    reject(new Error(error));
                    return;
                }

                // Parse compilation output
                if (output.errors) {
                    const criticalErrors = output.errors.filter((err: any) => err.severity === 'error');
                    if (criticalErrors.length > 0) {
                        worker.terminate();
                        resolve({
                            bytecode: '',
                            abi: [],
                            errors: output.errors
                        });
                        return;
                    }
                }

                // Find the main contract (from our input file)
                const mainFileContracts = output.contracts[contractFilename];
                if (!mainFileContracts || Object.keys(mainFileContracts).length === 0) {
                    worker.terminate();
                    resolve({
                        bytecode: '',
                        abi: [],
                        errors: [{ severity: 'error', formattedMessage: 'No deployable contract found in source.' }]
                    });
                    return;
                }

                // Get the first (or primary) contract
                const contractName = Object.keys(mainFileContracts)[0];
                const artifact = mainFileContracts[contractName];

                worker.terminate();
                resolve({
                    bytecode: artifact.evm.bytecode.object,
                    abi: artifact.abi,
                    contractName,
                    errors: output.errors?.filter((e: any) => e.severity === 'warning')
                });
            };

            worker.onerror = (e) => {
                clearTimeout(timeout);
                worker.terminate();
                reject(new Error(`Worker error: ${e.message}`));
            };

            worker.postMessage({ sources });
        });
    }
}

