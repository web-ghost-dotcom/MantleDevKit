import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

export type AIProvider = "gemini" | "openai" | "claude";

export interface AIConfig {
    provider: AIProvider;
    apiKey: string;
    model?: string;
}

export interface GenerateContractResponse {
    code: string;
    explanation: string;
    name: string;
}

// UI Generation types
export interface UIGenerationPlan {
    appName: string;
    description: string;
    theme: {
        primary: string;
        style: string;
    };
    components: ComponentPlan[];
}

export interface ComponentPlan {
    name: string;
    description: string;
    type: 'layout' | 'feature' | 'ui';
}

export interface GeneratedComponent {
    name: string;
    code: string;
}

export interface UIGenerationProgress {
    step: 'planning' | 'generating' | 'assembling' | 'complete';
    currentComponent?: string;
    completedComponents: string[];
    totalComponents: number;
    plan?: UIGenerationPlan;
}

export class AIClient {
    private config: AIConfig;

    constructor(config: AIConfig) {
        this.config = config;
    }

    async generateContract(prompt: string): Promise<GenerateContractResponse> {
        const systemPrompt = `You are an expert Solidity developer for the Mantle Network. 
    Generate a robust, secure smart contract based on the user's request.
    Return ONLY a JSON object with the following structure:
    {
      "code": "The full Solidity code...",
      "explanation": "A brief explanation of what the contract does...",
      "name": "The name of the main contract"
    }
    Do not include markdown formatting like \`\`\`json. Just the raw JSON string.`;

        return this.generate(prompt, systemPrompt);
    }

    // =========================================================================
    // MULTI-STEP UI GENERATION
    // =========================================================================

    /**
     * Step 1: Create a plan for the UI based on contract ABI and user requirements
     */
    async planUI(abi: any[], contractAddress: string, userPrompt?: string): Promise<UIGenerationPlan> {
        const contractType = this.detectContractType(abi);
        const functions = abi.filter(x => x.type === 'function');
        const events = abi.filter(x => x.type === 'event');

        const systemPrompt = `You are a senior frontend architect planning a dApp UI.
Analyze the smart contract and create a detailed component plan.

RULES:
- Break the UI into 4-7 focused components
- Each component should be small and focused (under 150 lines when generated)
- Include: Layout/Header, main feature components, and shared UI components
- Consider the contract type and functions available

Return ONLY a JSON object:
{
  "appName": "Name for the dApp",
  "description": "One sentence describing the dApp",
  "theme": {
    "primary": "color name (blue, green, purple, orange, etc.)",
    "style": "minimal | modern | playful | corporate"
  },
  "components": [
    {
      "name": "ComponentName",
      "description": "What this component does and shows",
      "type": "layout | feature | ui"
    }
  ]
}

Component types:
- layout: Header, Footer, Layout wrapper
- feature: Main functional components (TokenBalance, StakeForm, NFTGallery, etc.)
- ui: Reusable UI pieces (Card, Button, Modal, etc.)`;

        const prompt = `Contract Type: ${contractType}
Contract Address: ${contractAddress}
Functions: ${functions.map(f => f.name).join(', ')}
Events: ${events.map(e => e.name).join(', ')}
${userPrompt ? `User Requirements: ${userPrompt}` : ''}

Create a component plan for this dApp.`;

        return this.generate(prompt, systemPrompt);
    }

    /**
     * Step 2: Generate a single component based on the plan
     */
    async generateComponent(
        componentPlan: ComponentPlan,
        fullPlan: UIGenerationPlan,
        abi: any[],
        contractAddress: string,
        previousComponents: GeneratedComponent[]
    ): Promise<GeneratedComponent> {
        const systemPrompt = `You are an expert React developer. Generate a single, focused component.

CRITICAL RULES:
1. Generate ONLY the component requested - nothing else
2. Keep it under 150 lines of code
3. Use plain JavaScript (NOT TypeScript) - NO type annotations, NO generics, NO interfaces
4. Use Tailwind CSS for styling
5. Make it work with the other components in the plan
6. Use consistent naming and styling based on the theme

JAVASCRIPT ONLY - DO NOT USE:
- Type annotations like : string, : number, : boolean
- Generic types like useState<string> - just use useState
- Interface or type declarations
- 'as' type assertions

AVAILABLE (already in scope, don't import):
- React: useState, useEffect, useMemo, useCallback
- wagmi: useAccount, useBalance, useReadContract, useWriteContract
- viem: formatEther, parseEther
- motion (from framer-motion)

THEME: ${fullPlan.theme.style} style with ${fullPlan.theme.primary} as primary color

CONTRACT_ABI and CONTRACT_ADDRESS are already defined globally.

${previousComponents.length > 0 ? `
ALREADY GENERATED COMPONENTS (you can reference these):
${previousComponents.map(c => `- ${c.name}`).join('\n')}
` : ''}

Return ONLY a JSON object:
{
  "name": "${componentPlan.name}",
  "code": "// Component code here - PLAIN JAVASCRIPT ONLY"
}`;

        const prompt = `Generate the "${componentPlan.name}" component.
Description: ${componentPlan.description}
Type: ${componentPlan.type}

App context: ${fullPlan.appName} - ${fullPlan.description}

Contract functions available: ${abi.filter(x => x.type === 'function').map(f => `${f.name}(${f.inputs?.map((i: any) => i.type).join(', ') || ''})`).join(', ')}`;

        return this.generate(prompt, systemPrompt);
    }

    /**
     * Step 3: Assemble all components into a final App file
     */
    async assembleApp(
        plan: UIGenerationPlan,
        components: GeneratedComponent[],
        abi: any[],
        contractAddress: string
    ): Promise<string> {
        const systemPrompt = `You are assembling a React dApp from pre-generated components.

Create a single App.jsx file (PLAIN JAVASCRIPT, NOT TYPESCRIPT) that:
1. Defines the CONTRACT_ABI and CONTRACT_ADDRESS constants at the top
2. Includes ALL the component code inline (since this is a single-file output)
3. Creates the main App component that uses all the other components
4. Exports the App as default

CRITICAL - JAVASCRIPT ONLY:
- NO TypeScript type annotations (: string, : number, etc.)
- NO generic types (useState<T>, useRef<T>, etc.) - just useState, useRef
- NO interface or type declarations
- NO 'as' type assertions
- Use plain JavaScript syntax only

RULES:
- Put all components in a single file
- Add necessary imports at the top (React, wagmi, viem, framer-motion)
- Make sure all components work together
- The final output should be a complete, runnable React component in PLAIN JAVASCRIPT

Return ONLY the raw JavaScript/React code. No JSON wrapper, no markdown.`;

        const prompt = `Assemble these components into a complete App.tsx:

App: ${plan.appName}
Theme: ${plan.theme.style} with ${plan.theme.primary}

Components to include:
${components.map(c => `
--- ${c.name} ---
${c.code}
`).join('\n')}

Contract ABI: ${JSON.stringify(abi)}
Contract Address: ${contractAddress}

Create the final assembled App.tsx file.`;

        const result = await this.generateRaw(prompt, systemPrompt);
        // Clean up any markdown if present
        return result.replace(/```typescript/g, '').replace(/```tsx/g, '').replace(/```/g, '').trim();
    }

    /**
     * Full UI generation with progress callback
     */
    async generateUIWithProgress(
        abi: any[],
        contractAddress: string,
        userPrompt: string | undefined,
        onProgress: (progress: UIGenerationProgress) => void
    ): Promise<string> {
        const completedComponents: string[] = [];

        // Step 1: Planning
        onProgress({
            step: 'planning',
            completedComponents: [],
            totalComponents: 0
        });

        const plan = await this.planUI(abi, contractAddress, userPrompt);

        onProgress({
            step: 'planning',
            completedComponents: [],
            totalComponents: plan.components.length,
            plan
        });

        // Step 2: Generate each component
        const generatedComponents: GeneratedComponent[] = [];

        for (const componentPlan of plan.components) {
            onProgress({
                step: 'generating',
                currentComponent: componentPlan.name,
                completedComponents: [...completedComponents],
                totalComponents: plan.components.length,
                plan
            });

            const component = await this.generateComponent(
                componentPlan,
                plan,
                abi,
                contractAddress,
                generatedComponents
            );

            generatedComponents.push(component);
            completedComponents.push(component.name);

            onProgress({
                step: 'generating',
                currentComponent: componentPlan.name,
                completedComponents: [...completedComponents],
                totalComponents: plan.components.length,
                plan
            });
        }

        // Step 3: Assemble
        onProgress({
            step: 'assembling',
            completedComponents: [...completedComponents],
            totalComponents: plan.components.length,
            plan
        });

        const finalCode = await this.assembleApp(plan, generatedComponents, abi, contractAddress);

        onProgress({
            step: 'complete',
            completedComponents: [...completedComponents],
            totalComponents: plan.components.length,
            plan
        });

        return finalCode;
    }

    // Legacy single-shot method (kept for backwards compatibility)
    async generateUI(abi: any[], address: string, stylePrompt?: string): Promise<{ code: string }> {
        // Use the new multi-step approach but without progress callback
        const code = await this.generateUIWithProgress(abi, address, stylePrompt, () => { });
        return { code };
    }

    private detectContractType(abi: any[]): string {
        const functionNames = abi.filter(x => x.type === 'function').map(x => x.name?.toLowerCase() || '');

        if (functionNames.includes('balanceof') && functionNames.includes('transfer') && functionNames.includes('approve')) {
            if (functionNames.includes('tokenuri') || functionNames.includes('ownerof')) {
                return 'NFT (ERC-721)';
            }
            if (functionNames.includes('balanceofbatch') || functionNames.includes('safebatchtransferfrom')) {
                return 'Multi-Token (ERC-1155)';
            }
            return 'Token (ERC-20)';
        }
        if (functionNames.includes('stake') && functionNames.includes('withdraw')) {
            return 'Staking';
        }
        if (functionNames.includes('propose') && functionNames.includes('castvote')) {
            return 'Governance';
        }
        if (functionNames.includes('submittransaction') && functionNames.includes('confirmtransaction')) {
            return 'Multisig Wallet';
        }
        return 'Smart Contract';
    }

    // =========================================================================
    // CORE AI METHODS
    // =========================================================================

    private async generate(prompt: string, systemPrompt: string): Promise<any> {
        switch (this.config.provider) {
            case "gemini":
                return this.generateWithGemini(prompt, systemPrompt);
            case "openai":
                return this.generateWithOpenAI(prompt, systemPrompt);
            case "claude":
                return this.generateWithClaude(prompt, systemPrompt);
            default:
                throw new Error("Unsupported provider");
        }
    }

    private async generateRaw(prompt: string, systemPrompt: string): Promise<string> {
        switch (this.config.provider) {
            case "gemini": {
                const genAI = new GoogleGenerativeAI(this.config.apiKey);
                const model = genAI.getGenerativeModel({ model: this.config.model || "gemini-2.5-flash" });
                const result = await model.generateContent(`${systemPrompt}\n\nUser Request: ${prompt}`);
                return result.response.text();
            }
            case "openai": {
                const openai = new OpenAI({ apiKey: this.config.apiKey, dangerouslyAllowBrowser: true });
                const completion = await openai.chat.completions.create({
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: prompt }
                    ],
                    model: this.config.model || "gpt-4-turbo",
                });
                return completion.choices[0].message.content || "";
            }
            case "claude": {
                const anthropic = new Anthropic({ apiKey: this.config.apiKey });
                const message = await anthropic.messages.create({
                    model: this.config.model || "claude-3-opus-20240229",
                    max_tokens: 4000,
                    system: systemPrompt,
                    messages: [{ role: "user", content: prompt }]
                });
                return message.content[0].type === 'text' ? message.content[0].text : "";
            }
            default:
                throw new Error("Unsupported provider");
        }
    }

    private async generateWithGemini(prompt: string, systemPrompt: string): Promise<any> {
        const genAI = new GoogleGenerativeAI(this.config.apiKey);
        const model = genAI.getGenerativeModel({ model: this.config.model || "gemini-2.5-flash" });

        const result = await model.generateContent(`${systemPrompt}\n\nUser Request: ${prompt}`);
        const response = result.response;
        const text = response.text();

        return this.parseResponse(text);
    }

    private async generateWithOpenAI(prompt: string, systemPrompt: string): Promise<any> {
        const openai = new OpenAI({ apiKey: this.config.apiKey, dangerouslyAllowBrowser: true });
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ],
            model: this.config.model || "gpt-4-turbo",
        });

        const text = completion.choices[0].message.content || "{}";
        return this.parseResponse(text);
    }

    private async generateWithClaude(prompt: string, systemPrompt: string): Promise<any> {
        const anthropic = new Anthropic({ apiKey: this.config.apiKey });
        const message = await anthropic.messages.create({
            model: this.config.model || "claude-3-opus-20240229",
            max_tokens: 4000,
            system: systemPrompt,
            messages: [
                { role: "user", content: prompt }
            ]
        });

        const text = message.content[0].type === 'text' ? message.content[0].text : "{}";
        return this.parseResponse(text);
    }

    private parseResponse(text: string): any {
        try {
            // Clean up markdown code blocks if present
            const cleanText = text.replace(/```json/g, "").replace(/```typescript/g, "").replace(/```/g, "").trim();
            return JSON.parse(cleanText);
        } catch (e) {
            console.error("Failed to parse AI response", text);
            throw new Error("AI response was not valid JSON");
        }
    }
}
