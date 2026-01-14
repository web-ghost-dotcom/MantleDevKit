import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - PROJECT EXPORT
// ============================================================================

export default function ExportPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    ADVANCED
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    PROJECT EXPORT
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Download a complete Hardhat project with all your contract files.
                </p>
            </header>

            {/* What Gets Exported */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">EXPORTED FILES</h2>
                <p className="text-gray-400 mb-4">
                    The export includes everything needed to continue development locally:
                </p>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <pre className="p-4 text-sm font-mono text-gray-400 overflow-x-auto">
{`project.zip/
├── contracts/
│   └── Contract.sol       # Your Solidity source
├── artifacts/
│   ├── abi.json           # Contract ABI
│   └── bytecode.txt       # Compiled bytecode
├── scripts/
│   └── deploy.ts          # Deployment script
├── test/
│   └── Contract.test.ts   # Basic test template
├── subgraph/              # The Graph files (if deployed)
│   ├── schema.graphql
│   ├── subgraph.yaml
│   └── src/mapping.ts
├── frontend/              # Generated UI (if created)
│   └── ContractUI.tsx
├── hardhat.config.ts      # Mantle network config
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── .env.example           # Environment template
└── README.md              # Project documentation`}
                    </pre>
                </div>
            </section>

            {/* How to Export */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">HOW TO EXPORT</h2>
                <ol className="space-y-4">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">1</span>
                        <div>
                            <h4 className="font-bold mb-1">Click Export</h4>
                            <p className="text-sm text-gray-500">
                                Click the Export button in the sidebar or press Ctrl+E.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">2</span>
                        <div>
                            <h4 className="font-bold mb-1">Download ZIP</h4>
                            <p className="text-sm text-gray-500">
                                A ZIP file containing all project files will be downloaded.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">3</span>
                        <div>
                            <h4 className="font-bold mb-1">Extract and Install</h4>
                            <div className="mt-2 p-3 bg-gray-900 border border-gray-700">
                                <code className="text-sm font-mono text-gray-300">
                                    unzip project.zip && cd project && npm install
                                </code>
                            </div>
                        </div>
                    </li>
                </ol>
            </section>

            {/* Using the Exported Project */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">USING THE PROJECT</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Compile</h3>
                        <code className="text-sm font-mono text-gray-400">npx hardhat compile</code>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Test</h3>
                        <code className="text-sm font-mono text-gray-400">npx hardhat test</code>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Deploy to Testnet</h3>
                        <code className="text-sm font-mono text-gray-400">
                            npx hardhat run scripts/deploy.ts --network mantleSepolia
                        </code>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Deploy to Mainnet</h3>
                        <code className="text-sm font-mono text-gray-400">
                            npx hardhat run scripts/deploy.ts --network mantle
                        </code>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Verify Contract</h3>
                        <code className="text-sm font-mono text-gray-400">
                            npx hardhat verify --network mantleSepolia CONTRACT_ADDRESS
                        </code>
                    </div>
                </div>
            </section>

            {/* Environment Setup */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">ENVIRONMENT SETUP</h2>
                <p className="text-gray-400 mb-4">
                    Copy .env.example to .env and fill in your values:
                </p>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        .env
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`# Your wallet private key (keep secret!)
PRIVATE_KEY=0x...

# Mantle Explorer API key for verification
ETHERSCAN_API_KEY=your_api_key`}
                    </pre>
                </div>
                <div className="mt-4 p-4 bg-gray-900 border-l-4 border-red-600">
                    <p className="text-sm text-gray-400">
                        Never commit your .env file or share your private key. Add .env 
                        to your .gitignore file.
                    </p>
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
                        <span className="font-bold">Contract Verification</span>
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
