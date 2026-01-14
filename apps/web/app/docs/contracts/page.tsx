import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - SMART CONTRACTS
// ============================================================================

export default function ContractsPage() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    CORE CONCEPTS
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    SMART CONTRACTS
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Understanding smart contract development in MantleDevKit.
                </p>
            </header>

            {/* Overview */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">OVERVIEW</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    Smart contracts in MantleDevKit are written in Solidity and compiled 
                    directly in your browser. The compiler automatically resolves dependencies 
                    from OpenZeppelin Contracts v5.0.0.
                </p>
                <div className="p-4 bg-gray-900 border-l-4 border-blue-600">
                    <p className="text-sm text-gray-400">
                        MantleDevKit uses Solidity 0.8.20 with the latest OpenZeppelin 
                        security standards built in.
                    </p>
                </div>
            </section>

            {/* Contract Structure */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">CONTRACT STRUCTURE</h2>
                <p className="text-gray-400 mb-4">
                    A typical contract follows this structure:
                </p>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        Contract.sol
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}`}
                    </pre>
                </div>
            </section>

            {/* OpenZeppelin Imports */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">OPENZEPPELIN IMPORTS</h2>
                <p className="text-gray-400 mb-4">
                    The compiler automatically resolves OpenZeppelin imports. Common patterns:
                </p>
                <div className="space-y-2">
                    <div className="p-4 bg-gray-900 border border-gray-800">
                        <code className="text-sm font-mono text-blue-400">
                            @openzeppelin/contracts/token/ERC20/ERC20.sol
                        </code>
                        <p className="text-sm text-gray-500 mt-2">Standard ERC-20 token implementation</p>
                    </div>
                    <div className="p-4 bg-gray-900 border border-gray-800">
                        <code className="text-sm font-mono text-blue-400">
                            @openzeppelin/contracts/token/ERC721/ERC721.sol
                        </code>
                        <p className="text-sm text-gray-500 mt-2">Standard ERC-721 NFT implementation</p>
                    </div>
                    <div className="p-4 bg-gray-900 border border-gray-800">
                        <code className="text-sm font-mono text-blue-400">
                            @openzeppelin/contracts/access/Ownable.sol
                        </code>
                        <p className="text-sm text-gray-500 mt-2">Owner-based access control</p>
                    </div>
                    <div className="p-4 bg-gray-900 border border-gray-800">
                        <code className="text-sm font-mono text-blue-400">
                            @openzeppelin/contracts/utils/ReentrancyGuard.sol
                        </code>
                        <p className="text-sm text-gray-500 mt-2">Protection against reentrancy attacks</p>
                    </div>
                </div>
            </section>

            {/* Constructor Arguments */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">CONSTRUCTOR ARGUMENTS</h2>
                <p className="text-gray-400 mb-4">
                    When deploying a contract with constructor arguments, the Studio will 
                    automatically detect them from the ABI and present a form for input.
                </p>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        EXAMPLE
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`constructor(
    string memory name,    // Text input
    string memory symbol,  // Text input
    uint256 initialSupply  // Number input
) ERC20(name, symbol) {
    _mint(msg.sender, initialSupply);
}`}
                    </pre>
                </div>
                <div className="mt-4 p-4 bg-gray-900 border-l-4 border-yellow-600">
                    <p className="text-sm text-gray-400">
                        Supported types: address, uint256, int256, bool, string, bytes, 
                        and arrays of these types.
                    </p>
                </div>
            </section>

            {/* Best Practices */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">BEST PRACTICES</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Use OpenZeppelin Standards</h3>
                        <p className="text-sm text-gray-500">
                            OpenZeppelin contracts are battle-tested and audited. Always 
                            extend from them instead of writing your own implementations.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Add Access Control</h3>
                        <p className="text-sm text-gray-500">
                            Use Ownable or AccessControl to protect sensitive functions 
                            like mint, burn, and pause.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Guard Against Reentrancy</h3>
                        <p className="text-sm text-gray-500">
                            Use ReentrancyGuard for any function that makes external calls 
                            or transfers funds.
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800">
                        <h3 className="font-bold mb-2">Test on Testnet First</h3>
                        <p className="text-sm text-gray-500">
                            Always deploy to Mantle Sepolia and test thoroughly before 
                            deploying to mainnet.
                        </p>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-xs font-bold text-gray-500 tracking-widest mb-4">
                    NEXT STEPS
                </h2>
                <div className="flex flex-col gap-2">
                    <Link
                        href="/docs/compilation"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Compilation</span>
                        <IconArrowRight size={16} />
                    </Link>
                    <Link
                        href="/docs/deployment"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Deployment</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </article>
    );
}
