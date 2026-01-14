import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - ERC-1155 TEMPLATE
// ============================================================================

export default function ERC1155Page() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    TEMPLATES
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    ERC-1155 MULTI-TOKEN
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Multi-token standard for both fungible and non-fungible tokens.
                </p>
            </header>

            {/* Overview */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">OVERVIEW</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    ERC-1155 combines the best of ERC-20 and ERC-721 in a single contract. 
                    It can manage multiple token types, reducing gas costs and complexity 
                    for games and marketplaces.
                </p>
            </section>

            {/* Features */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">TEMPLATE FEATURES</h2>
                <div className="space-y-2">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Mixed Token Types</h3>
                            <p className="text-sm text-gray-500">Fungible and non-fungible in one contract</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Batch Operations</h3>
                            <p className="text-sm text-gray-500">Transfer multiple tokens in one transaction</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">URI Storage</h3>
                            <p className="text-sm text-gray-500">Metadata for each token ID</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Supply Tracking</h3>
                            <p className="text-sm text-gray-500">Track total supply per token ID</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">USE CASES</h2>
                <div className="grid grid-cols-2 gap-2">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-1">Gaming</h3>
                        <p className="text-sm text-gray-500">Weapons, armor, currency, characters</p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-1">Ticketing</h3>
                        <p className="text-sm text-gray-500">Event tickets with different tiers</p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-1">Memberships</h3>
                        <p className="text-sm text-gray-500">Access passes and subscription tokens</p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-1">Rewards</h3>
                        <p className="text-sm text-gray-500">Points, badges, and achievements</p>
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
                            <td className="p-3 font-mono text-orange-400">mint(to, id, amount, data)</td>
                            <td className="p-3 text-gray-400">Mint tokens of a specific ID</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-orange-400">mintBatch(to, ids, amounts, data)</td>
                            <td className="p-3 text-gray-400">Mint multiple token types at once</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-blue-400">balanceOf(account, id)</td>
                            <td className="p-3 text-gray-400">Get balance of specific token</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-orange-400">safeTransferFrom(...)</td>
                            <td className="p-3 text-gray-400">Transfer tokens safely</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-orange-400">safeBatchTransferFrom(...)</td>
                            <td className="p-3 text-gray-400">Transfer multiple tokens</td>
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
                        href="/docs/templates/staking"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Staking Pool Template</span>
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
