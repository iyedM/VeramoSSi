import { agent } from './veramo/setup.js'

async function main() {
  try {
    const identifier = await agent.didManagerGetByAlias({ alias: 'default', provider: 'did:ethr:ganache:0x03901b79a36e811796e57f22ab6b366dbb62b592036a3b8b2c766b5a97134fa539' });

    const verifiableCredential = await agent.createVerifiableCredential({
      credential: {
        issuer: { id: identifier.did },
        credentialSubject: {
          id: 'did:ethr:ganache',
          you: 'Iyed',
          Driver: 'Rzouga',
          weight: '400kg',
          date: '24-03-2024',
        },
      },
      proofFormat: 'jwt',
    });

    console.log(`New credential created`);
    console.log(JSON.stringify(verifiableCredential, null, 2));
  } catch (error) {
    console.error('Error creating credential:', error);
  }
}

main();
