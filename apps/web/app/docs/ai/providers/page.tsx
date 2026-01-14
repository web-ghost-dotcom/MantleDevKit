import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - AI PROVIDERS
// ============================================================================

export default function AIProvidersPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    AI FEATURES
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    AI PROVIDERS
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Configure your preferred AI provider for contract generation.
                </p>
            </header>

            {/* Supported Providers */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">SUPPORTED PROVIDERS</h2>
                <div className="space-y-1">
                    <div className="p-6 bg-gray-900 border-2 border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg">Google Gemini</h3>
                            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Recommended</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            Fast and capable model with excellent code generation. Free tier available.
                        </p>
                        <div className="p-3 bg-gray-950 border border-gray-700">
                            <span className="text-xs font-bold text-gray-500">GET API KEY</span>
                            <p className="text-sm text-gray-400 font-mono mt-1">
                                aistudio.google.com/app/apikey
                            </p>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-900 border-2 border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg">OpenAI GPT-4</h3>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Premium</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            Industry-leading language model. Requires paid API access.
                        </p>
                        <div className="p-3 bg-gray-950 border border-gray-700">
                            <span className="text-xs font-bold text-gray-500">GET API KEY</span>
                            <p className="text-sm text-gray-400 font-mono mt-1">
                                platform.openai.com/api-keys
                            </p>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-900 border-2 border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg">Anthropic Claude</h3>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Premium</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            Excellent at following complex instructions. Requires paid API access.
                        </p>
                        <div className="p-3 bg-gray-950 border border-gray-700">
                            <span className="text-xs font-bold text-gray-500">GET API KEY</span>
                            <p className="text-sm text-gray-400 font-mono mt-1">
                                console.anthropic.com/settings/keys
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Configuration */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">CONFIGURATION</h2>
                <ol className="space-y-4">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">1</span>
                        <div>
                            <h4 className="font-bold mb-1">Open Settings</h4>
                            <p className="text-sm text-gray-500">
                                Click the gear icon in the top navigation bar of the Studio.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">2</span>
                        <div>
                            <h4 className="font-bold mb-1">Select Provider</h4>
                            <p className="text-sm text-gray-500">
                                Choose your preferred AI provider from the dropdown.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">3</span>
                        <div>
                            <h4 className="font-bold mb-1">Enter API Key</h4>
                            <p className="text-sm text-gray-500">
                                Paste your API key in the secure input field.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">4</span>
                        <div>
                            <h4 className="font-bold mb-1">Save Settings</h4>
                            <p className="text-sm text-gray-500">
                                Click Save. Your API key is stored locally in your browser.
                            </p>
                        </div>
                    </li>
                </ol>
            </section>

            {/* Security Note */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">SECURITY</h2>
                <div className="p-4 bg-gray-900 border-l-4 border-yellow-600">
                    <p className="text-sm text-gray-400 mb-4">
                        API keys are stored in your browser&apos;s localStorage. While convenient, 
                        be aware that:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-yellow-400 mt-2 flex-shrink-0" />
                            <span>Keys are sent directly to AI provider APIs from your browser</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-yellow-400 mt-2 flex-shrink-0" />
                            <span>Keys persist across sessions until manually cleared</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-yellow-400 mt-2 flex-shrink-0" />
                            <span>Use keys with usage limits for additional protection</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Comparison */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">PROVIDER COMPARISON</h2>
                <table className="w-full border-2 border-gray-800 text-sm">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="text-left p-3 font-bold text-gray-500">Feature</th>
                            <th className="text-left p-3 font-bold text-gray-500">Gemini</th>
                            <th className="text-left p-3 font-bold text-gray-500">GPT-4</th>
                            <th className="text-left p-3 font-bold text-gray-500">Claude</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">Free Tier</td>
                            <td className="p-3 text-green-400">Yes</td>
                            <td className="p-3 text-gray-600">No</td>
                            <td className="p-3 text-gray-600">No</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">Speed</td>
                            <td className="p-3 text-gray-400">Fast</td>
                            <td className="p-3 text-gray-400">Medium</td>
                            <td className="p-3 text-gray-400">Medium</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">Code Quality</td>
                            <td className="p-3 text-gray-400">Good</td>
                            <td className="p-3 text-gray-400">Excellent</td>
                            <td className="p-3 text-gray-400">Excellent</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">Context Length</td>
                            <td className="p-3 text-gray-400">1M tokens</td>
                            <td className="p-3 text-gray-400">128K tokens</td>
                            <td className="p-3 text-gray-400">200K tokens</td>
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
                        href="/docs/ai/generation"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Contract Generation</span>
                        <IconArrowRight size={16} />
                    </Link>
                    <Link
                        href="/studio"
                        className="p-4 bg-white text-gray-950 hover:bg-gray-200 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Open Studio</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </article>
    );
}
