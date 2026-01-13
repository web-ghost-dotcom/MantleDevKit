// ============================================================================
// CONTRACT VERIFICATION
// Verifies contracts on Mantle Explorer (Blockscout)
// ============================================================================

interface VerificationParams {
    contractAddress: string;
    sourceCode: string;
    contractName: string;
    compilerVersion: string;
    optimizationUsed: boolean;
    runs?: number;
    constructorArguments?: string;
    evmVersion?: string;
}

interface VerificationResult {
    success: boolean;
    message: string;
    guid?: string;
    explorerUrl?: string;
}

const EXPLORER_URLS = {
    5000: {
        api: 'https://explorer.mantle.xyz/api',
        browser: 'https://explorer.mantle.xyz',
    },
    5003: {
        api: 'https://explorer.sepolia.mantle.xyz/api',
        browser: 'https://explorer.sepolia.mantle.xyz',
    },
};

/**
 * Verify a contract on Mantle Explorer
 */
export async function verifyContract(
    chainId: number,
    params: VerificationParams,
    apiKey?: string
): Promise<VerificationResult> {
    const explorer = EXPLORER_URLS[chainId as keyof typeof EXPLORER_URLS];
    
    if (!explorer) {
        return {
            success: false,
            message: `Unsupported chain ID: ${chainId}. Only Mantle (5000) and Mantle Sepolia (5003) are supported.`,
        };
    }

    try {
        // Prepare form data for verification
        const formData = new URLSearchParams();
        formData.append('module', 'contract');
        formData.append('action', 'verifysourcecode');
        formData.append('contractaddress', params.contractAddress);
        formData.append('sourceCode', params.sourceCode);
        formData.append('codeformat', 'solidity-single-file');
        formData.append('contractname', params.contractName);
        formData.append('compilerversion', params.compilerVersion);
        formData.append('optimizationUsed', params.optimizationUsed ? '1' : '0');
        
        if (params.runs) {
            formData.append('runs', params.runs.toString());
        }
        
        if (params.constructorArguments) {
            formData.append('constructorArguements', params.constructorArguments);
        }
        
        if (params.evmVersion) {
            formData.append('evmversion', params.evmVersion);
        }

        if (apiKey) {
            formData.append('apikey', apiKey);
        }

        // Submit verification request
        const response = await fetch(explorer.api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });

        const result = await response.json();

        if (result.status === '1' || result.message === 'OK') {
            return {
                success: true,
                message: 'Verification submitted successfully',
                guid: result.result,
                explorerUrl: `${explorer.browser}/address/${params.contractAddress}#code`,
            };
        } else {
            return {
                success: false,
                message: result.result || result.message || 'Verification failed',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Failed to submit verification',
        };
    }
}

/**
 * Check verification status
 */
export async function checkVerificationStatus(
    chainId: number,
    guid: string,
    apiKey?: string
): Promise<VerificationResult> {
    const explorer = EXPLORER_URLS[chainId as keyof typeof EXPLORER_URLS];
    
    if (!explorer) {
        return {
            success: false,
            message: `Unsupported chain ID: ${chainId}`,
        };
    }

    try {
        const params = new URLSearchParams({
            module: 'contract',
            action: 'checkverifystatus',
            guid: guid,
        });

        if (apiKey) {
            params.append('apikey', apiKey);
        }

        const response = await fetch(`${explorer.api}?${params.toString()}`);
        const result = await response.json();

        if (result.status === '1') {
            return {
                success: true,
                message: 'Contract verified successfully',
                explorerUrl: `${explorer.browser}/address/${guid}#code`,
            };
        } else if (result.result === 'Pending in queue') {
            return {
                success: false,
                message: 'Verification pending...',
                guid,
            };
        } else {
            return {
                success: false,
                message: result.result || 'Verification failed',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Failed to check verification status',
        };
    }
}

/**
 * Get explorer URL for a contract
 */
export function getExplorerUrl(chainId: number, address: string): string | null {
    const explorer = EXPLORER_URLS[chainId as keyof typeof EXPLORER_URLS];
    if (!explorer) return null;
    return `${explorer.browser}/address/${address}`;
}

/**
 * Get explorer transaction URL
 */
export function getExplorerTxUrl(chainId: number, txHash: string): string | null {
    const explorer = EXPLORER_URLS[chainId as keyof typeof EXPLORER_URLS];
    if (!explorer) return null;
    return `${explorer.browser}/tx/${txHash}`;
}
