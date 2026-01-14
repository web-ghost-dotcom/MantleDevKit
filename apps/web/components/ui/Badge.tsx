'use client';

import { cn } from '@/lib/utils';

// ============================================================================
// BLOCKY BADGE/STATUS COMPONENT
// Sharp corners, solid colors, uppercase text, optional indicator dot
// ============================================================================

interface BadgeProps {
    label: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
    size?: 'sm' | 'md';
    showDot?: boolean;
    className?: string;
}

const variants = {
    default: 'bg-gray-800 text-gray-300 border-gray-700',
    success: 'bg-gray-900 text-green-400 border-green-600',
    warning: 'bg-gray-900 text-yellow-400 border-yellow-600',
    error: 'bg-gray-900 text-red-400 border-red-600',
    info: 'bg-gray-900 text-blue-400 border-blue-600',
    neutral: 'bg-gray-900 text-gray-500 border-gray-700',
};

const dotColors = {
    default: 'bg-gray-500',
    success: 'bg-green-400',
    warning: 'bg-yellow-400',
    error: 'bg-red-400',
    info: 'bg-blue-400',
    neutral: 'bg-gray-600',
};

const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
};

export function Badge({ label, variant = 'default', size = 'md', showDot = true, className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 font-bold uppercase tracking-wider border-2',
                variants[variant],
                sizes[size],
                className
            )}
        >
            {showDot && (
                <span className={cn('w-1.5 h-1.5', dotColors[variant])} />
            )}
            {label}
        </span>
    );
}

// Progress indicator for steps
interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    labels?: string[];
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
    return (
        <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => {
                const stepNum = i + 1;
                const isCompleted = stepNum < currentStep;
                const isActive = stepNum === currentStep;

                return (
                    <div key={i} className="flex items-center gap-2">
                        <div
                            className={cn(
                                'w-8 h-8 flex items-center justify-center border-2 font-mono font-bold text-sm transition-colors',
                                isCompleted && 'bg-white text-gray-950 border-white',
                                isActive && 'bg-gray-800 text-white border-white',
                                !isCompleted && !isActive && 'bg-gray-900 text-gray-600 border-gray-700'
                            )}
                        >
                            {isCompleted ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M4 12l6 6L20 6" />
                                </svg>
                            ) : (
                                stepNum
                            )}
                        </div>
                        {labels && labels[i] && (
                            <span className={cn(
                                'text-xs font-bold uppercase tracking-wider hidden sm:inline',
                                isActive ? 'text-white' : 'text-gray-600'
                            )}>
                                {labels[i]}
                            </span>
                        )}
                        {i < totalSteps - 1 && (
                            <div className={cn(
                                'w-8 h-0.5',
                                stepNum < currentStep ? 'bg-white' : 'bg-gray-700'
                            )} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
