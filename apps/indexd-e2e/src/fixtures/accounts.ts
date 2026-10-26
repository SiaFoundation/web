import { randomBytes } from 'crypto'
import { Admin } from '@siafoundation/indexd-js'
import { ClusterNodeIndexd } from '@siafoundation/clusterd'
import { step } from '@siafoundation/e2e'

export type AppMeta = {
  name: string
  description: string
  logoURL: string
  serviceURL: string
}

// Accounts cannot be created from the UI, they are registered by apps. This
// registers an app account through the admin API the same way an app would,
// creating a connect key for it on the given quota.
export const registerAccount = step(
  'register account',
  async ({
    indexdNode,
    quota = 'default',
    connectKeyDescription = 'e2e key',
    app = {
      name: 'E2E App',
      description: 'E2E app description',
      logoURL: 'https://example.com/logo.png',
      serviceURL: 'https://example.com',
    },
  }: {
    indexdNode: ClusterNodeIndexd
    quota?: string
    connectKeyDescription?: string
    app?: AppMeta
  }) => {
    const admin = Admin({
      api: `${indexdNode.apiAddress}/api`,
      password: indexdNode.password,
    })
    const connectKey = await admin.connectKeyAdd({
      data: { description: connectKeyDescription, quota },
    })
    const accountKey = `ed25519:${randomBytes(32).toString('hex')}`
    // The register route is not yet part of the indexd-js admin client.
    await admin.axios.post('/apps/register', {
      connectKey: connectKey.data.key,
      appKey: accountKey,
      meta: { id: randomBytes(32).toString('hex'), ...app },
    })
    return { accountKey, connectKey: connectKey.data.key }
  },
)
