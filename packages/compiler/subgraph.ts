// ============================================================================
// SUBGRAPH GENERATOR
// Generates complete The Graph subgraph scaffolding from contract ABI
// ============================================================================

interface EventInput {
  name: string;
  type: string;
  indexed: boolean;
}

interface ContractEvent {
  name: string;
  inputs: EventInput[];
}

/**
 * Extract all events from an ABI
 */
function extractEvents(abi: any[]): ContractEvent[] {
  return abi
    .filter(item => item.type === 'event')
    .map(event => ({
      name: event.name,
      inputs: event.inputs.map((input: any) => ({
        name: input.name,
        type: input.type,
        indexed: input.indexed || false
      }))
    }));
}

/**
 * Convert Solidity type to GraphQL type
 */
function toGraphQLType(solidityType: string): string {
  if (solidityType.startsWith('uint') || solidityType.startsWith('int')) {
    return 'BigInt';
  }
  if (solidityType === 'address') return 'Bytes';
  if (solidityType === 'bool') return 'Boolean';
  if (solidityType === 'string') return 'String';
  if (solidityType.startsWith('bytes')) return 'Bytes';
  return 'String';
}

/**
 * Generate GraphQL schema from events
 */
function generateSchema(contractName: string, events: ContractEvent[]): string {
  let schema = '';

  // Generate entity for each event
  for (const event of events) {
    schema += `type ${event.name} @entity(immutable: true) {\n`;
    schema += `  id: Bytes!\n`;
    schema += `  blockNumber: BigInt!\n`;
    schema += `  blockTimestamp: BigInt!\n`;
    schema += `  transactionHash: Bytes!\n`;

    for (const input of event.inputs) {
      schema += `  ${input.name}: ${toGraphQLType(input.type)}!\n`;
    }

    schema += `}\n\n`;
  }

  // Add a general contract entity for tracking state
  schema += `type ${contractName}Contract @entity {\n`;
  schema += `  id: ID!\n`;
  schema += `  address: Bytes!\n`;
  schema += `  totalTransactions: BigInt!\n`;
  schema += `  createdAt: BigInt!\n`;
  schema += `  lastUpdated: BigInt!\n`;
  schema += `}\n`;

  return schema;
}

/**
 * Generate event signature for subgraph.yaml
 */
function generateEventSignature(event: ContractEvent): string {
  const params = event.inputs.map(input => {
    const indexedPrefix = input.indexed ? 'indexed ' : '';
    return `${indexedPrefix}${input.type}`;
  }).join(',');
  return `${event.name}(${params})`;
}

/**
 * Generate subgraph.yaml manifest
 */
function generateManifest(
  contractName: string,
  contractAddress: string,
  events: ContractEvent[],
  network: string = 'mantle-sepolia'
): string {
  const eventHandlers = events.map(event => `        - event: ${generateEventSignature(event)}
          handler: handle${event.name}`).join('\n');

  const entities = events.map(e => `        - ${e.name}`).join('\n');

  return `specVersion: 1.0.0
indexerHints:
  prune: auto
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: ${contractName}
    network: ${network}
    source:
      address: "${contractAddress}"
      abi: ${contractName}
      startBlock: 0
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
${entities}
        - ${contractName}Contract
      abis:
        - name: ${contractName}
          file: ./abis/${contractName}.json
      eventHandlers:
${eventHandlers}
      file: ./src/${contractName.toLowerCase()}.ts
`;
}

/**
 * Generate AssemblyScript event handlers
 */
function generateMappings(contractName: string, events: ContractEvent[]): string {
  const imports = events.map(e => e.name).join(',\n  ');
  const schemaImports = events.map(e => `${e.name} as ${e.name}Entity`).join(',\n  ');

  let code = `import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ${imports}
} from "../generated/${contractName}/${contractName}"
import {
  ${schemaImports},
  ${contractName}Contract
} from "../generated/schema"

`;

  // Generate handler for each event
  for (const event of events) {
    code += `export function handle${event.name}(event: ${event.name}): void {
  let entity = new ${event.name}Entity(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

`;
    for (const input of event.inputs) {
      code += `  entity.${input.name} = event.params.${input.name}\n`;
    }

    code += `
  entity.save()

  // Update contract stats
  let contract = ${contractName}Contract.load(event.address.toHexString())
  if (contract == null) {
    contract = new ${contractName}Contract(event.address.toHexString())
    contract.address = event.address
    contract.totalTransactions = BigInt.fromI32(0)
    contract.createdAt = event.block.timestamp
  }
  contract.totalTransactions = contract.totalTransactions.plus(BigInt.fromI32(1))
  contract.lastUpdated = event.block.timestamp
  contract.save()
}

`;
  }

  return code;
}

/**
 * Generate package.json for subgraph
 */
function generatePackageJson(contractName: string): string {
  return JSON.stringify({
    name: `${contractName.toLowerCase()}-subgraph`,
    version: "0.1.0",
    license: "MIT",
    scripts: {
      "codegen": "graph codegen",
      "build": "graph build",
      "deploy": `graph deploy --studio ${contractName.toLowerCase()}`,
      "create-local": `graph create --node http://localhost:8020/ ${contractName.toLowerCase()}`,
      "remove-local": `graph remove --node http://localhost:8020/ ${contractName.toLowerCase()}`,
      "deploy-local": `graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001 ${contractName.toLowerCase()}`
    },
    dependencies: {
      "@graphprotocol/graph-cli": "^0.60.0",
      "@graphprotocol/graph-ts": "^0.32.0"
    }
  }, null, 2);
}

/**
 * Generate networks.json for multi-network deployment
 */
function generateNetworks(contractName: string, contractAddress: string): string {
  return JSON.stringify({
    "mantle": {
      [contractName]: {
        "address": contractAddress,
        "startBlock": 0
      }
    },
    "mantle-sepolia": {
      [contractName]: {
        "address": contractAddress,
        "startBlock": 0
      }
    }
  }, null, 2);
}

/**
 * Generate complete subgraph scaffolding from contract ABI
 */
export function generateSubgraph(
  contractName: string,
  contractAddress: string,
  abi: any[],
  network: string = 'mantle-sepolia'
): Record<string, string> {
  const events = extractEvents(abi);

  // If no events, create default Transfer-like event structure
  if (events.length === 0) {
    events.push({
      name: 'Transfer',
      inputs: [
        { name: 'from', type: 'address', indexed: true },
        { name: 'to', type: 'address', indexed: true },
        { name: 'value', type: 'uint256', indexed: false }
      ]
    });
  }

  return {
    "schema.graphql": generateSchema(contractName, events),
    "subgraph.yaml": generateManifest(contractName, contractAddress, events, network),
    [`src/${contractName.toLowerCase()}.ts`]: generateMappings(contractName, events),
    [`abis/${contractName}.json`]: JSON.stringify(abi, null, 2),
    "package.json": generatePackageJson(contractName),
    "networks.json": generateNetworks(contractName, contractAddress),
    "README.md": `# ${contractName} Subgraph

This subgraph indexes events from the ${contractName} contract on Mantle Network.

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Generate types:
   \`\`\`bash
   npm run codegen
   \`\`\`

3. Build:
   \`\`\`bash
   npm run build
   \`\`\`

4. Deploy to The Graph Studio:
   \`\`\`bash
   graph auth --studio <DEPLOY_KEY>
   npm run deploy
   \`\`\`

## Contract Address

\`${contractAddress}\`

## Indexed Events

${events.map(e => `- **${e.name}**: ${e.inputs.map(i => `${i.name} (${i.type}${i.indexed ? ', indexed' : ''})`).join(', ')}`).join('\n')}
`
  };
}

