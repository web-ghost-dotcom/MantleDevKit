import Link from 'next/link';
import { IconMantleLogo, IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION LAYOUT
// Professional sidebar navigation with clean design
// ============================================================================

const NAV_SECTIONS = [
    {
        title: 'GETTING STARTED',
        items: [
            { href: '/docs', label: 'Introduction' },
            { href: '/docs/quickstart', label: 'Quick Start' },
            { href: '/docs/installation', label: 'Installation' },
        ],
    },
    {
        title: 'CORE CONCEPTS',
        items: [
            { href: '/docs/contracts', label: 'Smart Contracts' },
            { href: '/docs/compilation', label: 'Compilation' },
            { href: '/docs/deployment', label: 'Deployment' },
            { href: '/docs/verification', label: 'Verification' },
        ],
    },
    {
        title: 'TEMPLATES',
        items: [
            { href: '/docs/templates/erc20', label: 'ERC-20 Token' },
            { href: '/docs/templates/erc721', label: 'ERC-721 NFT' },
            { href: '/docs/templates/erc1155', label: 'ERC-1155 Multi-Token' },
            { href: '/docs/templates/staking', label: 'Staking Pool' },
            { href: '/docs/templates/multisig', label: 'Multisig Wallet' },
            { href: '/docs/templates/governance', label: 'Governance' },
        ],
    },
    {
        title: 'AI FEATURES',
        items: [
            { href: '/docs/ai/generation', label: 'Contract Generation' },
            { href: '/docs/ai/ui-generation', label: 'UI Generation' },
            { href: '/docs/ai/providers', label: 'AI Providers' },
        ],
    },
    {
        title: 'ADVANCED',
        items: [
            { href: '/docs/subgraph', label: 'Subgraph Generation' },
            { href: '/docs/export', label: 'Project Export' },
            { href: '/docs/api', label: 'API Reference' },
        ],
    },
];

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-14 border-b-2 border-gray-800 bg-gray-950/95 backdrop-blur-sm z-50">
                <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <IconMantleLogo size={24} />
                            <span className="text-sm font-black tracking-tight">MANTLE DEVKIT</span>
                        </Link>
                        <div className="h-4 w-px bg-gray-800" />
                        <span className="text-xs font-bold text-gray-500 tracking-widest">DOCUMENTATION</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/studio"
                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-white text-gray-950 hover:bg-gray-200 transition-colors"
                        >
                            OPEN STUDIO
                            <IconArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex pt-14">
                {/* Sidebar */}
                <aside className="fixed left-0 top-14 bottom-0 w-64 border-r-2 border-gray-800 bg-gray-900 overflow-y-auto">
                    <nav className="p-4">
                        {NAV_SECTIONS.map((section, i) => (
                            <div key={i} className="mb-6">
                                <h3 className="text-[10px] font-bold text-gray-500 tracking-widest mb-3">
                                    {section.title}
                                </h3>
                                <ul className="space-y-1">
                                    {section.items.map((item, j) => (
                                        <li key={j}>
                                            <Link
                                                href={item.href}
                                                className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 min-h-screen">
                    <div className="max-w-4xl mx-auto px-8 py-12">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
