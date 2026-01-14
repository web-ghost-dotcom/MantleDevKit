'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ============================================================================
// BLOCKY CARD COMPONENT  
// Sharp corners, solid borders, no gradients, clean sections
// ============================================================================

interface CardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    actions?: ReactNode;
    noPadding?: boolean;
}

export function Card({ children, className, title, actions, noPadding }: CardProps) {
    return (
        <div
            className={cn(
                'bg-gray-900 border-2 border-gray-800',
                'transition-colors duration-150',
                className
            )}
        >
            {(title || actions) && (
                <div className="flex items-center justify-between px-5 py-4 border-b-2 border-gray-800">
                    {title && (
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                            {title}
                        </h3>
                    )}
                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </div>
            )}
            <div className={cn(!noPadding && 'p-5')}>{children}</div>
        </div>
    );
}

// Variant for interactive cards
interface CardButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    active?: boolean;
}

export function CardButton({ children, className, onClick, active }: CardButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'w-full text-left bg-gray-900 border-2 border-gray-800 p-5',
                'transition-all duration-150',
                'hover:border-gray-600 hover:bg-gray-850',
                'focus:outline-none focus:border-white',
                'active:translate-y-[1px]',
                active && 'border-white bg-gray-800',
                className
            )}
        >
            {children}
        </button>
    );
}

// Simple section divider inside cards
export function CardDivider() {
    return <div className="border-t-2 border-gray-800 my-4 -mx-5" />;
}
