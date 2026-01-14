'use client';

import * as React from 'react';
import {
    RainbowKitProvider,
    getDefaultWallets,
    getDefaultConfig,
    darkTheme,
} from '@rainbow-me/rainbowkit';
import {
    trustWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { mantle } from 'wagmi/chains';
import { defineChain } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import { SettingsProvider } from './settings-context';

// Define Mantle Sepolia with correct chain ID (5003)
const mantleSepolia = defineChain({
    id: 5003,
    name: 'Mantle Sepolia',
    nativeCurrency: {
        decimals: 18,
        name: 'MNT',
        symbol: 'MNT',
    },
    rpcUrls: {
        default: {
            http: [process.env.NEXT_PUBLIC_MANTLE_SEPOLIA_RPC_URL || 'https://rpc.sepolia.mantle.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Mantle Sepolia Explorer',
            url: 'https://explorer.sepolia.mantle.xyz',
            apiUrl: 'https://explorer.sepolia.mantle.xyz/api',
        },
    },
    testnet: true,
});

// Custom Mantle mainnet with configurable RPC
const mantleMainnet = defineChain({
    ...mantle,
    rpcUrls: {
        default: {
            http: [process.env.NEXT_PUBLIC_MANTLE_RPC_URL || 'https://rpc.mantle.xyz'],
        },
    },
});

const { wallets } = getDefaultWallets();

// Get WalletConnect project ID from environment
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

// Warn in development if project ID is missing
if (typeof window !== 'undefined' && !projectId) {
    console.warn(
        '[MantleDevKit] WalletConnect Project ID not set. Get one at https://cloud.walletconnect.com and add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID to your .env.local'
    );
}

const config = getDefaultConfig({
    appName: 'Mantle DevKit',
    projectId: projectId || 'development-mode',
    wallets: [
        ...wallets,
        {
            groupName: 'Other',
            wallets: [trustWallet, ledgerWallet],
        },
    ],
    chains: [
        mantleMainnet,
        mantleSepolia,
    ],
    transports: {
        [mantleMainnet.id]: http(process.env.NEXT_PUBLIC_MANTLE_RPC_URL || 'https://rpc.mantle.xyz'),
        [mantleSepolia.id]: http(process.env.NEXT_PUBLIC_MANTLE_SEPOLIA_RPC_URL || 'https://rpc.sepolia.mantle.xyz'),
    },
    ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={darkTheme({
                        accentColor: '#fff',
                        accentColorForeground: '#030712',
                        borderRadius: 'none',
                        fontStack: 'system',
                    })}
                    initialChain={mantleSepolia}
                >
                    <SettingsProvider>
                        {children}
                    </SettingsProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

// Export chains for use elsewhere
export { mantleMainnet, mantleSepolia };
