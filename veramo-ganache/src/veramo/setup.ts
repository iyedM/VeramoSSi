// Core interfaces
import { createAgent, IDIDManager, IResolver, IDataStore, IKeyManager, ICredentialPlugin } from '@veramo/core'

// Core identity manager plugin
import { DIDManager } from '@veramo/did-manager'

// Ethr did identity provider
import { EthrDIDProvider } from '@veramo/did-provider-ethr'

// Web did identity provider
import { WebDIDProvider } from '@veramo/did-provider-web'

// Core key manager plugin
import { KeyManager } from '@veramo/key-manager'

// Custom key management system for RN
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'

// W3C Verifiable Credential plugin
import { CredentialPlugin } from '@veramo/credential-w3c'
import { DataStore, DataStoreORM } from '@veramo/data-store'

// Custom resolvers
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { Resolver } from 'did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'

// Storage plugin using TypeOrm
import { Entities, KeyStore, DIDStore, IDataStoreORM, PrivateKeyStore, migrations } from '@veramo/data-store'

// TypeORM is installed with `@veramo/data-store`
import { DataSource } from 'typeorm'

// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite'


// This will be the secret key for the KMS
const KMS_SECRET_KEY =
  '11b574d316903ced6cc3f4787bbcc3047d9c72d1da4d83e36fe714ef785d10c1'

  const dbConnection = new DataSource({
    type: 'sqlite',
    database: DATABASE_FILE,
    synchronize: false,
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
  }).initialize()

  export const agent = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin>({
    plugins: [
      new KeyManager({
        store: new KeyStore(dbConnection),
        kms: {
          local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
        },
      }),
      new DIDManager({
        store: new DIDStore(dbConnection),
        defaultProvider: 'did:ethr:ganache',
        providers: {
          'did:ethr:ganache': new EthrDIDProvider({
            defaultKms: 'local',
            network: 'ganache',
            rpcUrl: '127.0.0.1:7545',
            // It's important to configure the gasLimit and gasPrice for Ganache
            gas: 1000000,
          }),
        },
        },
      ),
      new DIDResolverPlugin({
        resolver: new Resolver({
          ...ethrDidResolver({ 
            networks: [
              {
                name: 'ganache',
                chainId: 5777,
                rpcUrl: '127.0.0.1:7545'
              },
            ], }),
          ...webDidResolver(),
        }),
      }),
      new CredentialPlugin(),
      new DataStore(dbConnection),
    new DataStoreORM(dbConnection),
    ],
  })