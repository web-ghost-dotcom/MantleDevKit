'use client';

import { useState } from 'react';
import { useChainId, useSwitchChain } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown, IconCheck, IconSpinner, IconNetwork } from '@/components/icons';

// ============================================================================
// NETWORK SWITCHER COMPONENT
// Allows users to switch between Mantle networks
// ============================================================================

const NETWORKS = [
    { id: 5000, name: 'Mantle', symbol: 'MNT', isTestnet: false },
    { id: 5003, name: 'Mantle Sepolia', symbol: 'MNT', isTestnet: true },
];

export function NetworkSwitcher() {
    const chainId = useChainId();
    const { switchChain, isPending } = useSwitchChain();
    const [isOpen, setIsOpen] = useState(false);

    const currentNetwork = NETWORKS.find(n => n.id === chainId) || NETWORKS[1];

    const handleSwitch = (networkId: number) => {
        if (networkId !== chainId) {
            switchChain({ chainId: networkId });
        }
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border-2 border-gray-700 hover:border-gray-600 transition-colors"
            >
                <span className={`w-2 h-2 ${currentNetwork.isTestnet ? 'bg-yellow-400' : 'bg-green-400'}`} />
                <span className="text-xs font-bold tracking-wider">{currentNetwork.name}</span>
                {isPending ? (
                    <IconSpinner size={12} />
                ) : (
                    <IconChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="absolute top-full right-0 mt-1 z-50 min-w-[180px] bg-gray-900 border-2 border-gray-700"
                        >
                            <div className="p-2 border-b border-gray-800">
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                    Switch Network
                                </div>
                            </div>
                            <div className="py-1">
                                {NETWORKS.map((network) => (
                                    <button
                                        key={network.id}
                                        onClick={() => handleSwitch(network.id)}
                                        className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-800 transition-colors ${
                                            network.id === chainId ? 'bg-gray-800' : ''
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 ${network.isTestnet ? 'bg-yellow-400' : 'bg-green-400'}`} />
                                            <span className="text-xs font-bold">{network.name}</span>
                                            {network.isTestnet && (
                                                <span className="text-[9px] text-yellow-500 uppercase">Testnet</span>
                                            )}
                                        </div>
                                        {network.id === chainId && (
                                            <IconCheck size={12} className="text-green-400" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="p-2 border-t border-gray-800">
                                <div className="flex items-center gap-2 text-[10px] text-gray-600">
                                    <IconNetwork size={10} />
                                    <span>Chain ID: {chainId}</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
