'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { IconSpinner } from '@/components/icons';

// ============================================================================
// BLOCKY BUTTON COMPONENT
// Sharp corners, solid colors, no gradients, distinctive hover states
// ============================================================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children: ReactNode;
}

const variants = {
    primary: 'bg-white text-gray-950 hover:bg-gray-200 border-2 border-white',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 border-2 border-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-500 border-2 border-red-600',
    ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5 border-2 border-transparent',
    outline: 'bg-transparent text-white border-2 border-gray-600 hover:border-white hover:bg-white/5',
};

const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    'inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-all duration-150',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'active:translate-y-[1px]',
                    'focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-gray-950',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <IconSpinner size={16} />}
                <span className={cn(isLoading && 'opacity-0')}>{children}</span>
            </button>
        );
    }
);

Button.displayName = 'Button';
