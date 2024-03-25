import { agent } from './veramo/setup.js'

async function main() {
  const identifier = await agent.didManagerCreate({ 
    provider: 'did:ethr:ganache',
    alias: 'default' })
  console.log(`New identifier created`)
  console.log(JSON.stringify(identifier, null, 2))
}

main().catch(console.log);
main().catch(console.error)