import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - QUICK START
// ============================================================================

export default function QuickStartPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    GETTING STARTED
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    QUICK START
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Deploy your first smart contract on Mantle in under 5 minutes.
                </p>
            </header>

            {/* Prerequisites */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">PREREQUISITES</h2>
                <div className="p-6 bg-gray-900 border-2 border-gray-800">
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-white mt-2 flex-shrink-0" />
                            <span>A web3 wallet (MetaMask, Rabby, etc.)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-white mt-2 flex-shrink-0" />
                            <span>MNT tokens for gas fees (use the Mantle faucet for testnet)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-white mt-2 flex-shrink-0" />
                            <span>Optional: AI API key for contract generation (Gemini, OpenAI, or Claude)</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Step 1 */}
            <section className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 flex items-center justify-center border-2 border-gray-700 text-lg font-bold">1</span>
                    <h2 className="text-lg font-bold tracking-wider">CONNECT YOUR WALLET</h2>
                </div>
                <div className="pl-14">
                    <p className="text-gray-400 mb-4">
                        Click the Connect button in the top right corner of the Studio. 
                        Select your wallet provider and approve the connection.
                    </p>
                    <div className="p-4 bg-gray-900 border-l-4 border-gray-700">
                        <p className="text-sm text-gray-500">
                            The Studio will automatically prompt you to switch to Mantle Sepolia 
                            testnet if you are on a different network.
                        </p>
                    </div>
                </div>
            </section>

            {/* Step 2 */}
            <section className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 flex items-center justify-center border-2 border-gray-700 text-lg font-bold">2</span>
                    <h2 className="text-lg font-bold tracking-wider">SELECT A TEMPLATE</h2>
                </div>
                <div className="pl-14">
                    <p className="text-gray-400 mb-4">
                        In the file explorer on the left, expand the templates folder and 
                        click on a template to load it into the editor.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="p-3 bg-gray-900 border border-gray-800">
                            <span className="text-xs font-bold text-gray-500">Token.sol</span>
                            <p className="text-sm text-gray-400">ERC-20 Token</p>
                        </div>
                        <div className="p-3 bg-gray-900 border border-gray-800">
                            <span className="text-xs font-bold text-gray-500">NFT.sol</span>
                            <p className="text-sm text-gray-400">ERC-721 NFT</p>
                        </div>
                        <div className="p-3 bg-gray-900 border border-gray-800">
                            <span className="text-xs font-bold text-gray-500">Staking.sol</span>
                            <p className="text-sm text-gray-400">Staking Pool</p>
                        </div>
                        <div className="p-3 bg-gray-900 border border-gray-800">
                            <span className="text-xs font-bold text-gray-500">Multisig.sol</span>
                            <p className="text-sm text-gray-400">Multi-signature Wallet</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Step 3 */}
            <section className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 flex items-center justify-center border-2 border-gray-700 text-lg font-bold">3</span>
                    <h2 className="text-lg font-bold tracking-wider">COMPILE THE CONTRACT</h2>
                </div>
                <div className="pl-14">
                    <p className="text-gray-400 mb-4">
                        Click the Compile button in the sidebar or press Ctrl+S (Cmd+S on Mac). 
                        The compiler will resolve all OpenZeppelin dependencies automatically.
                    </p>
                    <div className="p-4 bg-gray-900 border border-gray-800">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 bg-green-400" />
                            <span className="text-sm font-mono text-green-400">Compilation successful</span>
                        </div>
                        <p className="text-xs text-gray-500 font-mono">
                            Contract: MyToken | Bytecode: 12KB | Functions: 8
                        </p>
                    </div>
                </div>
            </section>

            {/* Step 4 */}
            <section className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 flex items-center justify-center border-2 border-gray-700 text-lg font-bold">4</span>
                    <h2 className="text-lg font-bold tracking-wider">DEPLOY TO MANTLE</h2>
                </div>
                <div className="pl-14">
                    <p className="text-gray-400 mb-4">
                        Click Deploy or press Ctrl+Shift+D. If your contract has constructor 
                        arguments, a modal will appear to enter them. Confirm the transaction 
                        in your wallet.
                    </p>
                    <div className="p-4 bg-gray-900 border-2 border-green-800">
                        <div className="text-xs font-bold text-green-500 mb-2">DEPLOYED</div>
                        <div className="text-sm font-mono text-gray-400 break-all">
                            0x742d35Cc6634C0532925a3b844Bc9e7595f1234...
                        </div>
                    </div>
                </div>
            </section>

            {/* Step 5 */}
            <section className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 flex items-center justify-center border-2 border-gray-700 text-lg font-bold">5</span>
                    <h2 className="text-lg font-bold tracking-wider">INTERACT WITH YOUR CONTRACT</h2>
                </div>
                <div className="pl-14">
                    <p className="text-gray-400 mb-4">
                        After deployment, the Interact tab becomes active. You can call read 
                        functions instantly and write functions by submitting transactions.
                    </p>
                </div>
            </section>

            {/* Keyboard Shortcuts */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">KEYBOARD SHORTCUTS</h2>
                <div className="border-2 border-gray-800">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-900">
                                <th className="text-left p-3 font-bold text-gray-500">Shortcut</th>
                                <th className="text-left p-3 font-bold text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-gray-800">
                                <td className="p-3 font-mono text-gray-400">Ctrl/Cmd + S</td>
                                <td className="p-3 text-gray-400">Compile contract</td>
                            </tr>
                            <tr className="border-t border-gray-800">
                                <td className="p-3 font-mono text-gray-400">Ctrl/Cmd + Shift + D</td>
                                <td className="p-3 text-gray-400">Deploy contract</td>
                            </tr>
                            <tr className="border-t border-gray-800">
                                <td className="p-3 font-mono text-gray-400">Ctrl/Cmd + E</td>
                                <td className="p-3 text-gray-400">Export project</td>
                            </tr>
                            <tr className="border-t border-gray-800">
                                <td className="p-3 font-mono text-gray-400">Escape</td>
                                <td className="p-3 text-gray-400">Close modals</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-xs font-bold text-gray-500 tracking-widest mb-4">
                    NEXT STEPS
                </h2>
                <div className="flex flex-col gap-2">
                    <Link
                        href="/docs/contracts"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Learn about Smart Contracts</span>
                        <IconArrowRight size={16} />
                    </Link>
                    <Link
                        href="/docs/ai/generation"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">AI Contract Generation</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </article>
    );
}
