import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - SUBGRAPH GENERATION
// ============================================================================

export default function SubgraphPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    ADVANCED
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    SUBGRAPH GENERATION
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Automatically generate The Graph subgraph scaffolding from your contract.
                </p>
            </header>

            {/* What is a Subgraph */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">WHAT IS A SUBGRAPH</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    A subgraph indexes blockchain events and provides a GraphQL API for 
                    querying on-chain data efficiently. This is essential for building 
                    performant dApp frontends.
                </p>
                <div className="space-y-2">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-white mt-2" />
                        <p className="text-sm text-gray-400">
                            Query historical events without scanning the entire blockchain
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-white mt-2" />
                        <p className="text-sm text-gray-400">
                            Build complex queries with filters, sorting, and pagination
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-white mt-2" />
                        <p className="text-sm text-gray-400">
                            Real-time updates through subscriptions
                        </p>
                    </div>
                </div>
            </section>

            {/* Generated Files */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">GENERATED FILES</h2>
                <p className="text-gray-400 mb-4">
                    After deployment, the Subgraph tab becomes available with these files:
                </p>
                <div className="space-y-1">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-mono font-bold">schema.graphql</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            GraphQL schema with entities for each contract event.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-mono font-bold">subgraph.yaml</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Manifest file defining data sources and event handlers.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-mono font-bold">src/mapping.ts</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            AssemblyScript handlers for processing events.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-mono font-bold">package.json</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Dependencies and deployment scripts.
                        </p>
                    </div>
                </div>
            </section>

            {/* Deployment */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">DEPLOYING THE SUBGRAPH</h2>
                <ol className="space-y-4">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">1</span>
                        <div>
                            <h4 className="font-bold mb-1">Export the Files</h4>
                            <p className="text-sm text-gray-500">
                                Copy files from the Subgraph tab or export the full project.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">2</span>
                        <div>
                            <h4 className="font-bold mb-1">Install Dependencies</h4>
                            <div className="mt-2 p-3 bg-gray-900 border border-gray-700">
                                <code className="text-sm font-mono text-gray-300">npm install</code>
                            </div>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">3</span>
                        <div>
                            <h4 className="font-bold mb-1">Generate Types</h4>
                            <div className="mt-2 p-3 bg-gray-900 border border-gray-700">
                                <code className="text-sm font-mono text-gray-300">npm run codegen</code>
                            </div>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">4</span>
                        <div>
                            <h4 className="font-bold mb-1">Build</h4>
                            <div className="mt-2 p-3 bg-gray-900 border border-gray-700">
                                <code className="text-sm font-mono text-gray-300">npm run build</code>
                            </div>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">5</span>
                        <div>
                            <h4 className="font-bold mb-1">Deploy to The Graph Studio</h4>
                            <div className="mt-2 p-3 bg-gray-900 border border-gray-700">
                                <code className="text-sm font-mono text-gray-300">graph auth --studio YOUR_KEY</code>
                                <br />
                                <code className="text-sm font-mono text-gray-300">npm run deploy</code>
                            </div>
                        </div>
                    </li>
                </ol>
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
                        href="/docs/api"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">API Reference</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </article>
    );
}
