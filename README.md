# MantleDevKit

AI-Powered Smart Contract Development Kit for Mantle Network

MantleDevKit is a complete development environment that allows you to describe smart contracts in plain English and deploy them to Mantle Network in minutes. No Solidity expertise required.

---

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Local Development](#local-development)
5. [Configuration](#configuration)
6. [Deployment](#deployment)
7. [Project Structure](#project-structure)
8. [Contract Templates](#contract-templates)
9. [Keyboard Shortcuts](#keyboard-shortcuts)
10. [API Reference](#api-reference)
11. [Troubleshooting](#troubleshooting)

---

## Features

- AI Contract Generation - Describe your contract in plain English, get production-ready Solidity
- Browser Compilation - Compile contracts directly in your browser using solc
- One-Click Deploy - Deploy to Mantle mainnet or testnet with your connected wallet
- Auto UI Generation - Generate React UI components for contract interaction with live preview
- Auto Subgraph - Generate The Graph subgraph scaffolding automatically
- Export Project - Download complete Hardhat project with tests and deploy scripts
- Documentation - Built-in documentation at /docs

---

## Architecture

```
+------------------------------------------------------------------+
|                         USER INTERFACE                            |
|  +------------------+  +------------------+  +------------------+ |
|  |   Landing Page   |  |     Studio       |  |   Documentation  | |
|  |   (/)            |  |   (/studio)      |  |   (/docs)        | |
|  +------------------+  +------------------+  +------------------+ |
+------------------------------------------------------------------+
                                |
                                v
+------------------------------------------------------------------+
|                        STUDIO IDE                                 |
|  +------------+  +------------+  +------------+  +------------+  |
|  | AI Prompt  |  |   Monaco   |  |  Preview   |  |  Console   |  |
|  |   Panel    |  |   Editor   |  |   Panel    |  |   Panel    |  |
|  +------------+  +------------+  +------------+  +------------+  |
+------------------------------------------------------------------+
                                |
                                v
+------------------------------------------------------------------+
|                      CORE PACKAGES                                |
|  +------------------+  +------------------+  +------------------+ |
|  |   @mantle/ai     |  | @mantle/compiler |  | @mantle/storage | |
|  |                  |  |                  |  |                  | |
|  | - Gemini         |  | - solc v0.8.20   |  | - IndexedDB      | |
|  | - OpenAI         |  | - OpenZeppelin   |  | - localStorage   | |
|  | - Claude         |  | - Templates      |  | - Projects       | |
|  |                  |  | - Verification   |  | - Settings       | |
|  +------------------+  +------------------+  +------------------+ |
+------------------------------------------------------------------+
                                |
                                v
+------------------------------------------------------------------+
|                     BLOCKCHAIN LAYER                              |
|  +------------------+  +------------------+  +------------------+ |
|  |     wagmi        |  |      viem        |  |   RainbowKit    | |
|  +------------------+  +------------------+  +------------------+ |
|                                |                                  |
|                                v                                  |
|  +----------------------------------------------------------+   |
|  |                    Mantle Network                         |   |
|  |   +------------------+      +------------------+          |   |
|  |   | Mainnet (5000)   |      | Sepolia (5003)   |          |   |
|  |   +------------------+      +------------------+          |   |
|  +----------------------------------------------------------+   |
+------------------------------------------------------------------+
```

### Data Flow

```
User Input (Natural Language)
        |
        v
+------------------+
|    AI Client     |  --> Gemini/OpenAI/Claude API
+------------------+
        |
        v
+------------------+
| Solidity Code    |
+------------------+
        |
        v
+------------------+
| Solc Compiler    |  --> Web Worker (non-blocking)
| (Browser)        |  --> OpenZeppelin CDN (dependencies)
+------------------+
        |
        v
+------------------+
| Bytecode + ABI   |
+------------------+
        |
        v
+------------------+
| Deploy via wagmi |  --> User Wallet --> Mantle RPC
+------------------+
        |
        v
+------------------+
| Contract Address |
+------------------+
        |
        +---> Generate Subgraph Files
        +---> Generate React UI
        +---> Save to Local Storage
```

---

## Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm
- Git
- A web3 wallet (MetaMask, Rabby, etc.)
- WalletConnect Project ID (free at https://cloud.walletconnect.com)

Optional for AI features:
- Google AI API Key (Gemini) - https://aistudio.google.com/app/apikey
- OpenAI API Key - https://platform.openai.com/api-keys
- Anthropic API Key (Claude) - https://console.anthropic.com/settings/keys

---

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/MantleDevKit.git
cd MantleDevKit
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in `apps/web/`:

```bash
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/web/.env.local`:

```env
# Required: WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Optional: Custom RPC endpoints
NEXT_PUBLIC_MANTLE_RPC_URL=https://rpc.mantle.xyz
NEXT_PUBLIC_MANTLE_SEPOLIA_RPC_URL=https://rpc.sepolia.mantle.xyz
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at http://localhost:3000

### 5. Build for Production

```bash
npm run build
```

### 6. Run Production Build Locally

```bash
npm run start
```

---

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Yes | WalletConnect Cloud project ID for wallet connections |
| `NEXT_PUBLIC_MANTLE_RPC_URL` | No | Custom Mantle mainnet RPC URL |
| `NEXT_PUBLIC_MANTLE_SEPOLIA_RPC_URL` | No | Custom Mantle Sepolia RPC URL |

### AI Provider Configuration

AI API keys are configured in the application Settings (gear icon in Studio):

1. Open Studio (/studio)
2. Click the Settings icon in the header
3. Select your AI provider (Gemini, OpenAI, or Claude)
4. Enter your API key
5. Click Save

API keys are stored in browser localStorage and sent directly to the AI provider APIs.

---

## Deployment

### Option 1: Vercel (Recommended)

Vercel is the recommended deployment platform for Next.js applications.

#### Steps:

1. Push your code to GitHub:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. Go to https://vercel.com and sign in with GitHub

3. Click "New Project" and import your repository

4. Configure environment variables:
   - Add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` with your WalletConnect project ID

5. Click "Deploy"

#### Vercel Configuration

The repository includes a `vercel.json` file:

```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "outputDirectory": "apps/web/.next"
}
```

### Option 2: Netlify

1. Push your code to GitHub

2. Go to https://netlify.com and sign in

3. Click "New site from Git" and select your repository

4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `apps/web/.next`

5. Add environment variable:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

6. Click "Deploy site"

### Option 3: Self-Hosted (VPS/Cloud)

For deployment on your own server (AWS, DigitalOcean, etc.):

#### Requirements:
- Node.js 18+
- Process manager (PM2 recommended)
- Reverse proxy (nginx or Caddy)
- SSL certificate (Let's Encrypt)

#### Steps:

1. Clone and build:
```bash
git clone https://github.com/your-username/MantleDevKit.git
cd MantleDevKit
npm install
npm run build
```

2. Create environment file:
```bash
echo "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_id" > apps/web/.env.local
```

3. Install PM2:
```bash
npm install -g pm2
```

4. Create PM2 ecosystem file (`ecosystem.config.js`):
```javascript
module.exports = {
  apps: [{
    name: 'mantle-devkit',
    cwd: './apps/web',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

5. Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

6. Configure nginx (`/etc/nginx/sites-available/mantle-devkit`):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. Enable site and get SSL:
```bash
sudo ln -s /etc/nginx/sites-available/mantle-devkit /etc/nginx/sites-enabled/
sudo certbot --nginx -d your-domain.com
sudo systemctl restart nginx
```

### Option 4: Docker

Create a `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/ ./packages/
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
```

Build and run:
```bash
docker build -t mantle-devkit .
docker run -p 3000:3000 -e NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_id mantle-devkit
```

---

## Project Structure

```
MantleDevKit/
├── apps/
│   └── web/                      # Next.js web application
│       ├── app/                  # App router pages
│       │   ├── page.tsx          # Landing page
│       │   ├── studio/           # Studio IDE
│       │   │   └── page.tsx
│       │   ├── docs/             # Documentation pages
│       │   │   ├── page.tsx
│       │   │   ├── quickstart/
│       │   │   ├── contracts/
│       │   │   ├── templates/
│       │   │   └── ...
│       │   ├── layout.tsx        # Root layout
│       │   ├── providers.tsx     # Wagmi/RainbowKit providers
│       │   └── settings-context.tsx
│       ├── components/           # React components
│       │   ├── editor/
│       │   │   ├── CodeEditor.tsx
│       │   │   └── UIPreview.tsx
│       │   ├── ui/
│       │   │   ├── Button.tsx
│       │   │   ├── Card.tsx
│       │   │   └── Input.tsx
│       │   ├── icons/
│       │   ├── ErrorBoundary.tsx
│       │   ├── NetworkSwitcher.tsx
│       │   └── SettingsModal.tsx
│       ├── lib/
│       │   └── utils.ts
│       ├── public/
│       ├── .env.example
│       ├── next.config.ts
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   ├── ai/                       # AI generation package
│   │   ├── index.ts              # AIClient class
│   │   └── package.json
│   ├── compiler/                 # Solidity compiler package
│   │   ├── index.ts              # SolidityCompiler class
│   │   ├── templates.ts          # Contract templates
│   │   ├── subgraph.ts           # Subgraph generation
│   │   ├── verification.ts       # Contract verification
│   │   ├── workers/
│   │   │   └── solc.worker.js    # Web Worker for compilation
│   │   └── package.json
│   ├── storage/                  # Storage package
│   │   ├── index.ts              # StorageManager class
│   │   └── package.json
│   └── ui/                       # Shared UI components
│       ├── index.tsx
│       └── package.json
├── vercel.json                   # Vercel deployment config
├── turbo.json                    # Turborepo config
├── package.json                  # Root package.json
└── README.md
```

---

## Contract Templates

| Template | File | Description |
|----------|------|-------------|
| ERC-20 Token | Token.sol | Fungible token with mint, burn, pause |
| ERC-721 NFT | NFT.sol | Non-fungible token with URI storage |
| ERC-1155 | MultiToken.sol | Multi-token standard |
| Governance | Governor.sol | OpenZeppelin Governor with voting |
| Timelock | Timelock.sol | Time-delayed execution controller |
| Staking Pool | Staking.sol | Token staking with rewards |
| Multisig Wallet | Multisig.sol | Multi-signature wallet |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl/Cmd + S | Compile contract |
| Ctrl/Cmd + Shift + D | Deploy contract |
| Ctrl/Cmd + E | Export project |
| Escape | Close modals |

---

## API Reference

### @mantle/ai

```javascript
import { AIClient } from '@mantle/ai';

const client = new AIClient({
  provider: 'gemini',  // 'gemini' | 'openai' | 'claude'
  apiKey: 'your-api-key'
});

// Generate contract from natural language
const contract = await client.generateContract('Create an ERC-20 token called MyToken');
// Returns: { code: string, explanation: string, name: string }

// Generate UI with progress tracking
const code = await client.generateUIWithProgress(abi, address, prompt, (progress) => {
  console.log(progress.step, progress.completedComponents);
});
```

### @mantle/compiler

```javascript
import { SolidityCompiler, ERC20TokenTemplate } from '@mantle/compiler';

const compiler = new SolidityCompiler();
const result = await compiler.compile(sourceCode);
// Returns: { bytecode: string, abi: any[], contractName: string, errors?: any[] }

// Use templates
console.log(ERC20TokenTemplate);
```

### @mantle/storage

```javascript
import { StorageManager } from '@mantle/storage';

const storage = new StorageManager();

// Save project
await storage.saveProject({ name: 'MyToken', contractCode: '...', abi: [...] });

// Get all projects
const projects = await storage.getProjects();

// Delete project
await storage.deleteProject(projectId);

// Save/get settings
await storage.saveSettings({ aiProvider: 'gemini', geminiKey: '...' });
const settings = await storage.getSettings();
```

---

## Troubleshooting

### Build Errors

**Error: Cannot find module '@mantle/ai'**

Run `npm install` from the root directory to install all workspace dependencies.

**Error: WalletConnect initialization error**

Ensure `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set in your environment.

### Runtime Errors

**Wallet not connecting**

1. Check that you have a web3 wallet installed
2. Verify you're on a supported network (Mantle or Mantle Sepolia)
3. Check browser console for specific errors

**Compilation fails**

1. Ensure your Solidity code is valid
2. Check that imports use the correct OpenZeppelin paths
3. Review console for specific compilation errors

**AI generation fails**

1. Verify your API key is correct
2. Check that you have API credits/quota remaining
3. Try a different AI provider

### Deployment Issues

**Vercel build fails**

1. Check that all environment variables are set
2. Review build logs for specific errors
3. Ensure `vercel.json` is in the repository root

**Docker container won't start**

1. Verify environment variables are passed correctly
2. Check container logs: `docker logs <container-id>`
3. Ensure port 3000 is not already in use

---

## Supported Networks

| Network | Chain ID | RPC URL | Explorer |
|---------|----------|---------|----------|
| Mantle Mainnet | 5000 | https://rpc.mantle.xyz | https://explorer.mantle.xyz |
| Mantle Sepolia | 5003 | https://rpc.sepolia.mantle.xyz | https://explorer.sepolia.mantle.xyz |

---

## License

MIT License - see LICENSE file for details.

---

## Links

- Mantle Network: https://mantle.xyz
- Mantle Documentation: https://docs.mantle.xyz
- Mantle Explorer: https://explorer.mantle.xyz
- OpenZeppelin Contracts: https://docs.openzeppelin.com/contracts

---

Built for the Mantle ecosystem
