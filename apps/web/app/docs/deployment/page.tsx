import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - DEPLOYMENT
// ============================================================================

export default function DeploymentPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    CORE CONCEPTS
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    DEPLOYMENT
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Deploy contracts to Mantle Network with one click.
                </p>
            </header>

            {/* Prerequisites */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">PREREQUISITES</h2>
                <div className="space-y-2">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Compiled Contract</h3>
                            <p className="text-sm text-gray-500">
                                Your contract must be compiled successfully before deployment.
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Connected Wallet</h3>
                            <p className="text-sm text-gray-500">
                                A web3 wallet must be connected and on the correct network.
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">MNT Balance</h3>
                            <p className="text-sm text-gray-500">
                                Sufficient MNT tokens to pay for gas fees.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gas Estimation */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">GAS ESTIMATION</h2>
                <p className="text-gray-400 mb-4">
                    Before deployment, the Studio estimates gas costs. This appears in the 
                    deploy modal.
                </p>
                <div className="p-6 bg-gray-900 border-2 border-gray-800">
                    <div className="text-xs font-bold text-gray-500 mb-4 tracking-widest">
                        ESTIMATED COST
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Gas:</span>
                        <span className="text-sm font-mono">1,500,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Cost:</span>
                        <span className="text-sm font-mono text-green-400">~0.015 MNT</span>
                    </div>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                    Actual gas used may differ from the estimate. Unused gas is refunded.
                </p>
            </section>

            {/* Constructor Arguments */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">CONSTRUCTOR ARGUMENTS</h2>
                <p className="text-gray-400 mb-4">
                    If your contract has constructor parameters, a modal will prompt for values:
                </p>
                <div className="p-6 bg-gray-900 border-2 border-gray-800">
                    <div className="text-xs font-bold text-gray-500 mb-4 tracking-widest">
                        CONSTRUCTOR ARGUMENTS
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">
                                name <span className="text-gray-600 font-normal">(string)</span>
                            </label>
                            <input
                                type="text"
                                value="My Token"
                                className="w-full px-3 py-2 bg-gray-950 border-2 border-gray-700 text-white font-mono text-sm"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">
                                symbol <span className="text-gray-600 font-normal">(string)</span>
                            </label>
                            <input
                                type="text"
                                value="MTK"
                                className="w-full px-3 py-2 bg-gray-950 border-2 border-gray-700 text-white font-mono text-sm"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">
                                initialSupply <span className="text-gray-600 font-normal">(uint256)</span>
                            </label>
                            <input
                                type="text"
                                value="1000000"
                                className="w-full px-3 py-2 bg-gray-950 border-2 border-gray-700 text-white font-mono text-sm"
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Networks */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">SUPPORTED NETWORKS</h2>
                <table className="w-full border-2 border-gray-800 text-sm">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="text-left p-3 font-bold text-gray-500">Network</th>
                            <th className="text-left p-3 font-bold text-gray-500">Chain ID</th>
                            <th className="text-left p-3 font-bold text-gray-500">RPC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-400" />
                                    Mantle Mainnet
                                </div>
                            </td>
                            <td className="p-3 text-gray-400 font-mono">5000</td>
                            <td className="p-3 text-gray-400 font-mono text-xs">rpc.mantle.xyz</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-yellow-400" />
                                    Mantle Sepolia
                                </div>
                            </td>
                            <td className="p-3 text-gray-400 font-mono">5003</td>
                            <td className="p-3 text-gray-400 font-mono text-xs">rpc.sepolia.mantle.xyz</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* After Deployment */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">AFTER DEPLOYMENT</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Contract Address</h3>
                        <p className="text-sm text-gray-500">
                            The deployed contract address is displayed in the console and 
                            saved to your projects automatically.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Interact Tab</h3>
                        <p className="text-sm text-gray-500">
                            The Interact tab becomes active, allowing you to call contract 
                            functions directly from the Studio.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Subgraph Generation</h3>
                        <p className="text-sm text-gray-500">
                            A complete subgraph scaffold is generated for indexing your 
                            contract events.
                        </p>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-xs font-bold text-gray-500 tracking-widest mb-4">
                    NEXT STEPS
                </h2>
                <div className="flex flex-col gap-2">
                    <Link
                        href="/docs/verification"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Verify Your Contract</span>
                        <IconArrowRight size={16} />
                    </Link>
                    <Link
                        href="/docs/subgraph"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Deploy Subgraph</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </article>
    );
}
