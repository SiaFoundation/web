import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { startCluster, Cluster } from '../fixtures/cluster'
import {
  mine,
  renterdWaitForContracts,
  teardownCluster,
} from '@siafoundation/clusterd'
import { addWalletToWalletd, sendSiacoinFromRenterd } from '../fixtures/walletd'
import { toHastings } from '@siafoundation/units'
import { exploredStabilization } from '../helpers/exploredStabilization'

let explorerApp: ExplorerApp
let cluster: Cluster

// V2
test.describe('v2', () => {
  test.beforeEach(async ({ page, context }) => {
    cluster = await startCluster({ context, networkVersion: 'v2' })
    await renterdWaitForContracts({
      renterdNode: cluster.daemons.renterds[0].node,
      hostdCount: cluster.daemons.hostds.length,
    })
    await exploredStabilization(cluster)
    explorerApp = new ExplorerApp(page)
  })

  test.afterEach(async () => {
    await teardownCluster()
  })

  test('address can be searched by id', async ({ page }) => {
    const wallet = await cluster.daemons.renterds[0].api.wallet()
    await explorerApp.goTo('/')
    await explorerApp.navigateBySearchBar(wallet.data.address)
    await expect(
      page
        .getByTestId('entity-heading')
        .getByText(`Address ${wallet.data.address.slice(0, 5)}`)
    ).toBeVisible()
  })

  test('address can be directly navigated to by id', async ({ page }) => {
    const wallet = await cluster.daemons.renterds[0].api.wallet()
    await explorerApp.goTo('/address/' + wallet.data.address)
    await expect(
      page
        .getByTestId('entity-heading')
        .getByText(`Address ${wallet.data.address.slice(0, 5)}`)
    ).toBeVisible()
  })

  test('address displays the intended data', async ({ page }) => {
    const walletd = cluster.daemons.walletds[0]
    const { wallet, address } = await addWalletToWalletd(walletd.api)
    await sendSiacoinFromRenterd(
      cluster.daemons.renterds[0],
      address,
      toHastings(1_000_000).toString()
    )
    await mine(10)

    const events = await walletd.api.walletEvents({
      params: { id: wallet.id, limit: 1_000, offset: 0 },
    })
    const outputs = await walletd.api.walletOutputsSiacoin({
      params: { id: wallet.id },
    })

    await explorerApp.goTo('/address/' + address)
    await expect(page.getByText(`Address ${address.slice(0, 5)}`)).toBeVisible()
    await expect(page.getByText(events.data[0].id.slice(0, 5))).toBeVisible()
    await expect(page.getByTestId('entity-link')).toHaveCount(
      events.data.length
    )
    await page.getByRole('tab').getByText('Unspent outputs').click()
    await expect(page.getByText('Siacoin output').first()).toBeVisible()
    await expect(
      page.getByText(outputs.data.outputs[0].id.slice(0, 5))
    ).toBeVisible()
  })
})

// V1
test.describe('v1', () => {
  test.beforeEach(async ({ page, context }) => {
    cluster = await startCluster({ context, networkVersion: 'v1' })
    await renterdWaitForContracts({
      renterdNode: cluster.daemons.renterds[0].node,
      hostdCount: cluster.daemons.hostds.length,
    })
    await exploredStabilization(cluster)
    explorerApp = new ExplorerApp(page)
  })

  test.afterEach(async () => {
    await teardownCluster()
  })

  test('address can be searched by id', async ({ page }) => {
    const wallet = await cluster.daemons.renterds[0].api.wallet()
    await explorerApp.goTo('/')
    await explorerApp.navigateBySearchBar(wallet.data.address)
    await expect(
      page
        .getByTestId('entity-heading')
        .getByText(`Address ${wallet.data.address.slice(0, 5)}`)
    ).toBeVisible()
  })

  test('address can be directly navigated to by id', async ({ page }) => {
    const wallet = await cluster.daemons.renterds[0].api.wallet()
    await explorerApp.goTo('/address/' + wallet.data.address)
    await expect(
      page
        .getByTestId('entity-heading')
        .getByText(`Address ${wallet.data.address.slice(0, 5)}`)
    ).toBeVisible()
  })

  test('address displays the intended data', async ({ page }) => {
    const walletd = cluster.daemons.walletds[0]
    const { wallet, address } = await addWalletToWalletd(walletd.api)
    await sendSiacoinFromRenterd(
      cluster.daemons.renterds[0],
      address,
      toHastings(1_000_000).toString()
    )
    await mine(10)

    const events = await walletd.api.walletEvents({
      params: { id: wallet.id, limit: 1_000, offset: 0 },
    })
    const outputs = await walletd.api.walletOutputsSiacoin({
      params: { id: wallet.id },
    })

    await explorerApp.goTo('/address/' + address)
    await expect(page.getByText(`Address ${address.slice(0, 5)}`)).toBeVisible()
    await expect(page.getByText(events.data[0].id.slice(0, 5))).toBeVisible()
    await expect(page.getByTestId('entity-link')).toHaveCount(
      events.data.length
    )
    await page.getByRole('tab').getByText('Unspent outputs').click()
    await expect(page.getByText('Siacoin output').first()).toBeVisible()
    await expect(
      page.getByText(outputs.data.outputs[0].id.slice(0, 5))
    ).toBeVisible()
  })
})
