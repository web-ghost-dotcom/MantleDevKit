import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - STAKING TEMPLATE
// ============================================================================

export default function StakingPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    TEMPLATES
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    STAKING POOL
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Token staking contract with time-based rewards distribution.
                </p>
            </header>

            {/* Overview */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">OVERVIEW</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    The staking pool allows users to lock their tokens and earn rewards 
                    over time. Rewards are distributed proportionally based on stake 
                    amount and duration.
                </p>
            </section>

            {/* Features */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">TEMPLATE FEATURES</h2>
                <div className="space-y-2">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Proportional Rewards</h3>
                            <p className="text-sm text-gray-500">Rewards based on share of total staked</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Flexible Staking</h3>
                            <p className="text-sm text-gray-500">Stake and unstake at any time</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Reward Claiming</h3>
                            <p className="text-sm text-gray-500">Claim accumulated rewards anytime</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Reentrancy Protection</h3>
                            <p className="text-sm text-gray-500">Secure against reentrancy attacks</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">HOW IT WORKS</h2>
                <ol className="space-y-4">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">1</span>
                        <div>
                            <h4 className="font-bold mb-1">Deposit Rewards</h4>
                            <p className="text-sm text-gray-500">
                                Owner deposits reward tokens and sets reward rate.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">2</span>
                        <div>
                            <h4 className="font-bold mb-1">Users Stake</h4>
                            <p className="text-sm text-gray-500">
                                Users approve and stake their tokens.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">3</span>
                        <div>
                            <h4 className="font-bold mb-1">Rewards Accrue</h4>
                            <p className="text-sm text-gray-500">
                                Rewards accumulate based on time and stake share.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">4</span>
                        <div>
                            <h4 className="font-bold mb-1">Claim or Unstake</h4>
                            <p className="text-sm text-gray-500">
                                Users can claim rewards or withdraw their stake.
                            </p>
                        </div>
                    </li>
                </ol>
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
                            <td className="p-3 font-mono text-orange-400">stake(amount)</td>
                            <td className="p-3 text-gray-400">Deposit tokens to stake</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-orange-400">withdraw(amount)</td>
                            <td className="p-3 text-gray-400">Withdraw staked tokens</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-orange-400">claimReward()</td>
                            <td className="p-3 text-gray-400">Claim accumulated rewards</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-blue-400">earned(account)</td>
                            <td className="p-3 text-gray-400">Check pending rewards</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-blue-400">balanceOf(account)</td>
                            <td className="p-3 text-gray-400">Get staked balance</td>
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
                        href="/docs/templates/multisig"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Multisig Wallet Template</span>
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
