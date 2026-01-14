import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - MULTISIG TEMPLATE
// ============================================================================

export default function MultisigPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    TEMPLATES
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    MULTISIG WALLET
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Multi-signature wallet requiring multiple approvals for transactions.
                </p>
            </header>

            {/* Overview */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">OVERVIEW</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    A multisig wallet requires multiple signatures to execute transactions. 
                    This adds security for treasury management, team funds, or any scenario 
                    where no single person should have full control.
                </p>
            </section>

            {/* Features */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">TEMPLATE FEATURES</h2>
                <div className="space-y-2">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Configurable Threshold</h3>
                            <p className="text-sm text-gray-500">Set how many signatures are required</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Transaction Queue</h3>
                            <p className="text-sm text-gray-500">Propose transactions for approval</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Owner Management</h3>
                            <p className="text-sm text-gray-500">Add or remove signers</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">ETH and Token Support</h3>
                            <p className="text-sm text-gray-500">Send any tokens or native currency</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">USE CASES</h2>
                <div className="space-y-2">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-white mt-2" />
                        <p className="text-sm text-gray-400">
                            DAO treasuries requiring multiple council member approvals
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-white mt-2" />
                        <p className="text-sm text-gray-400">
                            Team funds with co-founder signatures required
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-white mt-2" />
                        <p className="text-sm text-gray-400">
                            Protocol upgrades requiring security team approval
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-white mt-2" />
                        <p className="text-sm text-gray-400">
                            Family trusts with multiple trustee signatures
                        </p>
                    </div>
                </div>
            </section>

            {/* Key Functions */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">KEY FUNCTIONS</h2>
                <table className="w-full border-2 border-gray-800 text-sm">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="text-left p-3 font-bold text-gray-500">Function</th>
                            <th className="text-left p-3 font-bold text-gray-500">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-orange-400">submitTransaction(to, value, data)</td>
                            <td className="p-3 text-gray-400">Propose a new transaction</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-orange-400">confirmTransaction(txId)</td>
                            <td className="p-3 text-gray-400">Add your approval</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-orange-400">executeTransaction(txId)</td>
                            <td className="p-3 text-gray-400">Execute after enough approvals</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-orange-400">revokeConfirmation(txId)</td>
                            <td className="p-3 text-gray-400">Revoke your approval</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-blue-400">getTransactionCount()</td>
                            <td className="p-3 text-gray-400">Get total transaction count</td>
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
                        href="/docs/templates/governance"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Governance Template</span>
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
