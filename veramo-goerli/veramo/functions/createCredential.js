import { agent } from "./setup.js"

export async function createVerifiableCredential() {
  const identifier = await agent.didManagerGetByAlias({ alias: "default" })

  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: identifier.did },
      credentialSubject: {
        id: "did:web:example.com",
        you: "Iyed",
        Driver: "Rzouga",
        weight: "400kg",
        date: "24-03-2024",
      },
    },
    proofFormat: "jwt",
  })

  return verifiableCredential
}
