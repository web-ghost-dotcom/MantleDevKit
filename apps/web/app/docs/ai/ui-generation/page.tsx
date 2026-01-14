import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - UI GENERATION
// ============================================================================

export default function UIGenerationPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    AI FEATURES
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    UI GENERATION
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Generate React components to interact with your deployed contracts.
                </p>
            </header>

            {/* Overview */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">OVERVIEW</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    After compiling a contract, you can generate a complete React component 
                    that provides a UI for all contract functions. The generated code uses:
                </p>
                <div className="grid grid-cols-2 gap-2">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-1">React 18+</h3>
                        <p className="text-sm text-gray-500">Modern React with hooks</p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-1">wagmi</h3>
                        <p className="text-sm text-gray-500">Ethereum React hooks</p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-1">viem</h3>
                        <p className="text-sm text-gray-500">TypeScript Ethereum library</p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-1">Tailwind CSS</h3>
                        <p className="text-sm text-gray-500">Utility-first styling</p>
                    </div>
                </div>
            </section>

            {/* How to Use */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">HOW TO USE</h2>
                <ol className="space-y-4">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">1</span>
                        <div>
                            <h4 className="font-bold mb-1">Compile Your Contract</h4>
                            <p className="text-sm text-gray-500">
                                The contract must be compiled to have an ABI available.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">2</span>
                        <div>
                            <h4 className="font-bold mb-1">Click &quot;Generate UI&quot;</h4>
                            <p className="text-sm text-gray-500">
                                In the Preview panel, click the Generate UI button.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">3</span>
                        <div>
                            <h4 className="font-bold mb-1">View Preview</h4>
                            <p className="text-sm text-gray-500">
                                A visual preview shows the component layout with all functions.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">4</span>
                        <div>
                            <h4 className="font-bold mb-1">Copy or Export</h4>
                            <p className="text-sm text-gray-500">
                                Switch to the Code tab to view and copy the generated component.
                            </p>
                        </div>
                    </li>
                </ol>
            </section>

            {/* Generated Component */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">GENERATED COMPONENT</h2>
                <p className="text-gray-400 mb-4">
                    The generated component includes:
                </p>
                <div className="space-y-2">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-blue-500 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Read Functions</h3>
                            <p className="text-sm text-gray-500">
                                Automatic data fetching with loading and error states.
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-orange-500 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Write Functions</h3>
                            <p className="text-sm text-gray-500">
                                Input fields for each parameter with transaction handling.
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-500 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Transaction Status</h3>
                            <p className="text-sm text-gray-500">
                                Visual feedback for pending, confirmed, and failed transactions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integration */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">INTEGRATION</h2>
                <p className="text-gray-400 mb-4">
                    To use the generated component in your project:
                </p>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        EXAMPLE
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`// 1. Copy the generated code to your project
// frontend/ContractUI.tsx

// 2. Import in your page
import ContractUI from './ContractUI';

// 3. Use in a wagmi-wrapped component
export default function Page() {
  return (
    <WagmiProvider>
      <ContractUI />
    </WagmiProvider>
  );
}`}
                    </pre>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-xs font-bold text-gray-500 tracking-widest mb-4">
                    NEXT STEPS
                </h2>
                <div className="flex flex-col gap-2">
                    <Link
                        href="/docs/export"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Project Export</span>
                        <IconArrowRight size={16} />
                    </Link>
                    <Link
                        href="/docs/ai/providers"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">AI Providers</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </article>
    );
}
