'use client';

// ============================================================================
// BLOCKY ILLUSTRATIONS
// Geometric, minimal, no gradients - matches the design system
// ============================================================================

interface IllustrationProps {
    className?: string;
    size?: number;
}

// Developer at laptop - blocky style
export function IllustrationCoder({ className, size = 200 }: IllustrationProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            fill="none"
            className={className}
        >
            {/* Desk */}
            <rect x="20" y="140" width="160" height="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
            <rect x="30" y="148" width="12" height="32" fill="#1f2937" stroke="#374151" strokeWidth="2" />
            <rect x="158" y="148" width="12" height="32" fill="#1f2937" stroke="#374151" strokeWidth="2" />

            {/* Laptop base */}
            <rect x="50" y="130" width="100" height="10" fill="#111827" stroke="#374151" strokeWidth="2" />

            {/* Laptop screen */}
            <rect x="55" y="70" width="90" height="60" fill="#111827" stroke="#374151" strokeWidth="2" />

            {/* Screen content - code lines */}
            <rect x="62" y="78" width="35" height="3" fill="#60a5fa" />
            <rect x="62" y="85" width="50" height="3" fill="#4ade80" />
            <rect x="62" y="92" width="25" height="3" fill="#a78bfa" />
            <rect x="62" y="99" width="45" height="3" fill="#60a5fa" />
            <rect x="62" y="106" width="30" height="3" fill="#fbbf24" />
            <rect x="62" y="113" width="55" height="3" fill="#4ade80" />

            {/* Cursor blink */}
            <rect x="120" y="113" width="2" height="6" fill="#60a5fa">
                <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
            </rect>

            {/* Person - head */}
            <rect x="85" y="25" width="30" height="30" fill="#374151" stroke="#4b5563" strokeWidth="2" />

            {/* Person - body */}
            <rect x="80" y="55" width="40" height="35" fill="#1f2937" stroke="#374151" strokeWidth="2" />

            {/* Arms */}
            <rect x="60" y="60" width="20" height="8" fill="#374151" stroke="#4b5563" strokeWidth="2" />
            <rect x="120" y="60" width="20" height="8" fill="#374151" stroke="#4b5563" strokeWidth="2" />

            {/* Hands on keyboard */}
            <rect x="65" y="125" width="12" height="8" fill="#374151" stroke="#4b5563" strokeWidth="2" />
            <rect x="123" y="125" width="12" height="8" fill="#374151" stroke="#4b5563" strokeWidth="2" />
        </svg>
    );
}

// Blockchain network visualization
export function IllustrationBlockchain({ className, size = 200 }: IllustrationProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            fill="none"
            className={className}
        >
            {/* Center block */}
            <rect x="75" y="75" width="50" height="50" fill="#111827" stroke="#60a5fa" strokeWidth="2" />
            <rect x="85" y="85" width="30" height="30" fill="#1e3a5f" />

            {/* Top block */}
            <rect x="75" y="15" width="50" height="35" fill="#111827" stroke="#374151" strokeWidth="2" />
            <line x1="100" y1="50" x2="100" y2="75" stroke="#374151" strokeWidth="2" />

            {/* Bottom block */}
            <rect x="75" y="150" width="50" height="35" fill="#111827" stroke="#374151" strokeWidth="2" />
            <line x1="100" y1="125" x2="100" y2="150" stroke="#374151" strokeWidth="2" />

            {/* Left block */}
            <rect x="10" y="75" width="40" height="50" fill="#111827" stroke="#374151" strokeWidth="2" />
            <line x1="50" y1="100" x2="75" y2="100" stroke="#374151" strokeWidth="2" />

            {/* Right block */}
            <rect x="150" y="75" width="40" height="50" fill="#111827" stroke="#374151" strokeWidth="2" />
            <line x1="125" y1="100" x2="150" y2="100" stroke="#374151" strokeWidth="2" />

            {/* Corner blocks */}
            <rect x="15" y="15" width="30" height="30" fill="#111827" stroke="#374151" strokeWidth="2" />
            <line x1="45" y1="35" x2="75" y2="75" stroke="#374151" strokeWidth="1" strokeDasharray="4" />

            <rect x="155" y="15" width="30" height="30" fill="#111827" stroke="#374151" strokeWidth="2" />
            <line x1="155" y1="35" x2="125" y2="75" stroke="#374151" strokeWidth="1" strokeDasharray="4" />

            <rect x="15" y="155" width="30" height="30" fill="#111827" stroke="#374151" strokeWidth="2" />
            <line x1="45" y1="165" x2="75" y2="125" stroke="#374151" strokeWidth="1" strokeDasharray="4" />

            <rect x="155" y="155" width="30" height="30" fill="#111827" stroke="#374151" strokeWidth="2" />
            <line x1="155" y1="165" x2="125" y2="125" stroke="#374151" strokeWidth="1" strokeDasharray="4" />

            {/* Pulse animation on center */}
            <rect x="75" y="75" width="50" height="50" fill="none" stroke="#60a5fa" strokeWidth="2">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </rect>
        </svg>
    );
}

// Smart contract document
export function IllustrationContract({ className, size = 200 }: IllustrationProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            fill="none"
            className={className}
        >
            {/* Main document */}
            <rect x="40" y="20" width="120" height="160" fill="#111827" stroke="#374151" strokeWidth="2" />

            {/* Folded corner */}
            <path d="M130 20 L160 50 L160 20 Z" fill="#1f2937" stroke="#374151" strokeWidth="2" />
            <path d="M130 20 L130 50 L160 50" fill="none" stroke="#374151" strokeWidth="2" />

            {/* Header */}
            <rect x="55" y="35" width="60" height="8" fill="#60a5fa" />

            {/* Code lines */}
            <rect x="55" y="55" width="90" height="4" fill="#374151" />
            <rect x="55" y="65" width="70" height="4" fill="#374151" />
            <rect x="55" y="75" width="80" height="4" fill="#374151" />

            {/* Function block */}
            <rect x="55" y="90" width="90" height="35" fill="#1f2937" stroke="#4b5563" strokeWidth="1" />
            <rect x="60" y="95" width="40" height="3" fill="#a78bfa" />
            <rect x="65" y="103" width="50" height="3" fill="#4ade80" />
            <rect x="65" y="111" width="35" height="3" fill="#fbbf24" />

            {/* More lines */}
            <rect x="55" y="135" width="60" height="4" fill="#374151" />
            <rect x="55" y="145" width="85" height="4" fill="#374151" />
            <rect x="55" y="155" width="45" height="4" fill="#374151" />

            {/* Seal/badge */}
            <rect x="120" y="140" width="25" height="25" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="2" />
            <rect x="127" y="147" width="11" height="11" fill="none" stroke="#60a5fa" strokeWidth="1" />
        </svg>
    );
}

// Rocket/Deploy illustration
export function IllustrationDeploy({ className, size = 200 }: IllustrationProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            fill="none"
            className={className}
        >
            {/* Rocket body */}
            <rect x="75" y="40" width="50" height="90" fill="#111827" stroke="#374151" strokeWidth="2" />

            {/* Rocket tip */}
            <path d="M75 40 L100 10 L125 40 Z" fill="#1f2937" stroke="#374151" strokeWidth="2" />

            {/* Window */}
            <rect x="88" y="55" width="24" height="24" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="2" />

            {/* Fins */}
            <path d="M75 100 L55 130 L75 130 Z" fill="#1f2937" stroke="#374151" strokeWidth="2" />
            <path d="M125 100 L145 130 L125 130 Z" fill="#1f2937" stroke="#374151" strokeWidth="2" />

            {/* Flames */}
            <rect x="82" y="130" width="36" height="15" fill="#374151" />
            <rect x="88" y="145" width="8" height="25" fill="#f97316">
                <animate attributeName="height" values="25;35;25" dur="0.3s" repeatCount="indefinite" />
            </rect>
            <rect x="104" y="145" width="8" height="30" fill="#fbbf24">
                <animate attributeName="height" values="30;20;30" dur="0.25s" repeatCount="indefinite" />
            </rect>
            <rect x="96" y="145" width="8" height="35" fill="#ef4444">
                <animate attributeName="height" values="35;45;35" dur="0.35s" repeatCount="indefinite" />
            </rect>

            {/* Speed lines */}
            <rect x="50" y="60" width="15" height="2" fill="#374151">
                <animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite" />
            </rect>
            <rect x="40" y="80" width="20" height="2" fill="#374151">
                <animate attributeName="opacity" values="0;1;0" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="135" y="70" width="18" height="2" fill="#374151">
                <animate attributeName="opacity" values="0;1;0" dur="0.55s" repeatCount="indefinite" />
            </rect>
            <rect x="140" y="95" width="15" height="2" fill="#374151">
                <animate attributeName="opacity" values="0;1;0" dur="0.45s" repeatCount="indefinite" />
            </rect>
        </svg>
    );
}

// AI Brain illustration
export function IllustrationAI({ className, size = 200 }: IllustrationProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            fill="none"
            className={className}
        >
            {/* Outer frame */}
            <rect x="30" y="30" width="140" height="140" fill="#111827" stroke="#374151" strokeWidth="2" />

            {/* Inner circuit board pattern */}
            <rect x="50" y="50" width="100" height="100" fill="#1f2937" stroke="#374151" strokeWidth="1" />

            {/* Central processor */}
            <rect x="75" y="75" width="50" height="50" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="2" />
            <rect x="85" y="85" width="30" height="30" fill="#111827" stroke="#60a5fa" strokeWidth="1" />

            {/* Circuit traces - horizontal */}
            <line x1="50" y1="85" x2="75" y2="85" stroke="#374151" strokeWidth="2" />
            <line x1="50" y1="100" x2="75" y2="100" stroke="#60a5fa" strokeWidth="2" />
            <line x1="50" y1="115" x2="75" y2="115" stroke="#374151" strokeWidth="2" />

            <line x1="125" y1="85" x2="150" y2="85" stroke="#374151" strokeWidth="2" />
            <line x1="125" y1="100" x2="150" y2="100" stroke="#60a5fa" strokeWidth="2" />
            <line x1="125" y1="115" x2="150" y2="115" stroke="#374151" strokeWidth="2" />

            {/* Circuit traces - vertical */}
            <line x1="85" y1="50" x2="85" y2="75" stroke="#374151" strokeWidth="2" />
            <line x1="100" y1="50" x2="100" y2="75" stroke="#60a5fa" strokeWidth="2" />
            <line x1="115" y1="50" x2="115" y2="75" stroke="#374151" strokeWidth="2" />

            <line x1="85" y1="125" x2="85" y2="150" stroke="#374151" strokeWidth="2" />
            <line x1="100" y1="125" x2="100" y2="150" stroke="#60a5fa" strokeWidth="2" />
            <line x1="115" y1="125" x2="115" y2="150" stroke="#374151" strokeWidth="2" />

            {/* Corner nodes */}
            <rect x="50" y="50" width="8" height="8" fill="#4ade80" />
            <rect x="142" y="50" width="8" height="8" fill="#4ade80" />
            <rect x="50" y="142" width="8" height="8" fill="#4ade80" />
            <rect x="142" y="142" width="8" height="8" fill="#4ade80" />

            {/* Center pulse */}
            <rect x="95" y="95" width="10" height="10" fill="#60a5fa">
                <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
            </rect>

            {/* Data flow dots */}
            <circle cx="62" cy="100" r="3" fill="#60a5fa">
                <animate attributeName="cx" values="62;72;62" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="138" cy="100" r="3" fill="#60a5fa">
                <animate attributeName="cx" values="138;128;138" dur="1s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
}

// Wallet illustration
export function IllustrationWallet({ className, size = 200 }: IllustrationProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            fill="none"
            className={className}
        >
            {/* Wallet body */}
            <rect x="30" y="50" width="140" height="100" fill="#111827" stroke="#374151" strokeWidth="2" />

            {/* Wallet flap */}
            <rect x="30" y="40" width="100" height="20" fill="#1f2937" stroke="#374151" strokeWidth="2" />

            {/* Clasp */}
            <rect x="120" y="75" width="40" height="30" fill="#1f2937" stroke="#374151" strokeWidth="2" />
            <rect x="130" y="85" width="20" height="10" fill="#111827" stroke="#60a5fa" strokeWidth="2" />

            {/* Cards inside */}
            <rect x="45" y="70" width="60" height="35" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1" />
            <rect x="50" y="75" width="20" height="4" fill="#60a5fa" />
            <rect x="50" y="82" width="35" height="3" fill="#374151" />
            <rect x="50" y="88" width="25" height="3" fill="#374151" />

            <rect x="50" y="110" width="55" height="25" fill="#1f2937" stroke="#374151" strokeWidth="1" />
            <rect x="55" y="115" width="15" height="4" fill="#4ade80" />
            <rect x="55" y="122" width="30" height="3" fill="#374151" />

            {/* Coins */}
            <rect x="135" y="115" width="20" height="20" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            <rect x="140" y="120" width="10" height="10" fill="none" stroke="#d97706" strokeWidth="1" />
        </svg>
    );
}
