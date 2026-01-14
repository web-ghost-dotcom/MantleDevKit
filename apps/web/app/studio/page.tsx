'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWalletClient, useAccount, useChainId, useBalance, usePublicClient, useEstimateGas } from 'wagmi';
import { AIClient, UIGenerationProgress } from '@mantle/ai';
import { 
    SolidityCompiler, 
    ERC20TokenTemplate, 
    ERC721NFTTemplate, 
    GovernanceTemplate,
    StakingTemplate,
    MultisigTemplate,
    ERC1155Template,
    TimelockTemplate,
    generateSubgraph 
} from '@mantle/compiler';
import { StorageManager, Project } from '@mantle/storage';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useSettings } from '@/app/settings-context';
import { motion, AnimatePresence } from 'framer-motion';
import { formatEther, parseEther, encodeFunctionData } from 'viem';

// Components
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ErrorBoundary, EditorErrorBoundary, PreviewErrorBoundary } from '@/components/ErrorBoundary';
import { NetworkSwitcher } from '@/components/NetworkSwitcher';
import {
    IconMantleLogo,
    IconSettings,
    IconCode,
    IconCompile,
    IconDeploy,
    IconCheck,
    IconArrowRight,
    IconToken,
    IconNFT,
    IconDAO,
    IconDownload,
    IconCopy,
    IconRefresh,
    IconSpinner,
    IconFile,
    IconFolder,
    IconPlay,
    IconTerminal,
    IconLayers,
    IconPlus,
    IconX,
    IconChevronRight,
    IconChevronDown,
    IconWindow,
    IconGraph,
    IconLock,
    IconBolt,
    IconNetwork,
    IconBlocks
} from '@/components/icons';
import DynamicInterface from '@/app/components/DynamicInterface';

// Lazy load Monaco Editor (client-side only)
const CodeEditor = dynamic(() => import('@/components/editor/CodeEditor'), {
    ssr: false,
    loading: () => (
        <div className="h-full flex items-center justify-center bg-gray-950">
            <div className="text-sm text-gray-500 font-mono">Loading editor...</div>
        </div>
    )
});

const UIPreview = dynamic(() => import('@/components/editor/UIPreview'), { ssr: false });

// ============================================================================
// MANTLE DEVKIT STUDIO - FULL IDE
// Monaco Editor, Split Panels, File Tree, Console, UI Generation
// ============================================================================

type PanelTab = 'code' | 'abi' | 'bytecode';
type RightPanelTab = 'preview' | 'interact' | 'subgraph';

interface LogEntry {
    id: number;
    type: 'info' | 'success' | 'error' | 'warning';
    message: string;
    timestamp: Date;
}

interface ConstructorArg {
    name: string;
    type: string;
    value: string;
    error?: string;
}

interface ContractResult {
    code: string;
    explanation: string;
    name?: string;
    bytecode?: string;
    abi?: any[];
}

const TEMPLATES = [
    { id: 'erc20', name: 'ERC-20 Token', icon: IconToken, code: ERC20TokenTemplate, file: 'Token.sol', category: 'tokens' },
    { id: 'erc721', name: 'ERC-721 NFT', icon: IconNFT, code: ERC721NFTTemplate, file: 'NFT.sol', category: 'tokens' },
    { id: 'erc1155', name: 'ERC-1155 Multi', icon: IconBlocks, code: ERC1155Template, file: 'MultiToken.sol', category: 'tokens' },
    { id: 'dao', name: 'Governance', icon: IconDAO, code: GovernanceTemplate, file: 'Governance.sol', category: 'governance' },
    { id: 'timelock', name: 'Timelock', icon: IconLock, code: TimelockTemplate, file: 'Timelock.sol', category: 'governance' },
    { id: 'staking', name: 'Staking Pool', icon: IconBolt, code: StakingTemplate, file: 'Staking.sol', category: 'defi' },
    { id: 'multisig', name: 'Multisig Wallet', icon: IconLayers, code: MultisigTemplate, file: 'Multisig.sol', category: 'security' },
];

export default function StudioPage() {
    // State
    const [prompt, setPrompt] = useState('');
    const [code, setCode] = useState('');
    const [result, setResult] = useState<ContractResult | null>(null);
    const [deployedAddress, setDeployedAddress] = useState<string | null>(null);
    const [activeLeftTab, setActiveLeftTab] = useState<PanelTab>('code');
    const [activeRightTab, setActiveRightTab] = useState<RightPanelTab>('preview');
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [showConsole, setShowConsole] = useState(true);
    const [showPrompt, setShowPrompt] = useState(true);
    const [selectedFile, setSelectedFile] = useState<string>('Contract.sol');
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['contracts', 'templates']));
    const [generatedUI, setGeneratedUI] = useState<string>('');

    // Constructor arguments
    const [constructorArgs, setConstructorArgs] = useState<ConstructorArg[]>([]);
    const [showDeployModal, setShowDeployModal] = useState(false);

    // Project state
    const [savedProjects, setSavedProjects] = useState<Project[]>([]);
    const [showProjectsPanel, setShowProjectsPanel] = useState(false);

    // Subgraph files
    const [subgraphFiles, setSubgraphFiles] = useState<Record<string, string>>({});

    // Loading states
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCompiling, setIsCompiling] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);
    const [isGeneratingUI, setIsGeneratingUI] = useState(false);
    const [uiGenerationProgress, setUIGenerationProgress] = useState<UIGenerationProgress | null>(null);

    // Gas estimation
    const [estimatedGas, setEstimatedGas] = useState<bigint | null>(null);
    const [gasPrice, setGasPrice] = useState<bigint | null>(null);

    // Mobile menu
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Refs
    const consoleRef = useRef<HTMLDivElement>(null);
    const logIdRef = useRef(0);

    // Hooks
    const { settings, openSettings } = useSettings();
    const { data: walletClient } = useWalletClient();
    const publicClient = usePublicClient();
    const { isConnected, address } = useAccount();
    const chainId = useChainId();
    const { data: balance } = useBalance({ address });
    const storage = new StorageManager(true);

    // Load saved projects
    useEffect(() => {
        storage.getProjects().then(setSavedProjects);
    }, []);

    // Auto-scroll console
    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [logs]);

    // Logger
    const log = useCallback((type: LogEntry['type'], message: string) => {
        setLogs(prev => [...prev, {
            id: logIdRef.current++,
            type,
            message,
            timestamp: new Date()
        }]);
    }, []);

    // Initial log
    useEffect(() => {
        log('info', 'MantleDevKit Studio v1.0.0');
        log('info', 'Solidity compiler ready (^0.8.20)');
        log('info', 'OpenZeppelin contracts v5.0.0');
        log('success', 'Ready');
    }, [log]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl/Cmd + S to compile
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                if (code && !isCompiling) {
                    handleCompile();
                }
            }
            // Ctrl/Cmd + Shift + D to deploy
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                if (result?.bytecode && isConnected && !isDeploying) {
                    handleStartDeploy();
                }
            }
            // Ctrl/Cmd + E to export
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                if (code) {
                    handleExport();
                }
            }
            // Escape to close modals
            if (e.key === 'Escape') {
                setShowDeployModal(false);
                setShowProjectsPanel(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [code, result, isConnected, isCompiling, isDeploying]);

    // AI Client
    const getAIClient = (): AIClient | null => {
        let apiKey = '';
        if (settings.aiProvider === 'gemini') apiKey = settings.geminiKey || '';
        if (settings.aiProvider === 'openai') apiKey = settings.openaiKey || '';
        if (settings.aiProvider === 'claude') apiKey = settings.claudeKey || '';

        if (!apiKey) {
            log('error', `Configure ${settings.aiProvider} API key in settings`);
            openSettings();
            return null;
        }
        return new AIClient({ provider: settings.aiProvider, apiKey });
    };

    // Handlers
    const handleSelectTemplate = (templateId: string) => {
        const template = TEMPLATES.find(t => t.id === templateId);
        if (template) {
            setSelectedFile(template.file);
            setCode(template.code);
            setResult({
                code: template.code,
                explanation: `Standard ${template.name} implementation.`,
                name: template.name,
            });
            setActiveLeftTab('code');
            log('success', `Loaded: ${template.file}`);
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        const ai = getAIClient();
        if (!ai) return;

        setIsGenerating(true);
        log('info', `Generating contract [${settings.aiProvider}]...`);

        try {
            const response = await ai.generateContract(prompt);
            setCode(response.code);
            setResult(response);
            setSelectedFile('Generated.sol');
            setActiveLeftTab('code');
            log('success', 'Contract generated');
            log('info', `${response.code.split('\n').length} lines`);
        } catch (e: any) {
            log('error', e.message || 'Generation failed');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCompile = async () => {
        if (!code) return;

        setIsCompiling(true);
        log('info', 'Compiling...');

        try {
            const compiler = new SolidityCompiler();
            const compilation = await compiler.compile(code);

            if (compilation.errors && compilation.errors.length > 0) {
                compilation.errors.forEach((e: any) => {
                    if (e.severity === 'error') log('error', e.formattedMessage);
                    else log('warning', e.formattedMessage);
                });
                if (compilation.errors.some((e: any) => e.severity === 'error')) {
                    setIsCompiling(false);
                    return;
                }
            }

            log('success', `Compiled: ${compilation.contractName}`);
            log('info', `Bytecode: ${Math.round((compilation.bytecode?.length || 0) / 2048)}KB`);
            log('info', `Functions: ${compilation.abi?.filter((x: any) => x.type === 'function').length || 0}`);

            setResult(prev => prev ? {
                ...prev,
                bytecode: compilation.bytecode,
                abi: compilation.abi,
                name: compilation.contractName || prev.name,
            } : {
                code,
                explanation: '',
                bytecode: compilation.bytecode,
                abi: compilation.abi,
                name: compilation.contractName,
            });

        } catch (e: any) {
            log('error', e.message || 'Compilation failed');
        } finally {
            setIsCompiling(false);
        }
    };

    // Prepare constructor args from ABI
    const getConstructorInputs = useCallback(() => {
        if (!result?.abi) return [];
        const constructor = result.abi.find((item: any) => item.type === 'constructor');
        return constructor?.inputs || [];
    }, [result?.abi]);

    // Update constructor args when ABI changes
    useEffect(() => {
        const inputs = getConstructorInputs();
        if (inputs.length > 0) {
            setConstructorArgs(inputs.map((input: any) => ({
                name: input.name,
                type: input.type,
                value: '',
                error: undefined
            })));
        } else {
            setConstructorArgs([]);
        }
    }, [getConstructorInputs]);

    // Validate constructor arg value based on type
    const validateArgValue = (value: string, type: string): string | undefined => {
        if (!value.trim()) return 'Required';
        
        try {
            if (type.startsWith('uint') || type.startsWith('int')) {
                const num = BigInt(value);
                if (type.startsWith('uint') && num < 0n) {
                    return 'Must be positive';
                }
                return undefined;
            }
            if (type === 'address') {
                if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
                    return 'Invalid address format';
                }
                return undefined;
            }
            if (type === 'bool') {
                if (value.toLowerCase() !== 'true' && value.toLowerCase() !== 'false') {
                    return 'Must be true or false';
                }
                return undefined;
            }
            if (type.includes('[]')) {
                JSON.parse(value);
                return undefined;
            }
            return undefined;
        } catch {
            return `Invalid ${type} format`;
        }
    };

    // Parse constructor arg value based on type
    const parseArgValue = (value: string, type: string): any => {
        if (type.startsWith('uint') || type.startsWith('int')) {
            return BigInt(value || '0');
        }
        if (type === 'bool') {
            return value.toLowerCase() === 'true';
        }
        if (type.includes('[]')) {
            try {
                return JSON.parse(value);
            } catch {
                return [];
            }
        }
        return value;
    };

    // Estimate gas for deployment
    const estimateDeploymentGas = async (args: any[]) => {
        if (!publicClient || !result?.bytecode || !result?.abi || !address) return;

        try {
            const gas = await publicClient.estimateGas({
                account: address,
                data: `0x${result.bytecode}` as `0x${string}`,
            });
            setEstimatedGas(gas);

            const price = await publicClient.getGasPrice();
            setGasPrice(price);

            const cost = gas * price;
            log('info', `Estimated gas: ${gas.toString()} (~${parseFloat(formatEther(cost)).toFixed(6)} MNT)`);
        } catch (e: any) {
            log('warning', 'Could not estimate gas');
        }
    };

    const handleStartDeploy = () => {
        const inputs = getConstructorInputs();
        if (inputs.length > 0) {
            setShowDeployModal(true);
            // Estimate gas with empty args for now
            estimateDeploymentGas([]);
        } else {
            // No constructor args, estimate and show deploy modal
            estimateDeploymentGas([]);
            handleDeploy([]);
        }
    };

    const handleDeploy = async (args: any[]) => {
        if (!walletClient || !publicClient || !result?.bytecode || !result?.abi) {
            log('error', 'Connect wallet and compile first');
            return;
        }

        setShowDeployModal(false);
        setIsDeploying(true);
        log('info', `Deploying to chain ${chainId}...`);

        try {
            // Deploy contract
            const hash = await walletClient.deployContract({
                abi: result.abi,
                bytecode: `0x${result.bytecode}`,
                args: args,
            });

            log('success', `TX: ${hash.slice(0, 22)}...`);
            log('info', 'Waiting for confirmation...');

            // Wait for transaction receipt to get contract address
            const receipt = await publicClient.waitForTransactionReceipt({ hash });

            if (receipt.contractAddress) {
                setDeployedAddress(receipt.contractAddress);
                log('success', `Deployed at: ${receipt.contractAddress}`);

                // Generate subgraph files
                const files = generateSubgraph(result.name || 'Contract', receipt.contractAddress, result.abi);
                setSubgraphFiles(files);

                // Save project
                await storage.saveProject({
                    name: result.name || 'Contract',
                    contractCode: code,
                    abi: result.abi,
                    address: receipt.contractAddress,
                    createdAt: new Date()
                });

                // Reload projects
                const projects = await storage.getProjects();
                setSavedProjects(projects);

                setActiveRightTab('interact');
            } else {
                log('error', 'No contract address in receipt');
            }

            await storage.completeQuest('deploy-first-contract');
        } catch (e: any) {
            log('error', e.message || 'Deployment failed');
        } finally {
            setIsDeploying(false);
        }
    };

    const handleGenerateUI = async () => {
        if (!result?.abi) {
            log('error', 'Compile contract first');
            return;
        }

        const ai = getAIClient();
        if (!ai) return;

        setIsGeneratingUI(true);
        setUIGenerationProgress(null);
        setActiveRightTab('preview');
        log('info', 'Starting UI generation...');

        try {
            const code = await ai.generateUIWithProgress(
                result.abi,
                deployedAddress || '0x0000000000000000000000000000000000000000',
                undefined,
                (progress) => {
                    setUIGenerationProgress(progress);
                    
                    // Log progress updates
                    if (progress.step === 'planning' && progress.plan) {
                        log('info', `Planning: ${progress.plan.appName} (${progress.totalComponents} components)`);
                    } else if (progress.step === 'generating' && progress.currentComponent) {
                        log('info', `Generating: ${progress.currentComponent}`);
                    } else if (progress.step === 'assembling') {
                        log('info', 'Assembling final application...');
                    }
                }
            );
            
            setGeneratedUI(code);
            log('success', 'UI generation complete!');
        } catch (e: any) {
            log('error', e.message || 'UI generation failed');
            setUIGenerationProgress(null);
        } finally {
            setIsGeneratingUI(false);
        }
    };

    const handleExport = async () => {
        const zip = new JSZip();

        // Contract
        if (code) {
            zip.file(`contracts/${selectedFile}`, code);
        }

        // Artifacts
        if (result?.abi) {
            zip.file('artifacts/abi.json', JSON.stringify(result.abi, null, 2));
        }
        if (result?.bytecode) {
            zip.file('artifacts/bytecode.txt', result.bytecode);
        }

        // Generated UI
        if (generatedUI) {
            zip.file('frontend/ContractUI.tsx', generatedUI);
        }

        // Subgraph
        if (deployedAddress && result?.abi) {
            const subgraphFiles = generateSubgraph(result.name || 'Contract', deployedAddress, result.abi);
            Object.entries(subgraphFiles).forEach(([path, content]) => {
                zip.file(`subgraph/${path}`, content);
            });
        }

        // Deploy script
        zip.file('scripts/deploy.ts', `import { ethers } from "hardhat";

async function main() {
  const Contract = await ethers.getContractFactory("${result?.name || 'Contract'}");
  const contract = await Contract.deploy();
  await contract.waitForDeployment();
  console.log("Deployed to:", await contract.getAddress());
}

main().catch(console.error);
`);

        // Hardhat config
        zip.file('hardhat.config.ts', `import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    mantle: {
      url: "https://rpc.mantle.xyz",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    mantleSepolia: {
      url: "https://rpc.sepolia.mantle.xyz",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      mantle: process.env.ETHERSCAN_API_KEY || "",
      mantleSepolia: process.env.ETHERSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "mantle",
        chainId: 5000,
        urls: {
          apiURL: "https://explorer.mantle.xyz/api",
          browserURL: "https://explorer.mantle.xyz",
        },
      },
      {
        network: "mantleSepolia",
        chainId: 5003,
        urls: {
          apiURL: "https://explorer.sepolia.mantle.xyz/api",
          browserURL: "https://explorer.sepolia.mantle.xyz",
        },
      },
    ],
  },
};

export default config;
`);

        // Environment example
        zip.file('.env.example', `PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_api_key_here
`);

        // README
        zip.file('README.md', `# ${result?.name || 'Contract'}

Smart contract generated with MantleDevKit.

## Setup

\`\`\`bash
npm install
\`\`\`

## Compile

\`\`\`bash
npm run compile
\`\`\`

## Deploy

\`\`\`bash
# Set your private key
cp .env.example .env
# Edit .env with your private key

# Deploy to Mantle Sepolia
npm run deploy -- --network mantleSepolia

# Deploy to Mantle Mainnet
npm run deploy -- --network mantle
\`\`\`

## Contract Address

${deployedAddress ? `Deployed at: \`${deployedAddress}\`` : 'Not yet deployed'}

## ABI

See \`artifacts/abi.json\`
`);

        // Test file
        zip.file('test/Contract.test.ts', `import { expect } from "chai";
import { ethers } from "hardhat";

describe("${result?.name || 'Contract'}", function () {
  it("Should deploy successfully", async function () {
    const Contract = await ethers.getContractFactory("${result?.name || 'Contract'}");
    const contract = await Contract.deploy();
    expect(await contract.getAddress()).to.be.properAddress;
  });
});
`);

        // Package.json
        zip.file('package.json', JSON.stringify({
            name: result?.name?.toLowerCase() || 'contract',
            version: '1.0.0',
            scripts: {
                compile: 'hardhat compile',
                deploy: 'hardhat run scripts/deploy.ts',
                test: 'hardhat test'
            },
            devDependencies: {
                "hardhat": "^2.19.0",
                "@nomicfoundation/hardhat-toolbox": "^4.0.0",
                "dotenv": "^16.3.1"
            }
        }, null, 2));

        // TypeScript config
        zip.file('tsconfig.json', JSON.stringify({
            compilerOptions: {
                target: "es2020",
                module: "commonjs",
                strict: true,
                esModuleInterop: true,
                outDir: "dist"
            },
            include: ["./scripts", "./test"],
            files: ["./hardhat.config.ts"]
        }, null, 2));

        const blob = await zip.generateAsync({ type: 'blob' });
        saveAs(blob, `${result?.name || 'project'}.zip`);
        log('success', 'Project exported');
    };

    const copyToClipboard = async (text: string, label: string) => {
        try {
            await navigator.clipboard.writeText(text);
            log('success', `Copied ${label} to clipboard`);
        } catch {
            log('error', 'Failed to copy to clipboard');
        }
    };

    const handleLoadProject = (project: Project) => {
        setCode(project.contractCode);
        setResult({
            code: project.contractCode,
            explanation: '',
            name: project.name,
            abi: project.abi,
        });
        if (project.address) {
            setDeployedAddress(project.address);
            const files = generateSubgraph(project.name, project.address, project.abi);
            setSubgraphFiles(files);
        }
        setSelectedFile(`${project.name}.sol`);
        setShowProjectsPanel(false);
        log('success', `Loaded project: ${project.name}`);
    };

    const handleDeleteProject = async (project: Project) => {
        if (!project.id) return;
        try {
            await storage.deleteProject(project.id);
            setSavedProjects(prev => prev.filter(p => p.id !== project.id));
            log('success', `Deleted project: ${project.name}`);
        } catch (err) {
            log('error', `Failed to delete project: ${err}`);
        }
    };

    const toggleFolder = (folder: string) => {
        setExpandedFolders(prev => {
            const next = new Set(prev);
            if (next.has(folder)) next.delete(folder);
            else next.add(folder);
            return next;
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const getNetworkName = (id: number) => {
        const networks: Record<number, string> = {
            5000: 'Mantle',
            5003: 'Mantle Sepolia',
            1: 'Ethereum',
            11155111: 'Sepolia',
        };
        return networks[id] || `Chain ${id}`;
    };

    return (
        <ErrorBoundary>
            <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">

                {/* Menu Bar */}
                <header className="h-10 border-b border-gray-800 bg-gray-900 flex items-center justify-between px-3 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <IconMantleLogo size={18} />
                            <span className="text-sm font-black hidden sm:inline">DEVKIT</span>
                        </div>

                        <div className="h-4 w-px bg-gray-700 hidden sm:block" />

                        {/* Desktop menu */}
                        <div className="hidden sm:flex items-center gap-1">
                            <button 
                                onClick={() => setShowProjectsPanel(true)}
                                className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                            >
                                Projects
                            </button>
                            <button className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                                Edit
                            </button>
                            <button className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                                View
                            </button>
                            <button
                                onClick={handleCompile}
                                disabled={!code || isCompiling}
                                className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                Build
                            </button>
                            <button
                                onClick={handleStartDeploy}
                                disabled={!result?.bytecode || isDeploying}
                                className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                Deploy
                            </button>
                        </div>

                        {/* Mobile hamburger */}
                        <button 
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="sm:hidden p-1 text-gray-400 hover:text-white"
                        >
                            <IconBlocks size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Keyboard shortcuts hint */}
                        <div className="hidden lg:flex items-center gap-2 text-[10px] text-gray-600">
                            <span>⌘S compile</span>
                            <span>⌘⇧D deploy</span>
                        </div>

                        <NetworkSwitcher />

                        <Button variant="ghost" size="sm" onClick={openSettings}>
                            <IconSettings size={14} />
                        </Button>

                        <ConnectButton.Custom>
                            {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
                                if (!mounted || !account || !chain) {
                                    return (
                                        <button
                                            onClick={openConnectModal}
                                            className="px-3 py-1 text-xs font-bold bg-blue-600 hover:bg-blue-500"
                                        >
                                            CONNECT
                                        </button>
                                    );
                                }
                                return (
                                    <button
                                        onClick={openAccountModal}
                                        className="flex items-center gap-2 px-2 py-1 bg-gray-800 border border-gray-700 hover:border-gray-600"
                                    >
                                        <span className="w-1.5 h-1.5 bg-green-400" />
                                        <span className="text-xs font-mono">{account.displayName}</span>
                                    </button>
                                );
                            }}
                        </ConnectButton.Custom>
                    </div>
                </header>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {showMobileMenu && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="sm:hidden bg-gray-900 border-b border-gray-800 overflow-hidden"
                        >
                            <div className="p-2 flex flex-wrap gap-2">
                                <button 
                                    onClick={() => { setShowProjectsPanel(true); setShowMobileMenu(false); }}
                                    className="px-3 py-2 text-xs bg-gray-800 hover:bg-gray-700"
                                >
                                    Projects
                                </button>
                                <button
                                    onClick={() => { handleCompile(); setShowMobileMenu(false); }}
                                    disabled={!code || isCompiling}
                                    className="px-3 py-2 text-xs bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
                                >
                                    {isCompiling ? 'Compiling...' : 'Compile'}
                                </button>
                                <button
                                    onClick={() => { handleStartDeploy(); setShowMobileMenu(false); }}
                                    disabled={!result?.bytecode || isDeploying}
                                    className="px-3 py-2 text-xs bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
                                >
                                    {isDeploying ? 'Deploying...' : 'Deploy'}
                                </button>
                                <button
                                    onClick={() => { handleExport(); setShowMobileMenu(false); }}
                                    disabled={!code}
                                    className="px-3 py-2 text-xs bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
                                >
                                    Export
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main IDE Layout */}
                <div className="flex-1 flex overflow-hidden">

                    {/* Left Sidebar - Explorer (hidden on mobile) */}
                    <aside className="hidden md:flex w-52 border-r border-gray-800 bg-gray-900 flex-col flex-shrink-0">

                        {/* AI Prompt */}
                        {showPrompt && (
                            <div className="p-2 border-b border-gray-800">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-bold text-gray-500 tracking-widest">AI GENERATE</span>
                                    <button onClick={() => setShowPrompt(false)} className="text-gray-600 hover:text-white">
                                        <IconX size={10} />
                                    </button>
                                </div>
                                <textarea
                                    placeholder="Describe contract..."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="w-full h-16 bg-gray-950 border border-gray-700 p-1.5 text-[11px] font-mono resize-none focus:outline-none focus:border-gray-600"
                                />
                                <button
                                    onClick={handleGenerate}
                                    disabled={!prompt.trim() || isGenerating}
                                    className="w-full mt-1 py-1 text-[10px] font-bold bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                                >
                                    {isGenerating ? <IconSpinner size={10} /> : <IconPlay size={10} />}
                                    GENERATE
                                </button>
                            </div>
                        )}

                        {/* File Explorer */}
                        <div className="flex-1 overflow-auto py-2 text-[11px]">
                            <div className="px-2 mb-1 text-[10px] font-bold text-gray-500 tracking-widest">
                                EXPLORER
                            </div>

                            {/* Contracts folder */}
                            <div>
                                <button
                                    onClick={() => toggleFolder('contracts')}
                                    className="w-full flex items-center gap-1 px-2 py-0.5 text-gray-400 hover:bg-gray-800"
                                >
                                    {expandedFolders.has('contracts') ? <IconChevronDown size={12} /> : <IconChevronRight size={12} />}
                                    <IconFolder size={12} />
                                    <span>contracts</span>
                                </button>
                                {expandedFolders.has('contracts') && (
                                    <div className="ml-4">
                                        {selectedFile && !TEMPLATES.some(t => t.file === selectedFile) && (
                                            <button
                                                onClick={() => setActiveLeftTab('code')}
                                                className={`w-full flex items-center gap-1 px-2 py-0.5 ${selectedFile ? 'text-white bg-gray-800' : 'text-gray-400 hover:bg-gray-800'
                                                    }`}
                                            >
                                                <IconFile size={12} />
                                                <span className="font-mono">{selectedFile}</span>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Templates folder */}
                            <div className="mt-1">
                                <button
                                    onClick={() => toggleFolder('templates')}
                                    className="w-full flex items-center gap-1 px-2 py-0.5 text-gray-400 hover:bg-gray-800"
                                >
                                    {expandedFolders.has('templates') ? <IconChevronDown size={12} /> : <IconChevronRight size={12} />}
                                    <IconFolder size={12} />
                                    <span>templates</span>
                                </button>
                                {expandedFolders.has('templates') && (
                                    <div className="ml-4">
                                        {TEMPLATES.map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() => handleSelectTemplate(t.id)}
                                                className={`w-full flex items-center gap-1 px-2 py-0.5 ${selectedFile === t.file
                                                    ? 'text-white bg-gray-800'
                                                    : 'text-gray-400 hover:bg-gray-800'
                                                    }`}
                                            >
                                                <IconFile size={12} />
                                                <span className="font-mono">{t.file}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Artifacts folder */}
                            {result?.abi && (
                                <div className="mt-1">
                                    <button
                                        onClick={() => toggleFolder('artifacts')}
                                        className="w-full flex items-center gap-1 px-2 py-0.5 text-gray-400 hover:bg-gray-800"
                                    >
                                        {expandedFolders.has('artifacts') ? <IconChevronDown size={12} /> : <IconChevronRight size={12} />}
                                        <IconFolder size={12} />
                                        <span>artifacts</span>
                                    </button>
                                    {expandedFolders.has('artifacts') && (
                                        <div className="ml-4">
                                            <button
                                                onClick={() => setActiveLeftTab('abi')}
                                                className={`w-full flex items-center gap-1 px-2 py-0.5 ${activeLeftTab === 'abi' ? 'text-white bg-gray-800' : 'text-gray-400 hover:bg-gray-800'
                                                    }`}
                                            >
                                                <IconFile size={12} />
                                                <span className="font-mono">abi.json</span>
                                            </button>
                                            {result.bytecode && (
                                                <button
                                                    onClick={() => setActiveLeftTab('bytecode')}
                                                    className={`w-full flex items-center gap-1 px-2 py-0.5 ${activeLeftTab === 'bytecode' ? 'text-white bg-gray-800' : 'text-gray-400 hover:bg-gray-800'
                                                        }`}
                                                >
                                                    <IconFile size={12} />
                                                    <span className="font-mono">bytecode.txt</span>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="p-2 border-t border-gray-800 space-y-1">
                            <button
                                onClick={() => setShowProjectsPanel(true)}
                                className="w-full py-1.5 text-[10px] font-bold bg-gray-800 hover:bg-gray-700 flex items-center justify-center gap-1"
                            >
                                <IconFolder size={10} />
                                PROJECTS ({savedProjects.length})
                            </button>
                            <button
                                onClick={handleCompile}
                                disabled={!code || isCompiling}
                                className="w-full py-1.5 text-[10px] font-bold bg-gray-800 hover:bg-gray-700 disabled:opacity-50 flex items-center justify-center gap-1"
                            >
                                {isCompiling ? <IconSpinner size={10} /> : <IconCompile size={10} />}
                                COMPILE
                            </button>
                            <button
                                onClick={handleStartDeploy}
                                disabled={!result?.bytecode || !isConnected || isDeploying}
                                className="w-full py-1.5 text-[10px] font-bold bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:bg-gray-800 flex items-center justify-center gap-1"
                            >
                                {isDeploying ? <IconSpinner size={10} /> : <IconDeploy size={10} />}
                                DEPLOY
                            </button>
                            <button
                                onClick={handleExport}
                                disabled={!code}
                                className="w-full py-1.5 text-[10px] font-bold bg-gray-800 hover:bg-gray-700 disabled:opacity-50 flex items-center justify-center gap-1"
                            >
                                <IconDownload size={10} />
                                EXPORT
                            </button>
                        </div>
                    </aside>

                    {/* Main Content - Split View */}
                    <div className="flex-1 flex flex-col overflow-hidden">

                        {/* Editor + Preview Split */}
                        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

                            {/* Left Panel - Code Editor */}
                            <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-800 min-h-[40vh] lg:min-h-0">

                                {/* Tabs */}
                                <div className="h-8 border-b border-gray-800 bg-gray-900 flex items-center overflow-x-auto">
                                    <button
                                        onClick={() => setActiveLeftTab('code')}
                                        className={`h-full px-3 text-[11px] font-mono flex items-center gap-1.5 border-r border-gray-800 whitespace-nowrap ${activeLeftTab === 'code' ? 'bg-gray-950 text-white' : 'text-gray-500 hover:text-white'
                                            }`}
                                    >
                                        <IconCode size={12} />
                                        {selectedFile || 'untitled.sol'}
                                        {result?.bytecode && <span className="ml-1 w-1.5 h-1.5 bg-green-400" />}
                                    </button>
                                    {result?.abi && (
                                        <button
                                            onClick={() => setActiveLeftTab('abi')}
                                            className={`h-full px-3 text-[11px] font-mono flex items-center gap-1.5 border-r border-gray-800 whitespace-nowrap ${activeLeftTab === 'abi' ? 'bg-gray-950 text-white' : 'text-gray-500 hover:text-white'
                                                }`}
                                        >
                                            abi.json
                                        </button>
                                    )}
                                    {result?.bytecode && (
                                        <button
                                            onClick={() => setActiveLeftTab('bytecode')}
                                            className={`h-full px-3 text-[11px] font-mono flex items-center gap-1.5 border-r border-gray-800 whitespace-nowrap ${activeLeftTab === 'bytecode' ? 'bg-gray-950 text-white' : 'text-gray-500 hover:text-white'
                                                }`}
                                        >
                                            bytecode
                                        </button>
                                    )}

                                    {/* Copy button for current tab */}
                                    {(activeLeftTab === 'abi' && result?.abi) && (
                                        <button
                                            onClick={() => copyToClipboard(JSON.stringify(result.abi, null, 2), 'ABI')}
                                            className="ml-auto px-2 text-gray-500 hover:text-white"
                                            title="Copy ABI"
                                        >
                                            <IconCopy size={12} />
                                        </button>
                                    )}
                                    {(activeLeftTab === 'bytecode' && result?.bytecode) && (
                                        <button
                                            onClick={() => copyToClipboard(result.bytecode || '', 'bytecode')}
                                            className="ml-auto px-2 text-gray-500 hover:text-white"
                                            title="Copy Bytecode"
                                        >
                                            <IconCopy size={12} />
                                        </button>
                                    )}
                                </div>

                                {/* Editor */}
                                <div className="flex-1 overflow-hidden">
                                    <EditorErrorBoundary>
                                        {activeLeftTab === 'code' && (
                                            <CodeEditor
                                                value={code}
                                                onChange={setCode}
                                                language="sol"
                                            />
                                        )}
                                        {activeLeftTab === 'abi' && result?.abi && (
                                            <CodeEditor
                                                value={JSON.stringify(result.abi, null, 2)}
                                                language="json"
                                                readOnly
                                            />
                                        )}
                                        {activeLeftTab === 'bytecode' && result?.bytecode && (
                                            <div className="h-full overflow-auto p-4 bg-gray-950 font-mono text-xs text-gray-400 break-all">
                                                {result.bytecode}
                                            </div>
                                        )}
                                    </EditorErrorBoundary>
                                </div>
                            </div>

                            {/* Right Panel - Preview/Interact */}
                            <div className="flex-1 flex flex-col overflow-hidden min-h-[40vh] lg:min-h-0">

                                {/* Tabs */}
                                <div className="h-8 border-b border-gray-800 bg-gray-900 flex items-center justify-between">
                                    <div className="flex overflow-x-auto">
                                        <button
                                            onClick={() => setActiveRightTab('preview')}
                                            className={`h-full px-3 text-[11px] font-mono flex items-center gap-1.5 border-r border-gray-800 whitespace-nowrap ${activeRightTab === 'preview' ? 'bg-gray-950 text-white' : 'text-gray-500 hover:text-white'
                                                }`}
                                        >
                                            <IconWindow size={12} />
                                            Preview
                                        </button>
                                        <button
                                            onClick={() => setActiveRightTab('interact')}
                                            disabled={!deployedAddress}
                                            className={`h-full px-3 text-[11px] font-mono flex items-center gap-1.5 border-r border-gray-800 disabled:opacity-50 whitespace-nowrap ${activeRightTab === 'interact' ? 'bg-gray-950 text-white' : 'text-gray-500 hover:text-white'
                                                }`}
                                        >
                                            <IconPlay size={12} />
                                            Interact
                                            {deployedAddress && <span className="ml-1 w-1.5 h-1.5 bg-green-400" />}
                                        </button>
                                        <button
                                            onClick={() => setActiveRightTab('subgraph')}
                                            disabled={Object.keys(subgraphFiles).length === 0}
                                            className={`h-full px-3 text-[11px] font-mono flex items-center gap-1.5 border-r border-gray-800 disabled:opacity-50 whitespace-nowrap ${activeRightTab === 'subgraph' ? 'bg-gray-950 text-white' : 'text-gray-500 hover:text-white'
                                                }`}
                                        >
                                            <IconGraph size={12} />
                                            Subgraph
                                        </button>
                                    </div>

                                    <div className="pr-2">
                                        <button
                                            onClick={handleGenerateUI}
                                            disabled={!result?.abi || isGeneratingUI}
                                            className="px-2 py-0.5 text-[10px] font-bold bg-purple-600 hover:bg-purple-500 disabled:opacity-50"
                                        >
                                            {isGeneratingUI ? 'GENERATING...' : 'GENERATE UI'}
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-hidden">
                                    <PreviewErrorBoundary>
                                        {activeRightTab === 'preview' && (
                                            <UIPreview
                                                code={generatedUI}
                                                abi={result?.abi}
                                                contractAddress={deployedAddress || undefined}
                                                isGenerating={isGeneratingUI}
                                                progress={uiGenerationProgress}
                                            />
                                        )}
                                        {activeRightTab === 'interact' && deployedAddress && result?.abi && (
                                            <div className="h-full overflow-auto p-4 bg-gray-950">
                                                <div className="mb-4 p-3 bg-gray-900 border border-gray-800 flex items-center justify-between">
                                                    <div>
                                                        <div className="text-[10px] text-gray-500 mb-1">CONTRACT</div>
                                                        <div className="text-xs font-mono text-white break-all">{deployedAddress}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(deployedAddress, 'address')}
                                                        className="p-2 text-gray-500 hover:text-white"
                                                    >
                                                        <IconCopy size={14} />
                                                    </button>
                                                </div>
                                                <DynamicInterface abi={result.abi} address={deployedAddress} />
                                            </div>
                                        )}
                                        {activeRightTab === 'subgraph' && Object.keys(subgraphFiles).length > 0 && (
                                            <SubgraphPreview files={subgraphFiles} onCopy={copyToClipboard} />
                                        )}
                                    </PreviewErrorBoundary>
                                </div>
                            </div>
                        </div>

                        {/* Console */}
                        {showConsole && (
                            <div className="h-28 lg:h-36 border-t border-gray-800 bg-gray-900 flex flex-col flex-shrink-0">
                                <div className="h-6 border-b border-gray-800 flex items-center justify-between px-2">
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-1 text-[10px] font-bold text-white">
                                            <IconTerminal size={10} />
                                            OUTPUT
                                        </button>
                                        <button className="text-[10px] text-gray-500 hover:text-white">
                                            PROBLEMS
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setLogs([])}
                                            className="text-gray-500 hover:text-white text-[10px]"
                                        >
                                            Clear
                                        </button>
                                        <button
                                            onClick={() => setShowConsole(false)}
                                            className="text-gray-500 hover:text-white"
                                        >
                                            <IconX size={10} />
                                        </button>
                                    </div>
                                </div>
                                <div ref={consoleRef} className="flex-1 overflow-auto p-1 font-mono text-[11px]">
                                    {logs.map((entry) => (
                                        <div key={entry.id} className="flex gap-1.5 py-px hover:bg-gray-800/50">
                                            <span className="text-gray-600 w-16 flex-shrink-0">{formatTime(entry.timestamp)}</span>
                                            <span className={`w-8 flex-shrink-0 ${entry.type === 'error' ? 'text-red-400' :
                                                entry.type === 'success' ? 'text-green-400' :
                                                    entry.type === 'warning' ? 'text-yellow-400' :
                                                        'text-blue-400'
                                                }`}>
                                                [{entry.type.slice(0, 3).toUpperCase()}]
                                            </span>
                                            <span className={
                                                entry.type === 'error' ? 'text-red-300' :
                                                    entry.type === 'success' ? 'text-green-300' :
                                                        entry.type === 'warning' ? 'text-yellow-300' :
                                                            'text-gray-300'
                                            }>
                                                {entry.message}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Status Bar */}
                <footer className="h-5 border-t border-gray-800 bg-gray-800 flex items-center justify-between px-2 text-[10px] flex-shrink-0">
                    <div className="flex items-center gap-3">
                        {!showConsole && (
                            <button onClick={() => setShowConsole(true)} className="text-gray-400 hover:text-white flex items-center gap-1">
                                <IconTerminal size={10} />
                                Output
                            </button>
                        )}
                        {!showPrompt && (
                            <button onClick={() => setShowPrompt(true)} className="text-gray-400 hover:text-white">
                                AI Generate
                            </button>
                        )}
                        <span className="text-gray-500 hidden sm:inline">{selectedFile}</span>
                        {code && <span className="text-gray-600 hidden sm:inline">{code.split('\n').length} lines</span>}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-gray-500 hidden sm:inline">Solidity 0.8.20</span>
                        {balance && (
                            <span className="text-gray-400">
                                {parseFloat(balance.formatted).toFixed(3)} {balance.symbol}
                            </span>
                        )}
                        {result?.bytecode && <Badge label="COMPILED" variant="success" size="sm" />}
                        {deployedAddress && <Badge label="LIVE" variant="success" size="sm" />}
                    </div>
                </footer>

                {/* Deploy Modal */}
                <AnimatePresence>
                    {showDeployModal && (
                        <DeployModal
                            args={constructorArgs}
                            onArgsChange={setConstructorArgs}
                            onValidate={validateArgValue}
                            onDeploy={() => {
                                // Validate all args first
                                const hasErrors = constructorArgs.some(arg => validateArgValue(arg.value, arg.type));
                                if (hasErrors) {
                                    // Update with error messages
                                    setConstructorArgs(args => args.map(arg => ({
                                        ...arg,
                                        error: validateArgValue(arg.value, arg.type)
                                    })));
                                    return;
                                }
                                const parsedArgs = constructorArgs.map(arg => parseArgValue(arg.value, arg.type));
                                handleDeploy(parsedArgs);
                            }}
                            onClose={() => setShowDeployModal(false)}
                            isDeploying={isDeploying}
                            estimatedGas={estimatedGas}
                            gasPrice={gasPrice}
                        />
                    )}
                </AnimatePresence>

                {/* Projects Panel */}
                <AnimatePresence>
                    {showProjectsPanel && (
                        <ProjectsPanel
                            projects={savedProjects}
                            onLoad={handleLoadProject}
                            onDelete={handleDeleteProject}
                            onClose={() => setShowProjectsPanel(false)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </ErrorBoundary>
    );
}

// ============================================================================
// SUBGRAPH PREVIEW COMPONENT
// ============================================================================

function SubgraphPreview({ files, onCopy }: { files: Record<string, string>; onCopy: (text: string, label: string) => void }) {
    const [selectedFile, setSelectedFile] = useState<string>(Object.keys(files)[0] || '');

    return (
        <div className="h-full flex flex-col bg-gray-950">
            {/* File Tabs */}
            <div className="flex border-b border-gray-800 overflow-x-auto">
                {Object.keys(files).map(filename => (
                    <button
                        key={filename}
                        onClick={() => setSelectedFile(filename)}
                        className={`px-3 py-2 text-[11px] font-mono whitespace-nowrap border-r border-gray-800 ${selectedFile === filename ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        {filename}
                    </button>
                ))}
            </div>

            {/* File Content */}
            <div className="flex-1 overflow-auto p-4">
                <div className="flex justify-end mb-2">
                    <button
                        onClick={() => onCopy(files[selectedFile] || '', selectedFile)}
                        className="flex items-center gap-1 px-2 py-1 text-[10px] text-gray-500 hover:text-white bg-gray-900 border border-gray-700"
                    >
                        <IconCopy size={10} />
                        COPY
                    </button>
                </div>
                <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap">
                    {files[selectedFile] || ''}
                </pre>
            </div>

            {/* Info Bar */}
            <div className="h-8 border-t border-gray-800 bg-gray-900 flex items-center justify-between px-4 text-xs">
                <span className="text-gray-600">
                    {Object.keys(files).length} files generated
                </span>
                <span className="text-gray-600">
                    The Graph Protocol
                </span>
            </div>
        </div>
    );
}

// ============================================================================
// DEPLOY MODAL COMPONENT
// ============================================================================

interface DeployModalProps {
    args: ConstructorArg[];
    onArgsChange: (args: ConstructorArg[]) => void;
    onValidate: (value: string, type: string) => string | undefined;
    onDeploy: () => void;
    onClose: () => void;
    isDeploying: boolean;
    estimatedGas: bigint | null;
    gasPrice: bigint | null;
}

function DeployModal({ args, onArgsChange, onValidate, onDeploy, onClose, isDeploying, estimatedGas, gasPrice }: DeployModalProps) {
    const updateArg = (index: number, value: string) => {
        const newArgs = [...args];
        const error = onValidate(value, newArgs[index].type);
        newArgs[index] = { ...newArgs[index], value, error };
        onArgsChange(newArgs);
    };

    const estimatedCost = estimatedGas && gasPrice ? formatEther(estimatedGas * gasPrice) : null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-md bg-gray-900 border-2 border-gray-700 p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider">Deploy Contract</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white">
                        <IconX size={18} />
                    </button>
                </div>

                {args.length > 0 && (
                    <>
                        <div className="text-xs text-gray-500 mb-4 uppercase tracking-widest">
                            Constructor Arguments
                        </div>

                        <div className="space-y-4 mb-6">
                            {args.map((arg, index) => (
                                <div key={index}>
                                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">
                                        {arg.name} <span className="text-gray-600 font-normal">({arg.type})</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={arg.value}
                                        onChange={(e) => updateArg(index, e.target.value)}
                                        placeholder={`Enter ${arg.type}`}
                                        className={`w-full px-3 py-2 bg-gray-950 border-2 text-white font-mono text-sm focus:outline-none ${
                                            arg.error ? 'border-red-600 focus:border-red-500' : 'border-gray-700 focus:border-blue-500'
                                        }`}
                                    />
                                    {arg.error && (
                                        <p className="mt-1 text-xs text-red-400">{arg.error}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Gas Estimation */}
                {estimatedGas && (
                    <div className="mb-6 p-3 bg-gray-950 border border-gray-800">
                        <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Estimated Cost</div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Gas:</span>
                            <span className="text-sm font-mono text-white">{estimatedGas.toString()}</span>
                        </div>
                        {estimatedCost && (
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-sm text-gray-400">Cost:</span>
                                <span className="text-sm font-mono text-green-400">~{parseFloat(estimatedCost).toFixed(6)} MNT</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 text-sm font-bold border-2 border-gray-700 text-gray-400 hover:text-white hover:border-gray-600"
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={onDeploy}
                        disabled={isDeploying}
                        className="flex-1 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-500 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isDeploying ? (
                            <>
                                <IconSpinner size={14} />
                                DEPLOYING...
                            </>
                        ) : (
                            <>
                                <IconDeploy size={14} />
                                DEPLOY
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ============================================================================
// PROJECTS PANEL COMPONENT
// ============================================================================

interface ProjectsPanelProps {
    projects: Project[];
    onLoad: (project: Project) => void;
    onDelete: (project: Project) => void;
    onClose: () => void;
}

function ProjectsPanel({ projects, onLoad, onDelete, onClose }: ProjectsPanelProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-lg bg-gray-900 border-2 border-gray-700 p-6 max-h-[80vh] flex flex-col"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider">Saved Projects</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white">
                        <IconX size={18} />
                    </button>
                </div>

                <div className="flex-1 overflow-auto">
                    {projects.length === 0 ? (
                        <div className="text-center py-8 text-gray-600">
                            <div className="w-16 h-16 border-2 border-gray-800 mx-auto mb-4 flex items-center justify-center">
                                <IconFolder size={24} className="text-gray-700" />
                            </div>
                            <p className="text-sm">No saved projects</p>
                            <p className="text-xs mt-2">Deploy a contract to save it</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {projects.map((project, index) => (
                                <div
                                    key={project.id || index}
                                    className="p-4 bg-gray-950 border-2 border-gray-700 hover:border-gray-600 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <button
                                            onClick={() => onLoad(project)}
                                            className="flex-1 text-left"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold">{project.name}</span>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(project.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {project.address && (
                                                <div className="text-xs font-mono text-gray-500 truncate">
                                                    {project.address}
                                                </div>
                                            )}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (confirm(`Delete project "${project.name}"?`)) {
                                                    onDelete(project);
                                                }
                                            }}
                                            className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                                            title="Delete project"
                                        >
                                            <IconX size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800">
                    <button
                        onClick={onClose}
                        className="w-full py-2 text-sm font-bold border-2 border-gray-700 text-gray-400 hover:text-white hover:border-gray-600"
                    >
                        CLOSE
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
