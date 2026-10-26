import { Page, expect } from '@playwright/test'
import { ClusterNodeHostd, clusterd } from '@siafoundation/clusterd'
import { clearToasts, step } from '@siafoundation/e2e'

// Cluster node IDs are the first 8 bytes of the node's public key.
export function getHostdKeyPrefixes() {
  return clusterd.nodes
    .filter((n): n is ClusterNodeHostd & { id: string } => n.type === 'hostd')
    .map((n) => `ed25519:${n.id}`)
}

export const addHostsFilter = step(
  'add hosts filter',
  async (page: Page, filter: string, option?: string) => {
    await clearToasts({ page })
    await page.getByPlaceholder('Filter hosts').click()
    await page
      .getByRole('option', { name: `Hosts filter by ${filter}` })
      .click()
    if (option) {
      await page.getByRole('option', { name: option, exact: true }).click()
      // The active filter is shown as a button.
      await expect(
        page.getByRole('button', { name: option, exact: true }),
      ).toBeVisible()
    }
  },
)

// The cluster hosts announce private addresses, which indexd never scans, so
// they are never usable. The hosts list only shows usable hosts by default.
export const showUnusableHosts = step(
  'show unusable hosts',
  async (page: Page) => {
    await addHostsFilter(page, 'usable', 'Unusable')
    await page.keyboard.press('Escape')
    await expect(page).toHaveURL(/hostListFilters=.*usable/)
  },
)

// Hosts are added once indexd processes their announcements, reload until
// they are listed.
export const waitForHostRows = step(
  'wait for host rows',
  async (page: Page, count: number) => {
    const rows = page
      .getByRole('table')
      .getByRole('row')
      .filter({ hasText: 'ed25519:' })
    await expect(async () => {
      await page.reload()
      await expect(rows).toHaveCount(count, { timeout: 2_000 })
    }).toPass({ timeout: 30_000 })
  },
)
