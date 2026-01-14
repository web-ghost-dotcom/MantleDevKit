'use client';

import { useRef, useEffect } from 'react';
import Editor, { OnMount, loader } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

// ============================================================================
// MONACO CODE EDITOR WRAPPER
// Configured for Solidity with dark theme matching our design
// ============================================================================

interface CodeEditorProps {
    value: string;
    onChange?: (value: string) => void;
    language?: 'sol' | 'json' | 'javascript' | 'typescript' | 'html' | 'css';
    readOnly?: boolean;
    height?: string;
    onMount?: (editor: editor.IStandaloneCodeEditor) => void;
}

// Map our language shortcuts to Monaco language IDs
const LANGUAGE_MAP: Record<string, string> = {
    sol: 'sol',
    json: 'json',
    javascript: 'javascript',
    typescript: 'typescript',
    html: 'html',
    css: 'css',
};

export default function CodeEditor({
    value,
    onChange,
    language = 'sol',
    readOnly = false,
    height = '100%',
    onMount: onMountProp
}: CodeEditorProps) {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    // Configure Monaco before first render
    useEffect(() => {
        loader.init().then((monaco) => {
            // Register Solidity language if not already registered
            if (!monaco.languages.getLanguages().some((lang: any) => lang.id === 'sol')) {
                monaco.languages.register({ id: 'sol' });

                // Solidity syntax highlighting
                monaco.languages.setMonarchTokensProvider('sol', {
                    keywords: [
                        'pragma', 'solidity', 'import', 'contract', 'interface', 'library',
                        'function', 'modifier', 'event', 'struct', 'enum', 'mapping',
                        'public', 'private', 'internal', 'external', 'pure', 'view',
                        'payable', 'virtual', 'override', 'abstract', 'returns', 'return',
                        'if', 'else', 'for', 'while', 'do', 'break', 'continue',
                        'new', 'delete', 'emit', 'revert', 'require', 'assert',
                        'try', 'catch', 'throw', 'using', 'is', 'as', 'type',
                        'constructor', 'receive', 'fallback', 'error', 'unchecked',
                        'memory', 'storage', 'calldata', 'constant', 'immutable',
                        'indexed', 'anonymous'
                    ],
                    typeKeywords: [
                        'address', 'bool', 'string', 'bytes', 'byte',
                        'int', 'int8', 'int16', 'int32', 'int64', 'int128', 'int256',
                        'uint', 'uint8', 'uint16', 'uint32', 'uint64', 'uint128', 'uint256',
                        'bytes1', 'bytes2', 'bytes4', 'bytes8', 'bytes16', 'bytes32',
                        'fixed', 'ufixed'
                    ],
                    operators: [
                        '=', '>', '<', '!', '~', '?', ':',
                        '==', '<=', '>=', '!=', '&&', '||', '++', '--',
                        '+', '-', '*', '/', '&', '|', '^', '%', '<<',
                        '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',
                        '^=', '%=', '<<=', '>>=', '>>>='
                    ],
                    symbols: /[=><!~?:&|+\-*\/\^%]+/,
                    tokenizer: {
                        root: [
                            [/[a-zA-Z_]\w*/, {
                                cases: {
                                    '@typeKeywords': 'type',
                                    '@keywords': 'keyword',
                                    '@default': 'identifier'
                                }
                            }],
                            { include: '@whitespace' },
                            [/[{}()\[\]]/, '@brackets'],
                            [/@symbols/, {
                                cases: {
                                    '@operators': 'operator',
                                    '@default': ''
                                }
                            }],
                            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
                            [/\d+/, 'number'],
                            [/[;,.]/, 'delimiter'],
                            [/"([^"\\]|\\.)*$/, 'string.invalid'],
                            [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
                            [/'[^\\']'/, 'string'],
                        ],
                        string: [
                            [/[^\\"]+/, 'string'],
                            [/\\./, 'string.escape'],
                            [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
                        ],
                        whitespace: [
                            [/[ \t\r\n]+/, 'white'],
                            [/\/\*/, 'comment', '@comment'],
                            [/\/\/.*$/, 'comment'],
                        ],
                        comment: [
                            [/[^\/*]+/, 'comment'],
                            [/\*\//, 'comment', '@pop'],
                            [/[\/*]/, 'comment']
                        ],
                    }
                });

                // Solidity completion provider
                monaco.languages.registerCompletionItemProvider('sol', {
                    provideCompletionItems: (_model: any, _position: any) => {
                        const suggestions = [
                            // Common contract patterns
                            { label: 'pragma', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'pragma solidity ^0.8.20;' },
                            { label: 'contract', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'contract ${1:Name} {\n\t$0\n}' },
                            { label: 'function', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'function ${1:name}(${2:params}) ${3:public} ${4:returns (${5:type})} {\n\t$0\n}' },
                            { label: 'event', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'event ${1:Name}(${2:params});' },
                            { label: 'modifier', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'modifier ${1:name}() {\n\t_;\n}' },
                            { label: 'constructor', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'constructor(${1:params}) {\n\t$0\n}' },
                            { label: 'require', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'require(${1:condition}, "${2:error message}");' },
                            { label: 'emit', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'emit ${1:EventName}(${2:params});' },
                            { label: 'mapping', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'mapping(${1:address} => ${2:uint256}) ${3:public} ${4:name};' },
                            // OpenZeppelin imports
                            { label: 'import-erc20', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'import "@openzeppelin/contracts/token/ERC20/ERC20.sol";' },
                            { label: 'import-erc721', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'import "@openzeppelin/contracts/token/ERC721/ERC721.sol";' },
                            { label: 'import-ownable', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'import "@openzeppelin/contracts/access/Ownable.sol";' },
                        ];
                        return { suggestions: suggestions.map(s => ({ ...s, range: undefined as any })) };
                    }
                });
            }

            // Define custom dark theme
            monaco.editor.defineTheme('mantle-dark', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                    { token: 'keyword', foreground: 'a78bfa', fontStyle: 'bold' },
                    { token: 'type', foreground: '60a5fa' },
                    { token: 'identifier', foreground: 'e5e7eb' },
                    { token: 'number', foreground: 'f97316' },
                    { token: 'number.hex', foreground: 'f97316' },
                    { token: 'number.float', foreground: 'f97316' },
                    { token: 'string', foreground: '4ade80' },
                    { token: 'string.escape', foreground: 'fbbf24' },
                    { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
                    { token: 'operator', foreground: 'f472b6' },
                    { token: 'delimiter', foreground: '9ca3af' },
                ],
                colors: {
                    'editor.background': '#030712',
                    'editor.foreground': '#e5e7eb',
                    'editor.lineHighlightBackground': '#111827',
                    'editor.selectionBackground': '#1f2937',
                    'editorCursor.foreground': '#60a5fa',
                    'editorLineNumber.foreground': '#4b5563',
                    'editorLineNumber.activeForeground': '#9ca3af',
                    'editor.inactiveSelectionBackground': '#1f2937',
                    'editorIndentGuide.background': '#1f2937',
                    'editorIndentGuide.activeBackground': '#374151',
                    'editorWidget.background': '#111827',
                    'editorWidget.border': '#374151',
                    'editorSuggestWidget.background': '#111827',
                    'editorSuggestWidget.border': '#374151',
                    'editorSuggestWidget.selectedBackground': '#1f2937',
                    'scrollbar.shadow': '#00000000',
                    'scrollbarSlider.background': '#374151',
                    'scrollbarSlider.hoverBackground': '#4b5563',
                    'scrollbarSlider.activeBackground': '#6b7280',
                }
            });
        });
    }, []);

    const handleMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;

        // Set theme
        monaco.editor.setTheme('mantle-dark');

        // Configure editor
        editor.updateOptions({
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
            fontLigatures: true,
            minimap: { enabled: true, scale: 1 },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            renderLineHighlight: 'line',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            padding: { top: 16, bottom: 16 },
            folding: true,
            foldingHighlight: true,
            bracketPairColorization: { enabled: true },
            guides: {
                bracketPairs: true,
                indentation: true
            },
            tabSize: 4,
            insertSpaces: true,
            wordWrap: 'off',
            automaticLayout: true,
        });

        onMountProp?.(editor);
    };

    const handleChange = (value: string | undefined) => {
        onChange?.(value || '');
    };

    return (
        <Editor
            height={height}
            language={LANGUAGE_MAP[language] || language}
            value={value}
            onChange={handleChange}
            onMount={handleMount}
            theme="mantle-dark"
            loading={
                <div className="h-full flex items-center justify-center bg-gray-950">
                    <div className="text-sm text-gray-500 font-mono">Loading editor...</div>
                </div>
            }
            options={{
                readOnly,
            }}
        />
    );
}
