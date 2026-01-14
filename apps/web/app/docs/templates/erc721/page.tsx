import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

// ============================================================================
// DOCUMENTATION - ERC-721 NFT TEMPLATE
// ============================================================================

export default function ERC721Page() {
    return (
        <article>
            <header className="mb-12">
                <div className="text-xs font-bold text-gray-500 tracking-widest mb-2">
                    TEMPLATES
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-4">
                    ERC-721 NFT
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    Non-fungible token standard for unique digital assets.
                </p>
            </header>

            {/* Overview */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">OVERVIEW</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    ERC-721 defines a standard for non-fungible tokens where each token 
                    is unique. Common use cases include digital art, collectibles, 
                    gaming items, and proof of ownership.
                </p>
            </section>

            {/* Features */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">TEMPLATE FEATURES</h2>
                <div className="space-y-2">
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Auto-incrementing IDs</h3>
                            <p className="text-sm text-gray-500">Token IDs increase automatically</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">URI Storage</h3>
                            <p className="text-sm text-gray-500">Each token can have unique metadata</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Burnable</h3>
                            <p className="text-sm text-gray-500">Owners can destroy their NFTs</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-900 border-2 border-gray-800 flex items-start gap-4">
                        <span className="w-2 h-2 bg-green-400 mt-2" />
                        <div>
                            <h3 className="font-bold mb-1">Ownable</h3>
                            <p className="text-sm text-gray-500">Admin controls for minting</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Source Code */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">SOURCE CODE</h2>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        NFT.sol
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) Ownable(msg.sender) {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Required overrides
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
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
                            <td className="p-3 font-mono text-orange-400">safeMint(to, uri)</td>
                            <td className="p-3 text-gray-400">Mint new NFT with metadata URI</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-blue-400">tokenURI(tokenId)</td>
                            <td className="p-3 text-gray-400">Get metadata URI for token</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-blue-400">ownerOf(tokenId)</td>
                            <td className="p-3 text-gray-400">Get owner of a token</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-orange-400">transferFrom(from, to, tokenId)</td>
                            <td className="p-3 text-gray-400">Transfer NFT ownership</td>
                        </tr>
                        <tr className="border-t border-gray-800">
                            <td className="p-3 font-mono text-orange-400">burn(tokenId)</td>
                            <td className="p-3 text-gray-400">Destroy an NFT</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Metadata */}
            <section className="mb-12">
                <h2 className="text-lg font-bold tracking-wider mb-4">METADATA FORMAT</h2>
                <p className="text-gray-400 mb-4">
                    The token URI should point to a JSON file following this format:
                </p>
                <div className="bg-gray-900 border-2 border-gray-800 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-500 tracking-widest">
                        metadata.json
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`{
  "name": "My NFT #1",
  "description": "A unique digital collectible",
  "image": "ipfs://QmHash...",
  "attributes": [
    { "trait_type": "Rarity", "value": "Legendary" },
    { "trait_type": "Power", "value": 100 }
  ]
}`}
                    </pre>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-xs font-bold text-gray-500 tracking-widest mb-4">
                    NEXT STEPS
                </h2>
                <div className="flex flex-col gap-2">
                    <Link
                        href="/docs/templates/erc1155"
                        className="p-4 bg-gray-900 border-2 border-gray-800 hover:border-gray-600 transition-colors flex items-center justify-between"
                    >
                        <span className="font-bold">ERC-1155 Multi-Token</span>
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
