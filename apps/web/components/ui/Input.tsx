'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// ============================================================================
// BLOCKY INPUT COMPONENT
// Sharp corners, solid borders, monospace text, clear focus states
// ============================================================================

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn(
                        'w-full h-10 px-3 bg-gray-950 border-2 border-gray-700',
                        'text-sm font-mono text-white placeholder:text-gray-600',
                        'transition-colors duration-150',
                        'focus:outline-none focus:border-white',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        error && 'border-red-500 focus:border-red-500',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs font-mono text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

// Textarea variant
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={cn(
                        'w-full min-h-[120px] p-3 bg-gray-950 border-2 border-gray-700 resize-none',
                        'text-sm font-mono text-white placeholder:text-gray-600 leading-relaxed',
                        'transition-colors duration-150',
                        'focus:outline-none focus:border-white',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        error && 'border-red-500 focus:border-red-500',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs font-mono text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';

// Select variant
interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, options, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    className={cn(
                        'w-full h-10 px-3 bg-gray-950 border-2 border-gray-700 appearance-none',
                        'text-sm font-mono text-white',
                        'transition-colors duration-150',
                        'focus:outline-none focus:border-white',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        className
                    )}
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
);

Select.displayName = 'Select';
