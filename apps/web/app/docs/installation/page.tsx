import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - INSTALLATION
// ============================================================================

export default function InstallationPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    GETTING STARTED
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    INSTALLATION
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Set up MantleDevKit for local development or self-hosting.
                </p>
            </header>

            {/* Requirements */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">REQUIREMENTS</h2>
                <div className="p-6 bg-gray-900 border-2 border-gray-800">
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-white mt-2 flex-shrink-0" />
                            <span>Node.js 18.0 or later</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-white mt-2 flex-shrink-0" />
                            <span>npm, yarn, or pnpm package manager</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-white mt-2 flex-shrink-0" />
                            <span>Git (for cloning the repository)</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Clone Repository */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">CLONE THE REPOSITORY</h2>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        TERMINAL
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`git clone https://github.com/your-username/MantleDevKit.git
cd MantleDevKit`}
                    </pre>
                </div>
            </section>

            {/* Install Dependencies */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">INSTALL DEPENDENCIES</h2>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        TERMINAL
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`npm install`}
                    </pre>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                    This installs all dependencies for the monorepo, including the web app 
                    and all packages.
                </p>
            </section>

            {/* Environment Variables */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">CONFIGURE ENVIRONMENT</h2>
                <p className="text-gray-400 mb-4">
                    Create a .env.local file in the apps/web directory with the following variables:
                </p>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        apps/web/.env.local
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`# Required: WalletConnect Project ID
# Get one at https://cloud.walletconnect.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Optional: Custom RPC endpoints
NEXT_PUBLIC_MANTLE_RPC_URL=https://rpc.mantle.xyz
NEXT_PUBLIC_MANTLE_SEPOLIA_RPC_URL=https://rpc.sepolia.mantle.xyz

# Optional: Explorer API key for verification
NEXT_PUBLIC_MANTLE_EXPLORER_API_KEY=your_api_key`}
                    </pre>
                </div>
            </section>

            {/* Run Development Server */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">START DEVELOPMENT SERVER</h2>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        TERMINAL
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`npm run dev`}
                    </pre>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                    The application will be available at http://localhost:3000
                </p>
            </section>

            {/* Build for Production */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">BUILD FOR PRODUCTION</h2>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        TERMINAL
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`npm run build
npm run start`}
                    </pre>
                </div>
            </section>

            {/* Project Structure */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">PROJECT STRUCTURE</h2>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <pre className="p-4 text-sm font-mono text-gray-400 overflow-x-auto">
{`MantleDevKit/
├── apps/
│   └── web/              # Next.js web application
│       ├── app/          # App router pages
│       ├── components/   # React components
│       └── lib/          # Utilities
├── packages/
│   ├── ai/               # AI generation (Gemini, OpenAI, Claude)
│   ├── compiler/         # Solidity compiler & templates
│   ├── storage/          # IndexedDB & localStorage
│   └── ui/               # Shared UI components
├── turbo.json            # Turborepo configuration
└── package.json`}
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
                        href="/docs/quickstart"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Quick Start Guide</span>
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
