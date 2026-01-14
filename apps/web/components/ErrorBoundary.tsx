'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { IconRefresh } from '@/components/icons';

// ============================================================================
// ERROR BOUNDARY COMPONENT
// Catches JavaScript errors anywhere in the child component tree
// ============================================================================

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center h-full bg-gray-950 p-8">
                    <div className="max-w-md w-full">
                        <div className="border-2 border-red-800 bg-gray-900 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-3 h-3 bg-red-500" />
                                <h2 className="text-sm font-bold text-red-400 uppercase tracking-widest">
                                    Something went wrong
                                </h2>
                            </div>
                            
                            <p className="text-sm text-gray-400 mb-4">
                                An error occurred while rendering this component.
                            </p>

                            {this.state.error && (
                                <pre className="p-3 bg-gray-950 border border-gray-800 text-xs font-mono text-red-300 overflow-auto max-h-32 mb-4">
                                    {this.state.error.message}
                                </pre>
                            )}

                            <button
                                onClick={this.handleReset}
                                className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold uppercase tracking-wider bg-gray-800 hover:bg-gray-700 text-white border-2 border-gray-700 transition-colors"
                            >
                                <IconRefresh size={14} />
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// ============================================================================
// EDITOR ERROR BOUNDARY - Specific fallback for Monaco Editor
// ============================================================================

interface EditorErrorBoundaryProps {
    children: ReactNode;
}

export function EditorErrorBoundary({ children }: EditorErrorBoundaryProps) {
    return (
        <ErrorBoundary
            fallback={
                <div className="flex flex-col items-center justify-center h-full bg-gray-950 p-8">
                    <div className="text-center">
                        <div className="w-16 h-16 border-2 border-gray-800 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">
                            Editor failed to load
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 text-xs font-bold uppercase bg-gray-800 hover:bg-gray-700 text-white border-2 border-gray-700"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            }
        >
            {children}
        </ErrorBoundary>
    );
}

// ============================================================================
// PREVIEW ERROR BOUNDARY - Specific fallback for UI Preview
// ============================================================================

export function PreviewErrorBoundary({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundary
            fallback={
                <div className="flex flex-col items-center justify-center h-full bg-gray-950 p-8">
                    <div className="text-center">
                        <div className="w-16 h-16 border-2 border-orange-800 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <p className="text-xs text-gray-600 uppercase tracking-widest">
                            Preview unavailable
                        </p>
                    </div>
                </div>
            }
        >
            {children}
        </ErrorBoundary>
    );
}
