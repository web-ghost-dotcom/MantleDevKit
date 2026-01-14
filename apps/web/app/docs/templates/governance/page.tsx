import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - GOVERNANCE TEMPLATE
// ============================================================================

export default function GovernancePage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    TEMPLATES
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    GOVERNANCE
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    DAO governance with on-chain proposal and voting system.
                </p>
            </header>

            {/* Overview */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">OVERVIEW</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    The governance template implements OpenZeppelin Governor for fully 
                    on-chain DAO governance. Token holders can create proposals, vote, 
                    and automatically execute approved changes.
                </p>
            </section>

            {/* Features */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">TEMPLATE FEATURES</h2>
                <div className="space-y-2">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Token-Based Voting</h3>
                            <p className="text-sm text-gray-500">Voting power from governance token</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Quorum Requirement</h3>
                            <p className="text-sm text-gray-500">Minimum participation threshold</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Configurable Timing</h3>
                            <p className="text-sm text-gray-500">Voting delay and period settings</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Timelock Integration</h3>
                            <p className="text-sm text-gray-500">Delayed execution for security</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Governance Flow */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">GOVERNANCE FLOW</h2>
                <ol className="space-y-4">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">1</span>
                        <div>
                            <h4 className="font-bold mb-1">Proposal Creation</h4>
                            <p className="text-sm text-gray-500">
                                Token holders with sufficient balance create proposals.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">2</span>
                        <div>
                            <h4 className="font-bold mb-1">Voting Delay</h4>
                            <p className="text-sm text-gray-500">
                                Waiting period before voting opens.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">3</span>
                        <div>
                            <h4 className="font-bold mb-1">Voting Period</h4>
                            <p className="text-sm text-gray-500">
                                Token holders cast votes: For, Against, or Abstain.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">4</span>
                        <div>
                            <h4 className="font-bold mb-1">Timelock Queue</h4>
                            <p className="text-sm text-gray-500">
                                Successful proposals enter timelock.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">5</span>
                        <div>
                            <h4 className="font-bold mb-1">Execution</h4>
                            <p className="text-sm text-gray-500">
                                Anyone can execute after timelock expires.
                            </p>
                        </div>
                    </li>
                </ol>
            </section>

            {/* Configuration */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">CONFIGURATION</h2>
                <table className="w-full border-2 border-gray-800 text-sm">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="text-left p-3 font-bold text-gray-500">Parameter</th>
                            <th className="text-left p-3 font-bold text-gray-500">Default</th>
                            <th className="text-left p-3 font-bold text-gray-500">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">Voting Delay</td>
                            <td className="p-3 font-mono text-gray-400">1 day</td>
                            <td className="p-3 text-gray-500">Time before voting starts</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">Voting Period</td>
                            <td className="p-3 font-mono text-gray-400">7 days</td>
                            <td className="p-3 text-gray-500">Duration of voting</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">Quorum</td>
                            <td className="p-3 font-mono text-gray-400">4%</td>
                            <td className="p-3 text-gray-500">Minimum participation</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">Timelock Delay</td>
                            <td className="p-3 font-mono text-gray-400">2 days</td>
                            <td className="p-3 text-gray-500">Delay before execution</td>
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
                        href="/docs/templates/erc20"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">ERC-20 Token Template</span>
                        <IconArrowRight size={16} />
                    </Link>
                    <Link
                        href="/studio"
                        className="p-4 bg-white text-gray-950 hover:bg-gray-200 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Try in Studio</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </article>
    );
}
