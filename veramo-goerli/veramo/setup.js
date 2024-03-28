import { createAgent } from "@veramo/core"
import { DIDManager } from "@veramo/did-manager"
import { EthrDIDProvider } from "@veramo/did-provider-ethr"

const initializeVeramo = () => {
  const agent = createAgent({
    plugins: [
      new DIDManager({
        providers: [
          new EthrDIDProvider({
            rpcUrl: "https://rinkeby.infura.io/v3/your-infura-project-id",
            privateKey: "your-private-key",
          }),
        ],
      }),
    ],
  })
  return agent
}

export default initializeVeramo
