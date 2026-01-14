import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - VERIFICATION
// ============================================================================

export default function VerificationPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    CORE CONCEPTS
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    CONTRACT VERIFICATION
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Verify your smart contracts on Mantle Explorer.
                </p>
            </header>

            {/* Why Verify */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">WHY VERIFY</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    Contract verification proves that your deployed bytecode matches the 
                    original source code. This builds trust with users and enables:
                </p>
                <div className="space-y-2">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-white mt-2" />
                        <p className="text-sm text-gray-400">
                            Source code visibility on block explorers
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-white mt-2" />
                        <p className="text-sm text-gray-400">
                            Direct contract interaction through the explorer UI
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-white mt-2" />
                        <p className="text-sm text-gray-400">
                            Security auditing and code review by the community
                        </p>
                    </div>
                </div>
            </section>

            {/* Verification API */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">VERIFICATION API</h2>
                <p className="text-gray-400 mb-4">
                    MantleDevKit includes a verification module that submits your contract 
                    to Mantle Explorer (Blockscout).
                </p>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        USAGE
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`import { verifyContract } from '@mantle/compiler';

const result = await verifyContract(5003, {
  contractAddress: '0x...',
  sourceCode: contractSource,
  contractName: 'MyToken',
  compilerVersion: 'v0.8.20+commit.a1b79de6',
  optimizationUsed: false,
});

if (result.success) {
  console.log('Verified:', result.explorerUrl);
}`}
                    </pre>
                </div>
            </section>

            {/* Explorer URLs */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">EXPLORER URLS</h2>
                <table className="w-full border-2 border-gray-800 text-sm">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="text-left p-3 font-bold text-gray-500">Network</th>
                            <th className="text-left p-3 font-bold text-gray-500">Explorer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">Mantle Mainnet</td>
                            <td className="p-3 text-gray-400 font-mono text-xs">explorer.mantle.xyz</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 text-gray-400">Mantle Sepolia</td>
                            <td className="p-3 text-gray-400 font-mono text-xs">explorer.sepolia.mantle.xyz</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Manual Verification */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">MANUAL VERIFICATION</h2>
                <p className="text-gray-400 mb-4">
                    You can also verify contracts manually through the explorer:
                </p>
                <ol className="space-y-4">
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">1</span>
                        <div>
                            <p className="text-sm text-gray-400">
                                Navigate to your contract address on the explorer
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">2</span>
                        <div>
                            <p className="text-sm text-gray-400">
                                Click on the &quot;Contract&quot; tab, then &quot;Verify & Publish&quot;
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">3</span>
                        <div>
                            <p className="text-sm text-gray-400">
                                Select compiler version 0.8.20 and paste your source code
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-700 text-sm font-bold">4</span>
                        <div>
                            <p className="text-sm text-gray-400">
                                Submit and wait for verification to complete
                            </p>
                        </div>
                    </li>
                </ol>
            </section>

            {/* Exported Project */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">USING EXPORTED PROJECT</h2>
                <p className="text-gray-400 mb-4">
                    When you export a project, it includes a Hardhat configuration with 
                    verification settings pre-configured.
                </p>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        TERMINAL
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`npx hardhat verify --network mantleSepolia \\
  0xYourContractAddress \\
  "Constructor" "Arguments" "Here"`}
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
                        href="/docs/subgraph"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Subgraph Generation</span>
                        <IconArrowRight size={16} />
                    </Link>
                    <Link
                        href="/docs/export"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Project Export</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </article>
    );
}
