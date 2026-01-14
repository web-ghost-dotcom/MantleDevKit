import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - COMPILATION
// ============================================================================

export default function CompilationPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    CORE CONCEPTS
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    COMPILATION
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    How the browser-based Solidity compiler works.
                </p>
            </header>

            {/* How It Works */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">HOW IT WORKS</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    MantleDevKit compiles Solidity contracts entirely in your browser using 
                    a Web Worker running the official solc compiler (v0.8.20). No code is 
                    sent to any server.
                </p>
                <div className="space-y-1">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold flex-shrink-0">1</span>
                        <div>
                            <h3 className="font-bold mb-1">Parse Imports</h3>
                            <p className="text-sm text-gray-500">
                                The compiler scans your code for import statements and identifies 
                                all required dependencies.
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold flex-shrink-0">2</span>
                        <div>
                            <h3 className="font-bold mb-1">Resolve Dependencies</h3>
                            <p className="text-sm text-gray-500">
                                OpenZeppelin contracts are fetched from GitHub CDN with fallback 
                                to unpkg and jsDelivr.
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold flex-shrink-0">3</span>
                        <div>
                            <h3 className="font-bold mb-1">Compile in Web Worker</h3>
                            <p className="text-sm text-gray-500">
                                The solc compiler runs in a background thread, keeping the UI 
                                responsive during compilation.
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold flex-shrink-0">4</span>
                        <div>
                            <h3 className="font-bold mb-1">Generate Artifacts</h3>
                            <p className="text-sm text-gray-500">
                                The compiler outputs bytecode, ABI, and any warnings or errors.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Output Artifacts */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">OUTPUT ARTIFACTS</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Bytecode</h3>
                        <p className="text-sm text-gray-500 mb-2">
                            The compiled EVM bytecode that gets deployed to the blockchain.
                        </p>
                        <code className="text-xs font-mono text-gray-600 break-all">
                            6080604052600436106100...
                        </code>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">ABI (Application Binary Interface)</h3>
                        <p className="text-sm text-gray-500 mb-2">
                            JSON description of all functions, events, and errors in your contract.
                        </p>
                        <pre className="text-xs font-mono text-gray-600 overflow-x-auto">
{`[
  {
    "type": "function",
    "name": "transfer",
    "inputs": [...],
    "outputs": [...]
  }
]`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* Handling Errors */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">HANDLING ERRORS</h2>
                <p className="text-gray-400 mb-4">
                    Compilation errors and warnings are displayed in the console panel at 
                    the bottom of the Studio.
                </p>
                <div className="space-y-2">
                    <div className="p-3 bg-gray-900 border-l-4 border-red-600">
                        <span className="text-xs font-bold text-red-400">[ERR]</span>
                        <span className="text-sm text-red-300 ml-2">
                            ParserError: Expected identifier but got &apos;;&apos;
                        </span>
                    </div>
                    <div className="p-3 bg-gray-900 border-l-4 border-yellow-600">
                        <span className="text-xs font-bold text-yellow-400">[WAR]</span>
                        <span className="text-sm text-yellow-300 ml-2">
                            Warning: Unused local variable
                        </span>
                    </div>
                    <div className="p-3 bg-gray-900 border-l-4 border-green-600">
                        <span className="text-xs font-bold text-green-400">[SUC]</span>
                        <span className="text-sm text-green-300 ml-2">
                            Compiled: MyToken
                        </span>
                    </div>
                </div>
            </section>

            {/* Performance */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">PERFORMANCE</h2>
                <table className="w-full border-2 border-gray-800 text-sm">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="text-left p-3 font-bold text-gray-500">Metric</th>
                            <th className="text-left p-3 font-bold text-gray-500">Typical Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">Simple contract</td>
                            <td className="p-3 text-gray-400 font-mono">1-2 seconds</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">ERC-20 with extensions</td>
                            <td className="p-3 text-gray-400 font-mono">3-5 seconds</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">Complex governance</td>
                            <td className="p-3 text-gray-400 font-mono">5-10 seconds</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">Timeout limit</td>
                            <td className="p-3 text-gray-400 font-mono">60 seconds</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-xs font-bold text-gray-500 tracking-widest mb-4">
                    NEXT STEPS
                </h2>
                <div className="flex flex-col gap-2">
                    <Link
                        href="/docs/deployment"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Deployment</span>
                        <IconArrowRight size={16} />
                    </Link>
                    <Link
                        href="/docs/verification"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Contract Verification</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </article>
    );
}
