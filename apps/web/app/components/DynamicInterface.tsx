'use client';

import { useState } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { IconRefresh, IconPlay, IconCheck } from '@/components/icons';

// ============================================================================
// DYNAMIC CONTRACT INTERFACE
// Blocky design, no gradients, clear read/write distinction
// ============================================================================

interface FunctionProps {
    abi: any[];
    address: string;
    func: any;
}

function ContractFunction({ abi, address, func }: FunctionProps) {
    const isRead = func.stateMutability === 'view' || func.stateMutability === 'pure';
    const [inputs, setInputs] = useState<Record<string, string>>({});

    const handleInput = (name: string, value: string) => {
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    if (isRead) {
        return <ReadFunction abi={abi} address={address} func={func} inputs={inputs} onInput={handleInput} />;
    } else {
        return <WriteFunction abi={abi} address={address} func={func} inputs={inputs} onInput={handleInput} />;
    }
}

function ReadFunction({ abi, address, func, inputs, onInput }: any) {
    const args = func.inputs.map((i: any) => inputs[i.name] || '');
    const enabled = func.inputs.length === 0 || func.inputs.every((i: any) => inputs[i.name]);

    const { data, isError, isLoading, refetch } = useReadContract({
        address: address as `0x${string}`,
        abi,
        functionName: func.name,
        args: func.inputs.length > 0 ? args : undefined,
        query: { enabled }
    });

    return (
        <div className="border-2 border-gray-700 bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500" />
                    <span className="text-sm font-bold font-mono uppercase">{func.name}</span>
                </div>
                <Badge label="READ" variant="info" size="sm" showDot={false} />
            </div>

            {func.inputs.length > 0 && (
                <div className="space-y-3 mb-4">
                    {func.inputs.map((input: any, idx: number) => (
                        <Input
                            key={input.name || idx}
                            placeholder={input.type}
                            label={input.name || `arg${idx}`}
                            onChange={e => onInput(input.name, e.target.value)}
                        />
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between gap-4 pt-4 border-t-2 border-gray-800">
                <Button size="sm" variant="ghost" onClick={() => refetch()}>
                    <IconRefresh size={14} />
                    QUERY
                </Button>
                <div className="flex-1 text-right">
                    <div className="inline-block px-3 py-1.5 bg-gray-950 border-2 border-gray-700 font-mono text-sm">
                        {isLoading ? (
                            <span className="text-gray-500">Loading...</span>
                        ) : isError ? (
                            <span className="text-red-400">Error</span>
                        ) : (
                            <span className="text-white">{data?.toString() || '-'}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function WriteFunction({ abi, address, func, inputs, onInput }: any) {
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

    const handleWrite = () => {
        const args = func.inputs.map((i: any) => inputs[i.name]);
        writeContract({
            address: address as `0x${string}`,
            abi,
            functionName: func.name,
            args
        });
    };

    return (
        <div className="border-2 border-gray-700 bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-orange-500" />
                    <span className="text-sm font-bold font-mono uppercase">{func.name}</span>
                </div>
                <Badge label="WRITE" variant="warning" size="sm" showDot={false} />
            </div>

            {func.inputs.length > 0 && (
                <div className="space-y-3 mb-4">
                    {func.inputs.map((input: any, idx: number) => (
                        <Input
                            key={input.name || idx}
                            placeholder={input.type}
                            label={input.name || `arg${idx}`}
                            onChange={e => onInput(input.name, e.target.value)}
                        />
                    ))}
                </div>
            )}

            <div className="pt-4 border-t-2 border-gray-800">
                <Button
                    onClick={handleWrite}
                    disabled={isPending || isConfirming}
                    isLoading={isPending || isConfirming}
                    className="w-full"
                >
                    {isSuccess ? (
                        <>
                            <IconCheck size={16} />
                            CONFIRMED
                        </>
                    ) : (
                        <>
                            <IconPlay size={16} />
                            EXECUTE
                        </>
                    )}
                </Button>

                {isSuccess && hash && (
                    <div className="mt-3 p-2 bg-gray-950 border-2 border-green-800">
                        <div className="text-xs text-gray-500 mb-1">TX HASH</div>
                        <div className="text-xs font-mono text-green-400 break-all">{hash}</div>
                    </div>
                )}

                {error && (
                    <div className="mt-3 p-2 bg-gray-950 border-2 border-red-800">
                        <div className="text-xs text-red-400 font-mono break-all">{error.message}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function DynamicInterface({ abi, address }: { abi: any[]; address: string }) {
    const functions = abi.filter(x => x.type === 'function');
    const reads = functions.filter(x => x.stateMutability === 'view' || x.stateMutability === 'pure');
    const writes = functions.filter(x => x.stateMutability !== 'view' && x.stateMutability !== 'pure');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    READ FUNCTIONS ({reads.length})
                </div>
                {reads.length === 0 ? (
                    <div className="text-sm text-gray-600">No read functions</div>
                ) : (
                    reads.map((f, i) => <ContractFunction key={i} abi={abi} address={address} func={f} />)
                )}
            </div>

            <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    WRITE FUNCTIONS ({writes.length})
                </div>
                {writes.length === 0 ? (
                    <div className="text-sm text-gray-600">No write functions</div>
                ) : (
                    writes.map((f, i) => <ContractFunction key={i} abi={abi} address={address} func={f} />)
                )}
            </div>
        </div>
    );
}
