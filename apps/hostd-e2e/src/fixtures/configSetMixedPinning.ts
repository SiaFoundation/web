import Axios from 'axios'
import { Page } from '@playwright/test'
import { clusterd } from '@siafoundation/clusterd'
import { step } from '@siafoundation/e2e'

/**
 * Sets a pinning configuration where only some prices are pinned, which the UI
 * no longer allows the host to create. Hosts configured before pinning became
 * all or nothing can still be in this state, so it is set directly on the
 * daemon to test how the UI presents and resolves it.
 */
export const configSetMixedPinning = step(
  'set mixed pinning configuration',
  async ({ page }: { page: Page }) => {
    const hostdNode = clusterd.nodes.find((n) => n.type === 'hostd')
    await Axios.put(
      `${hostdNode.apiAddress}/api/settings/pinned`,
      {
        currency: 'usd',
        threshold: 0.02,
        storage: { pinned: true, value: 5 },
        egress: { pinned: false, value: 0 },
        ingress: { pinned: false, value: 0 },
        maxCollateral: { pinned: false, value: 0 },
      },
      {
        auth: { username: '', password: hostdNode.password },
        timeout: 10_000,
      },
    )
    // The app has already fetched and cached the settings during login, so
    // reload to pick up the configuration that was just set on the daemon.
    await page.reload()
  },
)

/**
 * The pinning configuration as reported by the daemon, for asserting what was
 * actually saved rather than what the UI displays.
 */
export const getPinnedSettings = step(
  'get pinned settings',
  async (): Promise<{
    storage: { pinned: boolean }
    egress: { pinned: boolean }
    ingress: { pinned: boolean }
    maxCollateral: { pinned: boolean }
  }> => {
    const hostdNode = clusterd.nodes.find((n) => n.type === 'hostd')
    const response = await Axios.get(
      `${hostdNode.apiAddress}/api/settings/pinned`,
      {
        auth: { username: '', password: hostdNode.password },
        timeout: 10_000,
      },
    )
    return response.data
  },
)
