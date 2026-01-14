import Link from 'next/link';
import { IconArrowRight, IconCode, IconCompile, IconDeploy, IconBolt } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - INTRODUCTION
// ============================================================================

export default function DocsPage() {
    return (
        <article>
            {/* Header */}
            <header className="mb-12">
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    MANTLE DEVKIT
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                    The AI-powered development kit for building, deploying, and managing 
                    smart contracts on Mantle Network. No Solidity expertise required.
                </p>
            </header>

            {/* Overview Cards */}
            <section className="mb-16">
                <h2 className="text-xs font-bold text-gray-500 tracking-widest mb-6">
                    CORE CAPABILITIES
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    <div className="p-6 bg-gray-900 border-2 border-gray-800">
                        <IconBolt size={24} className="mb-4 text-gray-600" />
                        <h3 className="text-sm font-bold tracking-wider mb-2">AI GENERATION</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Describe your contract in plain English and let AI generate 
                            production-ready Solidity code using OpenZeppelin standards.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-900 border-2 border-gray-800">
                        <IconCompile size={24} className="mb-4 text-gray-600" />
                        <h3 className="text-sm font-bold tracking-wider mb-2">BROWSER COMPILATION</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Compile Solidity contracts directly in your browser with automatic 
                            dependency resolution. No local tooling required.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-900 border-2 border-gray-800">
                        <IconDeploy size={24} className="mb-4 text-gray-600" />
                        <h3 className="text-sm font-bold tracking-wider mb-2">ONE-CLICK DEPLOY</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Deploy contracts to Mantle mainnet or Sepolia testnet with a single 
                            click. Automatic gas estimation included.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-900 border-2 border-gray-800">
                        <IconCode size={24} className="mb-4 text-gray-600" />
                        <h3 className="text-sm font-bold tracking-wider mb-2">AUTO UI GENERATION</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Generate complete React components to interact with your deployed 
                            contracts using wagmi and viem.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Start */}
            <section className="mb-16">
                <h2 className="text-xs font-bold text-gray-500 tracking-widest mb-6">
                    QUICK START
                </h2>
                <div className="p-6 bg-gray-900 border-2 border-gray-800">
                    <ol className="space-y-4">
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">1</span>
                            <div>
                                <h4 className="font-bold mb-1">Open the Studio</h4>
                                <p className="text-sm text-gray-500">
                                    Navigate to the Studio page to access the full IDE environment.
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">2</span>
                            <div>
                                <h4 className="font-bold mb-1">Choose a Template or Generate</h4>
                                <p className="text-sm text-gray-500">
                                    Select from pre-built templates or describe your contract in the AI prompt.
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">3</span>
                            <div>
                                <h4 className="font-bold mb-1">Compile and Deploy</h4>
                                <p className="text-sm text-gray-500">
                                    Click Compile to build your contract, then Deploy to publish it on-chain.
                                </p>
                            </div>
                        </li>
                    </ol>
                </div>
            </section>

            {/* Supported Networks */}
            <section className="mb-16">
                <h2 className="text-xs font-bold text-gray-500 tracking-widest mb-6">
                    SUPPORTED NETWORKS
                </h2>
                <div className="space-y-1">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-green-400" />
                            <span className="font-bold">Mantle Mainnet</span>
                        </div>
                        <span className="text-sm text-gray-500 font-mono">Chain ID: 5000</span>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-yellow-400" />
                            <span className="font-bold">Mantle Sepolia</span>
                            <span className="text-xs text-yellow-500 uppercase">Testnet</span>
                        </div>
                        <span className="text-sm text-gray-500 font-mono">Chain ID: 5003</span>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-xs font-bold text-gray-500 tracking-widest mb-6">
                    NEXT STEPS
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/docs/quickstart"
                        className="flex-1 p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Quick Start Guide</span>
                        <IconArrowRight size={16} />
                    </Link>
                    <Link
                        href="/studio"
                        className="flex-1 p-4 bg-white text-gray-950 hover:bg-gray-200 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Open Studio</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </article>
    );
}
