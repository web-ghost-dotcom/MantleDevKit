import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - ERC-20 TOKEN TEMPLATE
// ============================================================================

export default function ERC20Page() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    TEMPLATES
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    ERC-20 TOKEN
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Fungible token standard for creating currencies and utility tokens.
                </p>
            </header>

            {/* Overview */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">OVERVIEW</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    ERC-20 is the most widely adopted token standard on Ethereum and EVM-compatible 
                    chains. It defines a common interface for fungible tokens, enabling interoperability 
                    with wallets, exchanges, and DeFi protocols.
                </p>
            </section>

            {/* Features */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">TEMPLATE FEATURES</h2>
                <div className="space-y-2">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Mintable</h3>
                            <p className="text-sm text-gray-500">Owner can create new tokens</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Burnable</h3>
                            <p className="text-sm text-gray-500">Holders can destroy their tokens</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Pausable</h3>
                            <p className="text-sm text-gray-500">Owner can pause transfers in emergencies</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Ownable</h3>
                            <p className="text-sm text-gray-500">Single owner with administrative rights</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Source Code */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">SOURCE CODE</h2>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        Token.sol
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}`}
                    </pre>
                </div>
            </section>

            {/* Functions */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">KEY FUNCTIONS</h2>
                <table className="w-full border-2 border-gray-800 text-sm">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="text-left p-3 font-bold text-gray-500">Function</th>
                            <th className="text-left p-3 font-bold text-gray-500">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-blue-400">transfer(to, amount)</td>
                            <td className="p-3 text-gray-400">Send tokens to an address</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-blue-400">approve(spender, amount)</td>
                            <td className="p-3 text-gray-400">Allow spender to use tokens</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-blue-400">transferFrom(from, to, amount)</td>
                            <td className="p-3 text-gray-400">Transfer from allowed account</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-orange-400">mint(to, amount)</td>
                            <td className="p-3 text-gray-400">Create new tokens (owner only)</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-orange-400">burn(amount)</td>
                            <td className="p-3 text-gray-400">Destroy your tokens</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-xs font-bold text-gray-500 tracking-widest mb-4">
                    NEXT STEPS
                </h2>
                <div className="flex flex-col gap-2">
                    <Link
                        href="/docs/templates/erc721"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">ERC-721 NFT Template</span>
                        <IconArrowRight size={16} />
                    </Link>
                    <Link
                        href="/studio"
                        className="p-4 bg-white text-gray-950 hover:bg-gray-200 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">Try in Studio</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </article>
    );
}
