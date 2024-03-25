import { agent } from './veramo/setup.js'

async function main() {
  const result = await agent.verifyCredential({
    credential: {
      "credentialSubject": {
        "you": "Iyed",
        "Driver": "Rzouga",
        "weight": "400kg",
        "date": "24-03-2024",
        "id": "did:web:example.com"
      },
      "issuer": {
        "id": "did:ethr:goerli:0x03c02a1e1dc8ce1cc3b454bf0422518a8d4811763a47abe4f10e920055308c206a"
      },
      "type": [
        "VerifiableCredential"
      ],
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "issuanceDate": "2024-03-24T23:05:44.000Z",
      "proof": {
        "type": "JwtProof2020",
        "jwt": "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifA.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6Ikl5ZWQiLCJEcml2ZXIiOiJSem91Z2EiLCJ3ZWlnaHQiOiI0MDBrZyIsImRhdGUiOiIyNC0wMy0yMDI0In19LCJzdWIiOiJkaWQ6d2ViOmV4YW1wbGUuY29tIiwibmJmIjoxNzExMzIxNTQ0LCJpc3MiOiJkaWQ6ZXRocjpnb2VybGk6MHgwM2MwMmExZTFkYzhjZTFjYzNiNDU0YmYwNDIyNTE4YThkNDgxMTc2M2E0N2FiZTRmMTBlOTIwMDU1MzA4YzIwNmEifQ.rsObyo711z1FS93EGuZs7imvPgTVKKYKFTzN1LuYj-h8U1Xg1G4ytqBZLatwZk3vh2G1O63SYNzRagpy9ToX0A"
      }
    }
  })
  console.log(`Credential verified`, result.verified)
}

main().catch(console.log)