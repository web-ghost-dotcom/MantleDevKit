'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  IconMantleLogo,
  IconCode,
  IconCompile,
  IconDeploy,
  IconBlocks,
  IconArrowRight,
  IconCube,
  IconBolt,
  IconLayers,
  IconNetwork,
  IconWindow,
  IconGraph,
  IconWallet,
  IconDownload
} from '@/components/icons';
import {
  IllustrationCoder,
  IllustrationAI,
  IllustrationContract,
  IllustrationDeploy,
  IllustrationBlockchain
} from '@/components/illustrations';
import { Button } from '@/components/ui/Button';

// ============================================================================
// MANTLE DEVKIT LANDING PAGE
// 3D perspective, blocky design, no gradients, sells the product
// ============================================================================

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-gray-800 bg-gray-950/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconMantleLogo size={28} className="text-white" />
            <span className="text-lg font-black tracking-tight">MANTLE DEVKIT</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
              FEATURES
            </a>
            <a href="#how-it-works" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
              HOW IT WORKS
            </a>
            <Link href="/docs" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
              DOCS
            </Link>
            <Link href="/studio">
              <Button size="sm">LAUNCH STUDIO</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Perspective */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">

        {/* 3D Grid Background */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          <div
            className="absolute inset-0 origin-center"
            style={{
              transform: 'rotateX(60deg) translateY(-20%)',
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Floating 3D Cubes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotateZ: [0, 5, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] left-[10%] w-16 h-16 border-2 border-gray-700"
            style={{ transform: 'perspective(500px) rotateX(15deg) rotateY(-15deg)' }}
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotateZ: [0, -3, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-[30%] right-[15%] w-24 h-24 border-2 border-gray-800"
            style={{ transform: 'perspective(500px) rotateX(10deg) rotateY(20deg)' }}
          />
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotateZ: [0, 2, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-[25%] left-[20%] w-12 h-12 border-2 border-gray-700 bg-gray-900"
            style={{ transform: 'perspective(500px) rotateX(-10deg) rotateY(10deg)' }}
          />
          <motion.div
            animate={{
              y: [0, 25, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-[30%] right-[25%] w-20 h-20 border-2 border-gray-800"
            style={{ transform: 'perspective(500px) rotateX(5deg) rotateY(-25deg)' }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
                DESCRIBE IT.
                <br />
                <span className="text-gray-500">DEPLOY IT.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-12 leading-relaxed">
                The AI-powered development kit that transforms your ideas into production-ready
                smart contracts on Mantle. No Solidity expertise required.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                <Link href="/studio">
                  <Button size="lg" className="min-w-[200px]">
                    START BUILDING
                    <IconArrowRight size={18} />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button size="lg" variant="outline" className="min-w-[200px]">
                    SEE HOW IT WORKS
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Right - Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <IllustrationCoder size={320} className="relative z-10" />
                {/* Decorative elements behind */}
                <div className="absolute -top-8 -right-8 w-24 h-24 border-2 border-gray-800 bg-gray-900/50" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-gray-700" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-600 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-gray-600" />
          </div>
        </motion.div>
      </section>

      {/* Visual Story Section */}
      <section className="py-32 border-t-2 border-gray-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">

          {/* Story Header */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              YOUR IDEA → LIVE DAPP
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Watch your concept transform into a production-ready application.
            </p>
          </div>

          {/* Story Timeline */}
          <div className="relative">

            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 -translate-x-1/2 hidden lg:block" />

            {/* Story 1: The Idea */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col justify-center lg:pr-16 lg:text-right">
                <div className="hidden lg:flex justify-end mb-6">
                  <IllustrationCoder size={120} className="opacity-60" />
                </div>
                <div className="inline-flex items-center gap-2 mb-4 lg:justify-end">
                  <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-700 font-mono font-bold text-sm">1</span>
                  <span className="text-xs font-bold tracking-widest text-gray-500">THE IDEA</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">You have a vision</h3>
                <p className="text-gray-500 leading-relaxed">
                  Maybe it's a token for your community. A membership NFT. A governance system.
                  You don't need to know Solidity. Just describe what you want.
                </p>
              </div>
              <div className="relative">
                <div className="p-6 bg-gray-900 border-2 border-gray-800">
                  <div className="text-xs font-bold text-gray-600 mb-3 tracking-widest">YOUR PROMPT</div>
                  <div className="font-mono text-sm text-gray-300 leading-relaxed">
                    <span className="text-blue-400">"</span>Create a token called MANTLEDEV with
                    1 million supply. Include burn function and a
                    2% tax on transfers that goes to a treasury wallet.<span className="text-blue-400">"</span>
                  </div>
                  <motion.div
                    className="mt-4 h-1 bg-gray-800"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Story 2: The Generation */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative order-2 lg:order-1">
                <div className="p-6 bg-gray-900 border-2 border-gray-800 overflow-hidden">
                  <div className="text-xs font-bold text-gray-600 mb-3 tracking-widest">GENERATED CONTRACT</div>
                  <div className="font-mono text-xs text-gray-400 leading-relaxed space-y-1">
                    <div><span className="text-purple-400">pragma</span> solidity ^0.8.20;</div>
                    <div className="text-gray-600">// SPDX-License-Identifier: MIT</div>
                    <div className="mt-2"><span className="text-purple-400">import</span> <span className="text-green-400">"@openzeppelin/..."</span>;</div>
                    <div className="mt-2"><span className="text-blue-400">contract</span> <span className="text-yellow-400">MANTLEDEV</span> {'{ ... }'}</div>
                    <motion.div
                      className="mt-3 space-y-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="pl-4"><span className="text-gray-500">uint256</span> totalSupply = <span className="text-orange-400">1_000_000</span>;</div>
                      <div className="pl-4"><span className="text-gray-500">uint256</span> taxRate = <span className="text-orange-400">2</span>;</div>
                      <div className="pl-4"><span className="text-blue-400">function</span> <span className="text-yellow-400">burn</span>() {'{ ... }'}</div>
                      <div className="pl-4"><span className="text-blue-400">function</span> <span className="text-yellow-400">transfer</span>() {'{ ... }'}</div>
                    </motion.div>
                  </div>
                </div>
                {/* Processing indicator */}
                <motion.div
                  className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <IconArrowRight size={24} className="text-gray-700" />
                </motion.div>
              </div>
              <div className="flex flex-col justify-center lg:pl-16 order-1 lg:order-2">
                <div className="hidden lg:block mb-6">
                  <IllustrationAI size={120} className="opacity-60" />
                </div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-700 font-mono font-bold text-sm">2</span>
                  <span className="text-xs font-bold tracking-widest text-gray-500">AI MAGIC</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">AI writes your contract</h3>
                <p className="text-gray-500 leading-relaxed">
                  Our AI understands your requirements and generates secure, gas-optimized
                  Solidity code using battle-tested OpenZeppelin contracts.
                </p>
              </div>
            </motion.div>

            {/* Story 3: The Compilation */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col justify-center lg:pr-16 lg:text-right">
                <div className="hidden lg:flex justify-end mb-6">
                  <IllustrationContract size={120} className="opacity-60" />
                </div>
                <div className="inline-flex items-center gap-2 mb-4 lg:justify-end">
                  <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-700 font-mono font-bold text-sm">3</span>
                  <span className="text-xs font-bold tracking-widest text-gray-500">COMPILATION</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Built in your browser</h3>
                <p className="text-gray-500 leading-relaxed">
                  No installs. No terminal. We compile everything directly in your browser,
                  resolving all dependencies automatically from OpenZeppelin.
                </p>
              </div>
              <div className="relative">
                <div className="p-6 bg-gray-900 border-2 border-gray-800">
                  <div className="text-xs font-bold text-gray-600 mb-4 tracking-widest">COMPILE STATUS</div>
                  <div className="space-y-3">
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="w-2 h-2 bg-green-400" />
                      <span className="text-xs text-gray-400">Resolving imports...</span>
                      <span className="text-xs text-green-400 ml-auto">OK</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="w-2 h-2 bg-green-400" />
                      <span className="text-xs text-gray-400">Compiling MANTLEDEV.sol...</span>
                      <span className="text-xs text-green-400 ml-auto">OK</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <span className="w-2 h-2 bg-green-400" />
                      <span className="text-xs text-gray-400">Generating ABI...</span>
                      <span className="text-xs text-green-400 ml-auto">OK</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                    >
                      <span className="w-2 h-2 bg-green-400" />
                      <span className="text-xs text-gray-400">Bytecode ready</span>
                      <span className="text-xs text-green-400 ml-auto">18.2 KB</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Story 4: Deployment */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative order-2 lg:order-1">
                <div className="p-6 bg-gray-900 border-2 border-gray-800">
                  <div className="text-xs font-bold text-gray-600 mb-4 tracking-widest">DEPLOYMENT</div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 border-2 border-gray-700 flex items-center justify-center">
                      <IconWallet size={20} className="text-gray-500" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Connected Wallet</div>
                      <div className="text-sm font-mono">0x8eD...88Fd</div>
                    </div>
                  </div>
                  <motion.div
                    className="p-3 bg-gray-950 border-2 border-green-800"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 bg-green-400" />
                      <span className="text-xs font-bold text-green-400">DEPLOYED</span>
                    </div>
                    <div className="text-xs font-mono text-gray-400 break-all">
                      0x742d35Cc6634C0532925a3b844Bc9e7595...
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="flex flex-col justify-center lg:pl-16 order-1 lg:order-2">
                <div className="hidden lg:block mb-6">
                  <IllustrationDeploy size={120} className="opacity-60" />
                </div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-700 font-mono font-bold text-sm">4</span>
                  <span className="text-xs font-bold tracking-widest text-gray-500">LIVE ON MANTLE</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">One click to production</h3>
                <p className="text-gray-500 leading-relaxed">
                  Connect your wallet and deploy. Your contract is now live on Mantle,
                  ready to power your dApp, token, or NFT collection.
                </p>
              </div>
            </motion.div>

            {/* Story 5: The Extras */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col justify-center lg:pr-16 lg:text-right">
                <div className="hidden lg:flex justify-end mb-6">
                  <IllustrationBlockchain size={120} className="opacity-60" />
                </div>
                <div className="inline-flex items-center gap-2 mb-4 lg:justify-end">
                  <span className="w-8 h-8 flex items-center justify-center border-2 border-gray-700 font-mono font-bold text-sm">5</span>
                  <span className="text-xs font-bold tracking-widest text-gray-500">BONUS</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">UI + Subgraph included</h3>
                <p className="text-gray-500 leading-relaxed">
                  We don't stop at the contract. Get a generated React UI to interact with your
                  contract, plus a complete subgraph for indexing and querying your on-chain data.
                </p>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    className="p-4 bg-gray-900 border-2 border-gray-800"
                    whileHover={{ borderColor: '#4b5563' }}
                  >
                    <IconWindow size={24} className="mb-3 text-blue-400" />
                    <div className="text-xs font-bold tracking-wider mb-1">REACT UI</div>
                    <div className="text-xs text-gray-500">Auto-generated frontend</div>
                  </motion.div>
                  <motion.div
                    className="p-4 bg-gray-900 border-2 border-gray-800"
                    whileHover={{ borderColor: '#4b5563' }}
                  >
                    <IconGraph size={24} className="mb-3 text-purple-400" />
                    <div className="text-xs font-bold tracking-wider mb-1">SUBGRAPH</div>
                    <div className="text-xs text-gray-500">Indexing ready</div>
                  </motion.div>
                  <motion.div
                    className="p-4 bg-gray-900 border-2 border-gray-800"
                    whileHover={{ borderColor: '#4b5563' }}
                  >
                    <IconDownload size={24} className="mb-3 text-green-400" />
                    <div className="text-xs font-bold tracking-wider mb-1">EXPORT</div>
                    <div className="text-xs text-gray-500">Download all files</div>
                  </motion.div>
                  <motion.div
                    className="p-4 bg-gray-900 border-2 border-gray-800"
                    whileHover={{ borderColor: '#4b5563' }}
                  >
                    <IconLayers size={24} className="mb-3 text-orange-400" />
                    <div className="text-xs font-bold tracking-wider mb-1">INTERACT</div>
                    <div className="text-xs text-gray-500">Read/write directly</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 border-t-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              EVERYTHING YOU NEED
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A complete toolkit for building, deploying, and managing smart contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {[
              {
                icon: IconBolt,
                title: 'AI GENERATION',
                desc: 'Describe your contract in plain English. Our AI writes production-ready Solidity.',
              },
              {
                icon: IconCompile,
                title: 'BROWSER COMPILE',
                desc: 'Full Solidity compilation in your browser. No local tooling required.',
              },
              {
                icon: IconNetwork,
                title: 'ONE-CLICK DEPLOY',
                desc: 'Deploy directly to Mantle mainnet or testnet with your connected wallet.',
              },
              {
                icon: IconWindow,
                title: 'AUTO UI GENERATION',
                desc: 'AI generates a complete React frontend to interact with your deployed contract.',
              },
              {
                icon: IconGraph,
                title: 'AUTO SUBGRAPH',
                desc: 'Generate indexing infrastructure automatically from your contract ABI.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="group p-8 bg-gray-900 border-2 border-gray-800 transition-colors hover:border-gray-600"
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                whileHover={{ y: -4 }}
              >
                <feature.icon
                  size={32}
                  className={`mb-6 transition-colors ${hoveredFeature === i ? 'text-white' : 'text-gray-600'}`}
                />
                <h3 className="text-sm font-bold tracking-wider mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 border-t-2 border-gray-800 bg-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              FOUR STEPS TO PRODUCTION
            </h2>
            <p className="text-gray-500 text-lg">
              From idea to deployed contract in minutes.
            </p>
          </div>

          <div className="space-y-1">
            {[
              {
                step: 1,
                icon: IconCode,
                title: 'DESCRIBE',
                desc: 'Tell us what you want to build. An ERC-20 token, an NFT collection, a DAO governance system.',
              },
              {
                step: 2,
                icon: IconBlocks,
                title: 'GENERATE',
                desc: 'Our AI analyzes your requirements and generates secure, optimized Solidity code.',
              },
              {
                step: 3,
                icon: IconCompile,
                title: 'COMPILE',
                desc: 'Compile your contract directly in the browser. We resolve all dependencies automatically.',
              },
              {
                step: 4,
                icon: IconDeploy,
                title: 'DEPLOY',
                desc: 'Connect your wallet and deploy to Mantle network with a single click.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-6 p-6 bg-gray-950 border-2 border-gray-800"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border-2 border-gray-700 font-mono font-bold text-lg">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon size={20} className="text-gray-500" />
                    <h3 className="text-sm font-bold tracking-wider">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t-2 border-gray-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <IconCube size={48} className="mx-auto mb-8 text-gray-600" />
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
            READY TO BUILD?
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-lg mx-auto">
            Join developers shipping faster on Mantle. No credit card, no setup, no Solidity required.
          </p>
          <Link href="/studio">
            <Button size="lg" className="min-w-[250px]">
              LAUNCH STUDIO
              <IconArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconMantleLogo size={20} className="text-gray-600" />
            <span className="text-xs font-bold text-gray-600 tracking-wider">MANTLE DEVKIT</span>
          </div>
          <div className="text-xs text-gray-600">
            BUILT FOR THE MANTLE ECOSYSTEM
          </div>
        </div>
      </footer>
    </div>
  );
}
