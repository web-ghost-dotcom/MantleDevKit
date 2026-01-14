// ============================================================================
// DOCUMENTATION - API REFERENCE
// ============================================================================

export default function APIPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    ADVANCED
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    API REFERENCE
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Reference documentation for MantleDevKit packages.
                </p>
            </header>

            {/* @mantle/ai */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">@mantle/ai</h2>
                <p className="text-gray-400 mb-4">
                    AI-powered contract and UI generation.
                </p>

                <div className="space-y-4">
                    <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                        <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                            AIClient
                        </div>
                        <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`import { AIClient } from '@mantle/ai';

const client = new AIClient({
  provider: 'gemini' | 'openai' | 'claude',
  apiKey: 'your-api-key',
  model?: 'optional-model-name'
});

// Generate a smart contract
const contract = await client.generateContract(prompt);
// Returns: { code: string, explanation: string, name: string }

// Generate UI for a contract
const ui = await client.generateUI(abi, address, stylePrompt?);
// Returns: { code: string }`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* @mantle/compiler */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">@mantle/compiler</h2>
                <p className="text-gray-400 mb-4">
                    Solidity compilation, templates, and verification.
                </p>

                <div className="space-y-4">
                    <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                        <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                            SolidityCompiler
                        </div>
                        <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`import { SolidityCompiler } from '@mantle/compiler';

const compiler = new SolidityCompiler();

const result = await compiler.compile(sourceCode, filename?);
// Returns: {
//   bytecode: string,
//   abi: any[],
//   contractName?: string,
//   errors?: CompilationError[]
// }`}
                        </pre>
                    </div>

                    <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                        <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                            Templates
                        </div>
                        <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`import {
  ERC20TokenTemplate,
  ERC721NFTTemplate,
  ERC1155Template,
  GovernanceTemplate,
  StakingTemplate,
  MultisigTemplate,
  TimelockTemplate
} from '@mantle/compiler';

// Each template is a string containing Solidity code`}
                        </pre>
                    </div>

                    <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                        <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                            generateSubgraph
                        </div>
                        <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`import { generateSubgraph } from '@mantle/compiler';

const files = generateSubgraph(
  contractName,
  contractAddress,
  abi,
  network? // default: 'mantle-sepolia'
);
// Returns: Record<string, string>
// Keys: 'schema.graphql', 'subgraph.yaml', etc.`}
                        </pre>
                    </div>

                    <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                        <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                            verifyContract
                        </div>
                        <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`import { verifyContract, checkVerificationStatus } from '@mantle/compiler';

const result = await verifyContract(chainId, {
  contractAddress: '0x...',
  sourceCode: 'pragma solidity...',
  contractName: 'MyContract',
  compilerVersion: 'v0.8.20+commit.a1b79de6',
  optimizationUsed: false,
  constructorArguments?: '0x...',
});
// Returns: { success: boolean, message: string, guid?: string }

// Check status if pending
const status = await checkVerificationStatus(chainId, guid);`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* @mantle/storage */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">@mantle/storage</h2>
                <p className="text-gray-400 mb-4">
                    Local storage for projects and settings.
                </p>

                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        StorageManager
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`import { StorageManager } from '@mantle/storage';

const storage = new StorageManager(useLocalStorage?: boolean);

// Projects
await storage.saveProject(project);
const projects = await storage.getProjects();

// Settings
await storage.saveSettings(settings);
const settings = await storage.getSettings();

// Quests
await storage.completeQuest(questId);
const completed = storage.getCompletedQuests();`}
                    </pre>
                </div>
            </section>

            {/* Types */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">TYPES</h2>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`// AI Types
type AIProvider = 'gemini' | 'openai' | 'claude';

interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  model?: string;
}

// Compiler Types
interface CompilationResult {
  bytecode: string;
  abi: any[];
  errors?: any[];
  contractName?: string;
}

// Storage Types
interface Project {
  id?: number;
  name: string;
  contractCode: string;
  abi: any[];
  address?: string;
  createdAt: Date;
}

interface UserSettings {
  id?: number;
  aiProvider: AIProvider;
  geminiKey?: string;
  openaiKey?: string;
  claudeKey?: string;
}`}
                    </pre>
                </div>
            </section>
        </article>
    );
}
