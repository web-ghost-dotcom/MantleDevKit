import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - AI CONTRACT GENERATION
// ============================================================================

export default function AIGenerationPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    AI FEATURES
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    CONTRACT GENERATION
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Generate smart contracts from natural language descriptions.
                </p>
            </header>

            {/* How It Works */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">HOW IT WORKS</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    The AI generation system takes your plain English description and 
                    produces production-ready Solidity code using OpenZeppelin standards.
                </p>
                <div className="space-y-1">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold flex-shrink-0">1</span>
                        <div>
                            <h3 className="font-bold mb-1">Describe Your Contract</h3>
                            <p className="text-sm text-gray-500">
                                Enter a natural language description in the AI Generate panel.
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold flex-shrink-0">2</span>
                        <div>
                            <h3 className="font-bold mb-1">AI Processes Request</h3>
                            <p className="text-sm text-gray-500">
                                The AI analyzes your requirements and generates appropriate code.
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold flex-shrink-0">3</span>
                        <div>
                            <h3 className="font-bold mb-1">Review and Edit</h3>
                            <p className="text-sm text-gray-500">
                                The generated code appears in the editor for review and modification.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Example Prompts */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">EXAMPLE PROMPTS</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <div className="text-xs font-bold text-gray-500 mb-2 tracking-widest">TOKEN</div>
                        <p className="text-sm text-gray-300 font-mono">
                            &quot;Create an ERC-20 token called MANTLE with symbol MNT, 
                            1 million initial supply, and a burn function.&quot;
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <div className="text-xs font-bold text-gray-500 mb-2 tracking-widest">NFT</div>
                        <p className="text-sm text-gray-300 font-mono">
                            &quot;Create an NFT collection with max supply of 10,000, 
                            0.01 ETH mint price, and pausable minting.&quot;
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <div className="text-xs font-bold text-gray-500 mb-2 tracking-widest">DEFI</div>
                        <p className="text-sm text-gray-300 font-mono">
                            &quot;Create a staking contract where users can stake TokenA 
                            and earn TokenB rewards at 10% APY.&quot;
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <div className="text-xs font-bold text-gray-500 mb-2 tracking-widest">GOVERNANCE</div>
                        <p className="text-sm text-gray-300 font-mono">
                            &quot;Create a DAO governance contract with 1 day voting delay, 
                            7 day voting period, and 4% quorum.&quot;
                        </p>
                    </div>
                </div>
            </section>

            {/* Tips */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">TIPS FOR BETTER RESULTS</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Be Specific</h3>
                        <p className="text-sm text-gray-500">
                            Include exact numbers, names, and parameters you want.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Mention Standards</h3>
                        <p className="text-sm text-gray-500">
                            Reference ERC standards (ERC-20, ERC-721, ERC-1155) when applicable.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">List Features</h3>
                        <p className="text-sm text-gray-500">
                            Enumerate specific features like pausable, burnable, mintable.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Describe Access Control</h3>
                        <p className="text-sm text-gray-500">
                            Specify who can call which functions (owner only, anyone, etc.).
                        </p>
                    </div>
                </div>
            </section>

            {/* Limitations */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">LIMITATIONS</h2>
                <div className="p-4 bg-gray-900 border-l-4 border-yellow-600">
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-yellow-400 mt-2 flex-shrink-0" />
                            <span>Generated code should always be reviewed before deployment</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-yellow-400 mt-2 flex-shrink-0" />
                            <span>Complex business logic may require manual refinement</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-yellow-400 mt-2 flex-shrink-0" />
                            <span>The AI may not capture all edge cases</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-yellow-400 mt-2 flex-shrink-0" />
                            <span>Professional audit recommended for mainnet deployment</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-xs font-bold text-gray-500 tracking-widest mb-4">
                    NEXT STEPS
                </h2>
                <div className="flex flex-col gap-2">
                    <Link
                        href="/docs/ai/ui-generation"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">UI Generation</span>
                        <IconArrowRight size={16} />
                    </Link>
                    <Link
                        href="/docs/ai/providers"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Configure AI Providers</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </article>
    );
}
