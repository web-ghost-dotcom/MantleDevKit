'use client';

import { SVGProps } from 'react';

// ============================================================================
// MANTLE DEVKIT CUSTOM ICON SYSTEM
// Blocky, geometric, distinctive style - no gradients, no emojis
// All icons use a consistent 24x24 viewBox with 2px stroke
// ============================================================================

type IconProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

const defaultProps = {
    size: 24,
    strokeWidth: 2,
    fill: 'none',
    stroke: 'currentColor',
};

// CORE NAVIGATION & ACTION ICONS

export function IconCube({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
            <path d="M12 12L3 7" />
            <path d="M12 12l9-5" />
            <path d="M12 12v10" />
        </svg>
    );
}

export function IconBlocks({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
        </svg>
    );
}

export function IconCode({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M8 6L3 12l5 6" />
            <path d="M16 6l5 6-5 6" />
            <path d="M14 4l-4 16" />
        </svg>
    );
}

export function IconCompile({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="4" y="4" width="16" height="4" />
            <rect x="4" y="10" width="10" height="4" />
            <rect x="4" y="16" width="6" height="4" />
            <path d="M17 14l4 4-4 4" />
        </svg>
    );
}

export function IconDeploy({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M12 3v12" />
            <path d="M8 11l4 4 4-4" />
            <rect x="4" y="17" width="16" height="4" />
        </svg>
    );
}

export function IconWallet({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="2" y="6" width="20" height="14" />
            <path d="M2 10h20" />
            <rect x="16" y="13" width="3" height="3" />
        </svg>
    );
}

export function IconSettings({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="9" y="9" width="6" height="6" />
            <path d="M12 3v3" />
            <path d="M12 18v3" />
            <path d="M3 12h3" />
            <path d="M18 12h3" />
            <path d="M5.6 5.6l2.1 2.1" />
            <path d="M16.3 16.3l2.1 2.1" />
            <path d="M5.6 18.4l2.1-2.1" />
            <path d="M16.3 7.7l2.1-2.1" />
        </svg>
    );
}

export function IconPlay({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <polygon points="6,4 20,12 6,20" />
        </svg>
    );
}

export function IconCheck({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M4 12l6 6L20 6" />
        </svg>
    );
}

export function IconX({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
        </svg>
    );
}

export function IconPlus({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M12 4v16" />
            <path d="M4 12h16" />
        </svg>
    );
}

export function IconMinus({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M4 12h16" />
        </svg>
    );
}

export function IconChevronRight({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M9 6l6 6-6 6" />
        </svg>
    );
}

export function IconChevronDown({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}

export function IconArrowRight({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M4 12h16" />
            <path d="M14 6l6 6-6 6" />
        </svg>
    );
}

export function IconArrowUp({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M12 20V4" />
            <path d="M6 10l6-6 6 6" />
        </svg>
    );
}

export function IconRefresh({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M4 12a8 8 0 018-8h4" />
            <path d="M16 8l-4-4 4-4" />
            <path d="M20 12a8 8 0 01-8 8H8" />
            <path d="M8 16l4 4-4 4" />
        </svg>
    );
}

export function IconCopy({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="8" y="8" width="12" height="12" />
            <path d="M16 8V4H4v12h4" />
        </svg>
    );
}

export function IconDownload({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M12 3v12" />
            <path d="M8 11l4 4 4-4" />
            <path d="M4 17h16v4H4z" />
        </svg>
    );
}

export function IconUpload({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M12 15V3" />
            <path d="M8 7l4-4 4 4" />
            <path d="M4 17h16v4H4z" />
        </svg>
    );
}

export function IconFile({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M4 4h10l6 6v10H4V4z" />
            <path d="M14 4v6h6" />
        </svg>
    );
}

export function IconFolder({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M2 6h8l2 2h10v12H2V6z" />
        </svg>
    );
}

export function IconTerminal({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="2" y="4" width="20" height="16" />
            <path d="M6 10l4 2-4 2" />
            <path d="M12 16h6" />
        </svg>
    );
}

export function IconLayers({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M12 3L2 8l10 5 10-5-10-5z" />
            <path d="M2 12l10 5 10-5" />
            <path d="M2 17l10 5 10-5" />
        </svg>
    );
}

export function IconNetwork({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="10" y="2" width="4" height="4" />
            <rect x="2" y="18" width="4" height="4" />
            <rect x="10" y="18" width="4" height="4" />
            <rect x="18" y="18" width="4" height="4" />
            <path d="M12 6v6" />
            <path d="M4 18v-4h16v4" />
            <path d="M12 14v4" />
        </svg>
    );
}

export function IconWindow({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="2" y="3" width="20" height="18" />
            <path d="M2 8h20" />
            <rect x="5" y="5" width="2" height="1" />
            <rect x="9" y="5" width="2" height="1" />
            <rect x="5" y="11" width="6" height="4" />
            <path d="M14 11h5" />
            <path d="M14 14h3" />
        </svg>
    );
}

export function IconGraph({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="3" y="3" width="4" height="4" />
            <rect x="17" y="3" width="4" height="4" />
            <rect x="10" y="17" width="4" height="4" />
            <path d="M7 5h10" />
            <path d="M5 7v8l7 4" />
            <path d="M19 7v8l-7 4" />
        </svg>
    );
}

export function IconLock({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="4" y="10" width="16" height="11" />
            <path d="M8 10V6a4 4 0 018 0v4" />
            <rect x="11" y="14" width="2" height="3" />
        </svg>
    );
}

export function IconUnlock({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="4" y="10" width="16" height="11" />
            <path d="M8 10V6a4 4 0 018 0" />
            <rect x="11" y="14" width="2" height="3" />
        </svg>
    );
}

export function IconStar({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M12 3l2.5 6.5H21l-5.5 4 2 6.5L12 16l-5.5 4 2-6.5-5.5-4h6.5L12 3z" />
        </svg>
    );
}

export function IconBolt({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <polygon points="13,2 4,14 12,14 11,22 20,10 12,10" />
        </svg>
    );
}

export function IconSpinner({ size = 24, className, ...props }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`animate-spin ${className || ''}`}
            {...props}
        >
            <path d="M12 3v3" />
            <path d="M12 18v3" opacity="0.3" />
            <path d="M5.6 5.6l2.1 2.1" opacity="0.9" />
            <path d="M16.3 16.3l2.1 2.1" opacity="0.2" />
            <path d="M3 12h3" opacity="0.7" />
            <path d="M18 12h3" opacity="0.4" />
            <path d="M5.6 18.4l2.1-2.1" opacity="0.5" />
            <path d="M16.3 7.7l2.1-2.1" opacity="0.6" />
        </svg>
    );
}

// SPECIAL BRAND ICON - Mantle Logo (Blocky M)
export function IconMantleLogo({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M4 20V4l8 8 8-8v16" />
            <path d="M4 12h4" />
            <path d="M16 12h4" />
        </svg>
    );
}

// CONTRACT TYPE ICONS
export function IconToken({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 6v12" />
            <path d="M9 9h6" />
            <path d="M9 15h6" />
        </svg>
    );
}

export function IconNFT({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="3" y="3" width="18" height="18" />
            <path d="M3 9h18" />
            <path d="M9 9v12" />
            <rect x="11" y="11" width="8" height="8" />
        </svg>
    );
}

export function IconDAO({ size = 24, ...props }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
            <rect x="9" y="2" width="6" height="6" />
            <rect x="2" y="16" width="5" height="5" />
            <rect x="9.5" y="16" width="5" height="5" />
            <rect x="17" y="16" width="5" height="5" />
            <path d="M12 8v4" />
            <path d="M4.5 16v-2h15v2" />
            <path d="M12 14v2" />
        </svg>
    );
}

// Step indicator icons
export function IconStep({ step, active, completed, size = 32 }: { step: number; active?: boolean; completed?: boolean; size?: number }) {
    const bgColor = completed ? 'fill-white' : active ? 'fill-white' : 'fill-none';
    const strokeColor = completed || active ? 'stroke-white' : 'stroke-gray-600';
    const textColor = completed ? 'fill-gray-950' : active ? 'fill-gray-950' : 'fill-gray-600';

    return (
        <svg width={size} height={size} viewBox="0 0 32 32" className="transition-all duration-300">
            <rect
                x="2" y="2"
                width="28" height="28"
                className={`${bgColor} ${strokeColor}`}
                strokeWidth="2"
            />
            {completed ? (
                <path d="M10 16l4 4 8-8" className="stroke-gray-950" strokeWidth="2.5" fill="none" />
            ) : (
                <text
                    x="16" y="21"
                    textAnchor="middle"
                    className={`${textColor} text-sm font-bold`}
                    style={{ fontFamily: 'monospace' }}
                >
                    {step}
                </text>
            )}
        </svg>
    );
}
