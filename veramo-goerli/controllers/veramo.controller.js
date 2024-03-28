import { createVerifiableCredential } from "../veramo/functions/createCredential"

async function createCredential(req, res) {
  try {
    const verifiableCredential = await createVerifiableCredential()
    console.log("New credential created")
    console.log(JSON.stringify(verifiableCredential, null, 2))
    res.json({ verifiableCredential })
  } catch (error) {
    console.error("Error creating verifiable credential:", error)
    res
      .status(500)
      .json({ error: "An error occurred while creating verifiable credential" })
  }
}

export { createCredential }
