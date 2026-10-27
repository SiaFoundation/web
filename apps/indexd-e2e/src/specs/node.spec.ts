import { test, expect, Page } from '@playwright/test'
import { getCurrentHeight } from '@siafoundation/clusterd'
import { fillTextInputByName } from '@siafoundation/e2e'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { navigateToNode } from '../fixtures/navigate'

test.afterEach(async () => {
  await afterTest()
})

async function connectPeer(page: Page, address: string) {
  await navigateToNode(page)
  await page.getByRole('button', { name: 'Connect peer' }).click()
  const dialog = page.getByRole('dialog')
  await fillTextInputByName(page, 'address', address)
  await dialog.getByRole('button', { name: 'Connect', exact: true }).click()
}

test.describe('indexd only', () => {
  test.beforeEach(async ({ page }) => {
    await beforeTest(page)
  })

  test('node shows the synced height', async ({ page }) => {
    const height = await getCurrentHeight()
    await navigateToNode(page)
    await expect(
      page.getByText(Number(height).toLocaleString('en-US'), { exact: true }),
    ).toBeVisible()
  })

  test('show an error when connecting to a peer fails', async ({ page }) => {
    // Nothing listens on port 1.
    await connectPeer(page, '127.0.0.1:1')
    await expect(page.getByText(/couldn't connect to peer/)).toBeVisible()
    await expect(page.getByText('Connected to peer')).toBeHidden()
  })
})

test.describe('with a peer', () => {
  let cluster: Awaited<ReturnType<typeof beforeTest>>

  test.beforeEach(async ({ page }) => {
    cluster = await beforeTest(page, { hostdCount: 1 })
  })

  // Syncers discover each other on their own, so indexd may already be
  // connected to any peer in the cluster and the outcome of a connect is
  // racy. Check the request indexd receives instead.
  test('send the peer address as a string', async ({ page }) => {
    const hostd = cluster.daemons.hostds[0]
    const request = page.waitForRequest(
      (r) => r.url().endsWith('/api/syncer/connect') && r.method() === 'POST',
    )
    await connectPeer(page, hostd.node.syncerAddress)
    expect((await request).postDataJSON()).toBe(hostd.node.syncerAddress)
  })
})
