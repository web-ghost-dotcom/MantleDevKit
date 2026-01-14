'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { IconCopy, IconCode, IconWindow, IconCheck, IconDownload, IconSpinner, IconRefresh, IconPlay } from '@/components/icons';
import type { UIGenerationProgress } from '@mantle/ai';

// ============================================================================
// UI PREVIEW PANEL
// Shows generated dApp UI with LIVE PREVIEW in iframe
// ============================================================================

interface UIPreviewProps {
    code: string;
    abi?: any[];
    contractAddress?: string;
    isGenerating?: boolean;
    progress?: UIGenerationProgress | null;
    onCodeFixed?: (fixedCode: string) => void;
    onFixSyntaxError?: (code: string, errorMessage: string, errorLine?: number) => Promise<string>;
}

type PreviewTab = 'preview' | 'code';

// Transform the code to be runnable in browser (strip TypeScript and imports)
function prepareCodeForPreview(code: string): string {
    if (!code) return '';
    
    let processedCode = code;
    
    // Remove ALL import statements - very aggressive matching
    // Match: import anything from 'anything';
    // Match: import 'anything';
    // Match: import type anything
    // Match: import { ... } from 'anything';
    // Match multiline imports
    processedCode = processedCode.replace(/^\s*import\s+[\s\S]*?from\s*['"][^'"]*['"]\s*;?\s*$/gm, '');
    processedCode = processedCode.replace(/^\s*import\s*['"][^'"]*['"]\s*;?\s*$/gm, '');
    processedCode = processedCode.replace(/^\s*import\s+type\s+[\s\S]*?from\s*['"][^'"]*['"]\s*;?\s*$/gm, '');
    
    // Remove any remaining import lines that might have been split
    processedCode = processedCode.replace(/^\s*import\s*\{[^}]*\}\s*from\s*['"][^'"]*['"]\s*;?\s*$/gm, '');
    processedCode = processedCode.replace(/^\s*import\s+\*\s+as\s+\w+\s+from\s*['"][^'"]*['"]\s*;?\s*$/gm, '');
    
    // Remove any line that starts with 'import'
    processedCode = processedCode.replace(/^\s*import\b[^;]*;?\s*$/gm, '');
    
    // Remove export statements but keep the content
    processedCode = processedCode.replace(/^export\s+default\s+/gm, '');
    processedCode = processedCode.replace(/^export\s+/gm, '');
    
    // Remove TypeScript interface/type declarations (multiline)
    processedCode = processedCode.replace(/^interface\s+\w+[^{]*\{[\s\S]*?\n\}\s*$/gm, '');
    processedCode = processedCode.replace(/^type\s+\w+\s*=[\s\S]*?;\s*$/gm, '');
    
    // Remove TypeScript generic type parameters from hooks ONLY
    // useState<string>('') -> useState('')
    processedCode = processedCode.replace(/\b(useState|useRef|useMemo|useCallback|useReducer|useContext|useReadContract|useWriteContract)<[^>]+>/g, '$1');
    
    // Remove function return type annotations (: JSX.Element, : React.ReactNode, etc.)
    // function Comp(): JSX.Element { -> function Comp() {
    processedCode = processedCode.replace(/\)\s*:\s*(?:JSX\.Element|React\.\w+|void|null)\s*\{/g, ') {');
    processedCode = processedCode.replace(/\)\s*:\s*(?:JSX\.Element|React\.\w+|void|null)\s*=>/g, ') =>');
    
    // Remove 'as const' and 'as Type' but be careful not to break ternaries
    // Only match 'as' followed by a type name and then whitespace/punctuation
    processedCode = processedCode.replace(/\s+as\s+const\b/g, '');
    processedCode = processedCode.replace(/\s+as\s+\w+\s*(?=[,;\)\]\}])/g, '');
    
    // Remove satisfies keyword
    processedCode = processedCode.replace(/\s+satisfies\s+\w+/g, '');
    
    // Remove empty lines that might have been created
    processedCode = processedCode.replace(/\n{3,}/g, '\n\n');
    
    return processedCode.trim();
}

// Generate HTML that can render the React component in an iframe
function generatePreviewHTML(code: string): string {
    const processedCode = prepareCodeForPreview(code);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dApp Preview</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        gray: {
                            950: '#0a0a0a',
                            900: '#171717',
                            800: '#262626',
                            700: '#404040',
                            600: '#525252',
                            500: '#737373',
                            400: '#a3a3a3',
                            300: '#d4d4d4',
                        }
                    }
                }
            }
        }
    <\/script>
    <style>
        * { box-sizing: border-box; }
        body { 
            margin: 0; 
            padding: 0; 
            background: #0a0a0a; 
            color: white; 
            font-family: system-ui, -apple-system, sans-serif;
            min-height: 100vh;
        }
        #root { min-height: 100vh; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-spin { animation: spin 1s linear infinite; }
    </style>
</head>
<body class="dark">
    <div id="root"></div>
    <div id="error-display" style="display:none; padding: 20px; background: #1a0a0a; border: 2px solid #7f1d1d; margin: 20px;">
        <div style="color: #f87171; font-weight: bold; margin-bottom: 8px;">Preview Error</div>
        <pre id="error-message" style="color: #a3a3a3; font-size: 12px; font-family: monospace; white-space: pre-wrap;"></pre>
    </div>
    
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>
    <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"><\/script>
    
    <script>
        // Make React available globally
        window.React = React;
        window.ReactDOM = ReactDOM;
        
        // Mock wagmi hooks with realistic default data
        window.useAccount = () => ({ 
            address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', 
            isConnected: true,
            isConnecting: false,
            isDisconnected: false,
            status: 'connected'
        });
        window.useBalance = (config) => ({ 
            data: { 
                formatted: '1.5', 
                symbol: config?.token ? 'TOKEN' : 'MNT',
                value: BigInt('1500000000000000000'),
                decimals: 18
            }, 
            isLoading: false,
            isError: false,
            refetch: () => Promise.resolve()
        });
        
        // Smart useReadContract that returns sensible defaults based on function name
        window.useReadContract = (config) => {
            const funcName = config?.functionName?.toLowerCase() || '';
            let mockData = null;
            
            // Return sensible defaults based on common function names
            if (funcName === 'name') mockData = 'Mock Token';
            else if (funcName === 'symbol') mockData = 'MTK';
            else if (funcName === 'decimals') mockData = 18;
            else if (funcName === 'totalsupply') mockData = BigInt('1000000000000000000000000');
            else if (funcName === 'balanceof') mockData = BigInt('1500000000000000000');
            else if (funcName === 'allowance') mockData = BigInt('0');
            else if (funcName === 'owner') mockData = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
            else if (funcName === 'tokenuri') mockData = 'https://example.com/token/1';
            else if (funcName === 'ownerof') mockData = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
            else if (funcName === 'getapproved') mockData = '0x0000000000000000000000000000000000000000';
            else if (funcName === 'isapprovedforall') mockData = false;
            else if (funcName === 'supportsinterface') mockData = true;
            else if (funcName.includes('balance') || funcName.includes('amount')) mockData = BigInt('1000000000000000000');
            else if (funcName.includes('count') || funcName.includes('total') || funcName.includes('supply')) mockData = BigInt('1000');
            else if (funcName.includes('rate') || funcName.includes('price')) mockData = BigInt('1000000000000000000');
            else if (funcName.includes('address') || funcName.includes('owner')) mockData = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
            else if (funcName.includes('bool') || funcName.includes('is') || funcName.includes('has')) mockData = false;
            else mockData = BigInt('0'); // Default to 0 for unknown numeric values
            
            return { 
                data: mockData, 
                isLoading: false, 
                isError: false,
                error: null,
                refetch: () => Promise.resolve({ data: mockData }),
                isFetching: false,
                isRefetching: false,
                status: 'success'
            };
        };
        
        window.useWriteContract = () => ({ 
            writeContract: (args) => { console.log('Mock write:', args); }, 
            writeContractAsync: async (args) => { console.log('Mock write async:', args); return '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'; },
            isPending: false, 
            isSuccess: false,
            isError: false,
            error: null,
            data: null,
            reset: () => {},
            status: 'idle'
        });
        window.useWaitForTransactionReceipt = (config) => ({ 
            isLoading: false, 
            isSuccess: config?.hash ? true : false, 
            isError: false,
            data: config?.hash ? { status: 'success', blockNumber: BigInt(12345678) } : null 
        });
        window.useChainId = () => 5000;
        window.useConnect = () => ({ 
            connect: () => console.log('Mock connect'), 
            connectAsync: async () => console.log('Mock connect async'),
            connectors: [{ id: 'injected', name: 'MetaMask' }],
            isPending: false,
            isSuccess: true,
            error: null
        });
        window.useDisconnect = () => ({ 
            disconnect: () => console.log('Mock disconnect'),
            disconnectAsync: async () => console.log('Mock disconnect async'),
            isPending: false
        });
        window.useSwitchChain = () => ({
            switchChain: () => console.log('Mock switch chain'),
            isPending: false,
            chains: [{ id: 5000, name: 'Mantle' }, { id: 5003, name: 'Mantle Sepolia' }]
        });
        
        // Mock viem functions
        window.formatEther = (val) => (Number(val || 0) / 1e18).toFixed(4);
        window.parseEther = (val) => BigInt(Math.floor(Number(val || 0) * 1e18));
        window.formatUnits = (val, decimals) => (Number(val || 0) / Math.pow(10, decimals || 18)).toFixed(4);
        window.parseUnits = (val, decimals) => BigInt(Math.floor(Number(val || 0) * Math.pow(10, decimals || 18)));
        window.formatAddress = (addr) => addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '';
        
        // Mock framer-motion - create actual component functions, not a proxy
        const createMotionComponent = (tag) => {
            const MotionComp = ({ children, className, style, onClick, disabled, whileHover, whileTap, initial, animate, exit, transition, variants, ...rest }) => {
                return React.createElement(tag, { className, style, onClick, disabled, ...rest }, children);
            };
            return MotionComp;
        };
        
        window.motion = {
            div: createMotionComponent('div'),
            button: createMotionComponent('button'),
            span: createMotionComponent('span'),
            p: createMotionComponent('p'),
            h1: createMotionComponent('h1'),
            h2: createMotionComponent('h2'),
            h3: createMotionComponent('h3'),
            section: createMotionComponent('section'),
            header: createMotionComponent('header'),
            footer: createMotionComponent('footer'),
            nav: createMotionComponent('nav'),
            main: createMotionComponent('main'),
            article: createMotionComponent('article'),
            aside: createMotionComponent('aside'),
            ul: createMotionComponent('ul'),
            li: createMotionComponent('li'),
            a: createMotionComponent('a'),
            form: createMotionComponent('form'),
            input: createMotionComponent('input'),
            label: createMotionComponent('label'),
            img: createMotionComponent('img'),
            svg: createMotionComponent('svg'),
            path: createMotionComponent('path'),
            table: createMotionComponent('table'),
            tr: createMotionComponent('tr'),
            td: createMotionComponent('td'),
            th: createMotionComponent('th'),
        };
        window.AnimatePresence = ({ children }) => children;
        
        // Mock wagmi connectors
        window.InjectedConnector = class InjectedConnector { constructor() {} };
        window.WalletConnectConnector = class WalletConnectConnector { constructor() {} };
        window.CoinbaseWalletConnector = class CoinbaseWalletConnector { constructor() {} };
        
        // Mock wagmi config functions
        window.createConfig = () => ({});
        window.http = () => ({});
        window.getDefaultConfig = () => ({});
        
        // Mock lucide-react icons - create SVG-based icons for better visuals
        const createIcon = (pathD) => ({ size = 24, className = '' }) => 
            React.createElement('svg', { 
                width: size, 
                height: size, 
                viewBox: '0 0 24 24', 
                fill: 'none', 
                stroke: 'currentColor', 
                strokeWidth: 2, 
                strokeLinecap: 'round', 
                strokeLinejoin: 'round',
                className: className 
            }, React.createElement('path', { d: pathD }));
        
        // Define icons with actual SVG paths for visual representation
        window.Wallet = createIcon('M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1');
        window.ArrowRight = createIcon('M5 12h14M12 5l7 7-7 7');
        window.Check = createIcon('M20 6L9 17l-5-5');
        window.X = createIcon('M18 6L6 18M6 6l12 12');
        window.Loader2 = createIcon('M21 12a9 9 0 1 1-6.219-8.56');
        window.Copy = createIcon('M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2z M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2');
        window.ExternalLink = createIcon('M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3');
        window.ChevronDown = createIcon('M6 9l6 6 6-6');
        window.ChevronUp = createIcon('M18 15l-6-6-6 6');
        window.Plus = createIcon('M12 5v14M5 12h14');
        window.Minus = createIcon('M5 12h14');
        window.RefreshCw = createIcon('M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5 M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16 M21 21v-5h-5');
        window.Send = createIcon('M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z');
        window.Coins = createIcon('M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0');
        window.Image = createIcon('M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M21 15l-5-5L5 21');
        window.Users = createIcon('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z');
        window.Vote = createIcon('M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5');
        window.Lock = createIcon('M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4');
        window.Unlock = createIcon('M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 9.9-1');
        window.TrendingUp = createIcon('M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6');
        window.Clock = createIcon('M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0 M12 6v6l4 2');
        window.AlertCircle = createIcon('M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0 M12 8v4 M12 16h.01');
        window.Info = createIcon('M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0 M12 16v-4 M12 8h.01');
        
        // Additional commonly used icons
        window.Settings = createIcon('M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z');
        window.Home = createIcon('M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10');
        window.Search = createIcon('M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z');
        window.Menu = createIcon('M3 12h18M3 6h18M3 18h18');
        window.ArrowLeft = createIcon('M19 12H5M12 19l-7-7 7-7');
        window.ArrowUp = createIcon('M12 19V5M5 12l7-7 7 7');
        window.ArrowDown = createIcon('M12 5v14M19 12l-7 7-7-7');
        window.Heart = createIcon('M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z');
        window.Star = createIcon('M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z');
        window.Trash = createIcon('M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2');
        window.Edit = createIcon('M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z');
        window.Eye = createIcon('M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0');
        window.EyeOff = createIcon('M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24 M1 1l22 22');
        window.Download = createIcon('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3');
        window.Upload = createIcon('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12');
        window.Link = createIcon('M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71');
        window.Shield = createIcon('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z');
        window.Zap = createIcon('M13 2L3 14h9l-1 8 10-12h-9l1-8z');
        window.Activity = createIcon('M22 12h-4l-3 9L9 3l-3 9H2');
        window.Gift = createIcon('M20 12v10H4V12 M2 7h20v5H2z M12 22V7 M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z');
        window.Award = createIcon('M12 15l-2 5-1-3-3 1 2-5 M12 15l2 5 1-3 3 1-2-5 M12 12m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0');
        window.Percent = createIcon('M19 5L5 19 M6.5 6.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0 M17.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0');
        window.DollarSign = createIcon('M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6');
    <\/script>
    
    <script type="text/babel" data-presets="react,typescript">
        const { useState, useEffect, useMemo, useCallback, useRef } = React;
        
        // Make mocks available in this scope
        const useAccount = window.useAccount;
        const useBalance = window.useBalance;
        const useReadContract = window.useReadContract;
        const useWriteContract = window.useWriteContract;
        const useWaitForTransactionReceipt = window.useWaitForTransactionReceipt;
        const useChainId = window.useChainId;
        const useConnect = window.useConnect;
        const useDisconnect = window.useDisconnect;
        const useSwitchChain = window.useSwitchChain;
        const formatEther = window.formatEther;
        const parseEther = window.parseEther;
        const formatUnits = window.formatUnits;
        const parseUnits = window.parseUnits;
        const motion = window.motion;
        const AnimatePresence = window.AnimatePresence;
        
        // Wagmi connectors and config
        const InjectedConnector = window.InjectedConnector;
        const WalletConnectConnector = window.WalletConnectConnector;
        const CoinbaseWalletConnector = window.CoinbaseWalletConnector;
        const createConfig = window.createConfig;
        const http = window.http;
        const getDefaultConfig = window.getDefaultConfig;
        
        // Icons - all available globally
        const Wallet = window.Wallet;
        const ArrowRight = window.ArrowRight;
        const ArrowLeft = window.ArrowLeft;
        const ArrowUp = window.ArrowUp;
        const ArrowDown = window.ArrowDown;
        const Check = window.Check;
        const X = window.X;
        const Loader2 = window.Loader2;
        const Copy = window.Copy;
        const ExternalLink = window.ExternalLink;
        const ChevronDown = window.ChevronDown;
        const ChevronUp = window.ChevronUp;
        const Plus = window.Plus;
        const Minus = window.Minus;
        const RefreshCw = window.RefreshCw;
        const Send = window.Send;
        const Coins = window.Coins;
        const Image = window.Image;
        const Users = window.Users;
        const Vote = window.Vote;
        const Lock = window.Lock;
        const Unlock = window.Unlock;
        const TrendingUp = window.TrendingUp;
        const Clock = window.Clock;
        const AlertCircle = window.AlertCircle;
        const Info = window.Info;
        const Settings = window.Settings;
        const Home = window.Home;
        const Search = window.Search;
        const Menu = window.Menu;
        const Heart = window.Heart;
        const Star = window.Star;
        const Trash = window.Trash;
        const Edit = window.Edit;
        const Eye = window.Eye;
        const EyeOff = window.EyeOff;
        const Download = window.Download;
        const Upload = window.Upload;
        const Link = window.Link;
        const Shield = window.Shield;
        const Zap = window.Zap;
        const Activity = window.Activity;
        const Gift = window.Gift;
        const Award = window.Award;
        const Percent = window.Percent;
        const DollarSign = window.DollarSign;
        
        try {
            // User's generated code
            ${processedCode}
            
            // Find the main component
            const possibleNames = ['App', 'Main', 'Home', 'Dashboard', 'DApp', 'TokenDashboard', 'NFTGallery', 'StakingApp', 'ContractUI', 'TokenApp', 'NFTApp'];
            let RootComponent = null;
            
            for (const name of possibleNames) {
                try {
                    const comp = eval(name);
                    if (typeof comp === 'function') {
                        RootComponent = comp;
                        break;
                    }
                } catch (e) {
                    // Component not found, try next
                }
            }
            
            if (RootComponent) {
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(React.createElement(RootComponent));
            } else {
                // Show success message if code parsed but no component found
                document.getElementById('root').innerHTML = \`
                    <div style="padding: 40px; text-align: center;">
                        <div style="width: 64px; height: 64px; border: 2px solid #22c55e; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
                            <svg width="24" height="24" fill="none" stroke="#22c55e" stroke-width="2" viewBox="0 0 24 24">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <div style="color: #22c55e; font-weight: bold; margin-bottom: 8px;">Code Generated Successfully</div>
                        <div style="color: #666; font-size: 14px;">Download the code and run in your project to see the full UI</div>
                    </div>
                \`;
            }
        } catch (error) {
            console.error('Preview error:', error);
            
            // Extract error line number if available
            const errorMatch = error.message.match(/(\d+):(\d+)/);
            const errorLine = errorMatch ? parseInt(errorMatch[1]) : null;
            
            // Post error to parent window for auto-fix
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({
                    type: 'PREVIEW_SYNTAX_ERROR',
                    error: error.message,
                    line: errorLine
                }, '*');
            }
            
            document.getElementById('root').style.display = 'none';
            document.getElementById('error-display').style.display = 'block';
            document.getElementById('error-message').textContent = error.message + '\\n\\nAttempting to auto-fix...';
        }
        
        // Global error handler
        window.addEventListener('error', (event) => {
            if (event.error && event.error.message && event.error.message.includes('SyntaxError')) {
                const errorMatch = event.error.message.match(/(\d+):(\d+)/);
                const errorLine = errorMatch ? parseInt(errorMatch[1]) : null;
                
                if (window.parent && window.parent !== window) {
                    window.parent.postMessage({
                        type: 'PREVIEW_SYNTAX_ERROR',
                        error: event.error.message,
                        line: errorLine
                    }, '*');
                }
            }
        });
    <\/script>
</body>
</html>`;
}

export default function UIPreview({ code, abi, contractAddress, isGenerating, progress, onCodeFixed, onFixSyntaxError }: UIPreviewProps) {
    const [activeTab, setActiveTab] = useState<PreviewTab>('preview');
    const [copied, setCopied] = useState(false);
    const [previewKey, setPreviewKey] = useState(0);
    const [isFixingError, setIsFixingError] = useState(false);
    const [fixAttempts, setFixAttempts] = useState(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const lastErrorRef = useRef<string | null>(null);

    // Generate preview HTML
    const previewHTML = useMemo(() => {
        if (!code) return '';
        return generatePreviewHTML(code);
    }, [code]);

    // Create blob URL for iframe
    const previewUrl = useMemo(() => {
        if (!previewHTML) return '';
        const blob = new Blob([previewHTML], { type: 'text/html' });
        return URL.createObjectURL(blob);
    }, [previewHTML, previewKey]);

    // Cleanup blob URL
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // Listen for syntax errors from iframe and auto-fix
    useEffect(() => {
        const handleMessage = async (event: MessageEvent) => {
            if (event.data?.type === 'PREVIEW_SYNTAX_ERROR' && code && !isFixingError && fixAttempts < 3) {
                const errorMessage = event.data.error;
                const errorLine = event.data.line;
                
                // Avoid fixing the same error multiple times
                if (lastErrorRef.current === errorMessage) {
                    return;
                }
                lastErrorRef.current = errorMessage;
                
                setIsFixingError(true);
                setFixAttempts(prev => prev + 1);
                
                try {
                    if (!onFixSyntaxError) {
                        console.error('Syntax error fix function not available');
                        setIsFixingError(false);
                        return;
                    }
                    
                    // Extract problematic code section if we have a line number
                    let codeToFix = code;
                    if (errorLine && errorLine > 0) {
                        const lines = code.split('\n');
                        const startLine = Math.max(0, errorLine - 10);
                        const endLine = Math.min(lines.length, errorLine + 10);
                        codeToFix = lines.slice(startLine, endLine).join('\n');
                    }
                    
                    const fixedCode = await onFixSyntaxError(codeToFix, errorMessage, errorLine);
                    
                    // Replace the problematic section in the full code
                    if (errorLine && errorLine > 0 && fixedCode !== codeToFix) {
                        const lines = code.split('\n');
                        const startLine = Math.max(0, errorLine - 10);
                        const endLine = Math.min(lines.length, errorLine + 10);
                        const newCode = [
                            ...lines.slice(0, startLine),
                            fixedCode,
                            ...lines.slice(endLine)
                        ].join('\n');
                        
                        if (onCodeFixed) {
                            onCodeFixed(newCode);
                        }
                    } else if (fixedCode && fixedCode !== code) {
                        // Replace entire code if we couldn't isolate the section
                        if (onCodeFixed) {
                            onCodeFixed(fixedCode);
                        }
                    }
                    
                    // Reset error tracking after a delay
                    setTimeout(() => {
                        lastErrorRef.current = null;
                        setIsFixingError(false);
                        setPreviewKey(k => k + 1); // Refresh preview
                    }, 1000);
                } catch (fixError: any) {
                    console.error('Failed to auto-fix syntax error:', fixError);
                    setIsFixingError(false);
                    lastErrorRef.current = null;
                }
            }
        };
        
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [code, isFixingError, fixAttempts, onCodeFixed, onFixSyntaxError]);
    
    // Reset fix attempts when code changes
    useEffect(() => {
        setFixAttempts(0);
        lastErrorRef.current = null;
    }, [code]);

    const copyCode = async () => {
        if (!code) return;
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Silent fail
        }
    };

    const downloadCode = () => {
        if (!code) return;
        const blob = new Blob([code], { type: 'text/typescript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'App.tsx';
        a.click();
        URL.revokeObjectURL(url);
    };

    const refreshPreview = () => {
        setPreviewKey(k => k + 1);
    };

    // Detect contract type
    const getContractType = () => {
        if (!abi) return 'Contract';
        const names = abi.filter(x => x.type === 'function').map(x => x.name?.toLowerCase() || '');
        if (names.includes('tokenuri') || names.includes('ownerof')) return 'NFT';
        if (names.includes('balanceofbatch')) return 'Multi-Token';
        if (names.includes('transfer') && names.includes('approve')) return 'Token';
        if (names.includes('stake')) return 'Staking';
        if (names.includes('propose')) return 'Governance';
        if (names.includes('submittransaction')) return 'Multisig';
        return 'Contract';
    };

    // Show generation progress
    if (isGenerating && progress) {
        return (
            <div className="h-full flex flex-col bg-gray-950">
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 border-2 border-purple-500 mx-auto mb-4 flex items-center justify-center"
                            >
                                <IconSpinner size={24} className="text-purple-400" />
                            </motion.div>
                            <h3 className="text-lg font-bold mb-1">
                                {progress.step === 'planning' && 'Planning Your dApp'}
                                {progress.step === 'generating' && 'Generating Components'}
                                {progress.step === 'assembling' && 'Assembling Application'}
                                {progress.step === 'complete' && 'Complete!'}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {progress.step === 'planning' && 'Analyzing contract and creating component plan...'}
                                {progress.step === 'generating' && `Building ${progress.currentComponent}...`}
                                {progress.step === 'assembling' && 'Combining all components into final app...'}
                            </p>
                        </div>

                        {/* Plan Info */}
                        {progress.plan && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-gray-900 border-2 border-gray-800 mb-6"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-bold">{progress.plan.appName}</span>
                                    <span className="text-xs text-gray-500">{progress.plan.theme.style}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">{progress.plan.description}</p>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                        {progress.plan.theme.primary.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-gray-600">
                                        {progress.totalComponents} components
                                    </span>
                                </div>
                            </motion.div>
                        )}

                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500">Progress</span>
                                <span className="text-xs text-gray-500">
                                    {progress.completedComponents.length} / {progress.totalComponents}
                                </span>
                            </div>
                            <div className="h-2 bg-gray-800 overflow-hidden">
                                <motion.div
                                    className="h-full bg-purple-500"
                                    initial={{ width: 0 }}
                                    animate={{ 
                                        width: progress.totalComponents > 0 
                                            ? `${(progress.completedComponents.length / progress.totalComponents) * 100}%`
                                            : '10%'
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>

                        {/* Component List */}
                        {progress.plan && (
                            <div className="space-y-2">
                                {progress.plan.components.map((comp, i) => {
                                    const isCompleted = progress.completedComponents.includes(comp.name);
                                    const isCurrent = progress.currentComponent === comp.name;
                                    
                                    return (
                                        <motion.div
                                            key={comp.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className={`flex items-center gap-3 p-2 border ${
                                                isCompleted 
                                                    ? 'border-green-800 bg-green-500/5' 
                                                    : isCurrent 
                                                        ? 'border-purple-500 bg-purple-500/10' 
                                                        : 'border-gray-800 bg-gray-900'
                                            }`}
                                        >
                                            <div className={`w-5 h-5 flex items-center justify-center border ${
                                                isCompleted 
                                                    ? 'border-green-500 bg-green-500/20' 
                                                    : isCurrent 
                                                        ? 'border-purple-500' 
                                                        : 'border-gray-700'
                                            }`}>
                                                {isCompleted ? (
                                                    <IconCheck size={12} className="text-green-400" />
                                                ) : isCurrent ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <IconSpinner size={10} className="text-purple-400" />
                                                    </motion.div>
                                                ) : (
                                                    <span className="text-[10px] text-gray-600">{i + 1}</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={`text-xs font-bold truncate ${
                                                    isCompleted ? 'text-green-400' : isCurrent ? 'text-purple-400' : 'text-gray-500'
                                                }`}>
                                                    {comp.name}
                                                </div>
                                            </div>
                                            <span className={`text-[10px] uppercase ${
                                                comp.type === 'layout' ? 'text-blue-500' :
                                                comp.type === 'feature' ? 'text-orange-500' : 'text-gray-600'
                                            }`}>
                                                {comp.type}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-gray-950">
            {/* Preview Toolbar */}
            <div className="h-10 border-b border-gray-800 flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500/50 border border-red-500" />
                        <span className="w-3 h-3 bg-yellow-500/50 border border-yellow-500" />
                        <span className="w-3 h-3 bg-green-500/50 border border-green-500" />
                    </div>
                    <div className="flex items-center border border-gray-700">
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`px-3 py-1 text-xs font-bold ${activeTab === 'preview' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-white'}`}
                        >
                            <IconPlay size={12} className="inline mr-1" />
                            PREVIEW
                        </button>
                        <button
                            onClick={() => setActiveTab('code')}
                            className={`px-3 py-1 text-xs font-bold ${activeTab === 'code' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-white'}`}
                        >
                            <IconCode size={12} className="inline mr-1" />
                            CODE
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {code && activeTab === 'preview' && (
                        <button
                            onClick={refreshPreview}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-white"
                            title="Refresh preview"
                        >
                            <IconRefresh size={12} />
                        </button>
                    )}
                    {code && (
                        <>
                            <button
                                onClick={copyCode}
                                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-white"
                            >
                                {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
                                {copied ? 'COPIED' : 'COPY'}
                            </button>
                            <button
                                onClick={downloadCode}
                                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-white"
                            >
                                <IconDownload size={12} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-hidden relative">
                {isFixingError && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-purple-500/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
                        <IconSpinner size={16} className="animate-spin" />
                        <span className="text-sm font-bold">Auto-fixing syntax error...</span>
                    </div>
                )}
                {activeTab === 'preview' ? (
                    <div className="h-full bg-gray-900">
                        {code && previewUrl ? (
                            <iframe
                                ref={iframeRef}
                                key={previewKey}
                                src={previewUrl}
                                className="w-full h-full border-0"
                                sandbox="allow-scripts allow-same-origin"
                                title="UI Preview"
                            />
                        ) : (
                            <div className="h-full flex items-center justify-center p-8">
                                <div className="text-center max-w-md">
                                    <div className="w-20 h-20 border-2 border-gray-800 mx-auto mb-6 flex items-center justify-center">
                                        <IconWindow size={32} className="text-gray-700" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Generate Your dApp UI</h3>
                                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                        Click "Generate UI" after compiling your contract to create a 
                                        complete, production-ready React frontend.
                                    </p>
                                    <div className="p-4 bg-gray-950 border border-gray-800 text-left">
                                        <div className="text-xs font-bold text-gray-500 mb-3">LIVE PREVIEW INCLUDES:</div>
                                        <ul className="space-y-2 text-xs text-gray-500">
                                            <li className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-green-500" />
                                                Real-time rendered preview
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-green-500" />
                                                Mock wallet data for testing
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-green-500" />
                                                Full Tailwind CSS styling
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-green-500" />
                                                Interactive components
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full bg-gray-950 overflow-auto">
                        {code ? (
                            <div className="relative">
                                {/* Code header */}
                                <div className="sticky top-0 px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center justify-between z-10">
                                    <span className="text-xs font-mono text-gray-500">App.tsx</span>
                                    <span className="text-xs text-gray-600">{code.split('\n').length} lines</span>
                                </div>
                                {/* Code content with line numbers */}
                                <div className="flex">
                                    <div className="flex-shrink-0 py-4 px-2 text-right select-none border-r border-gray-800 bg-gray-900/50">
                                        {code.split('\n').map((_, i) => (
                                            <div key={i} className="text-xs font-mono text-gray-700 leading-5">
                                                {i + 1}
                                            </div>
                                        ))}
                                    </div>
                                    <pre className="flex-1 p-4 text-xs font-mono text-gray-300 overflow-x-auto leading-5">
                                        {code}
                                    </pre>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center min-h-[300px]">
                                <div className="text-center">
                                    <div className="w-16 h-16 border-2 border-gray-800 mx-auto mb-4 flex items-center justify-center">
                                        <IconCode size={24} className="text-gray-700" />
                                    </div>
                                    <p className="text-xs text-gray-600 uppercase tracking-widest">
                                        No generated code yet
                                    </p>
                                    <p className="text-xs text-gray-700 mt-2">
                                        Compile a contract and click "Generate UI"
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div className="h-6 border-t border-gray-800 bg-gray-900 flex items-center justify-between px-4 text-xs">
                <span className="text-gray-600">
                    {code ? (activeTab === 'preview' ? 'Live Preview (Mock Data)' : 'Source Code') : (abi ? `${abi.filter(x => x.type === 'function').length} functions` : 'No ABI')}
                </span>
                <span className="text-gray-600">React + TypeScript + Tailwind + wagmi</span>
            </div>
        </div>
    );
}
