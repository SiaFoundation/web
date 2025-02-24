import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { startCluster, stopCluster } from '../fixtures/cluster'
import { mine, renterdWaitForContracts } from '@siafoundation/clusterd'
import { addWalletToWalletd, sendSiacoinFromRenterd } from '../fixtures/walletd'
import { Cluster } from '../fixtures/cluster'
import { toHastings } from '@siafoundation/units'

let explorerApp: ExplorerApp
let cluster: Cluster

test.beforeEach(async ({ page }) => {
  cluster = await startCluster()
  await renterdWaitForContracts({
    renterdNode: cluster.daemons.renterd,
    hostdCount: cluster.daemons.hostds.length,
  })
  explorerApp = new ExplorerApp(page, cluster.webServerUrl)
})

test.afterEach(async () => {
  await stopCluster()
})

test('address can be searched by id', async ({ page }) => {
  const wallet = await cluster.apis.renterd.wallet()
  await explorerApp.goTo('/')
  await explorerApp.navigateBySearchBar(wallet.data.address)
  await expect(
    page
      .getByTestId('entity-heading')
      .getByText(`Address ${wallet.data.address.slice(0, 5)}`)
  ).toBeVisible()
})

test('address can be directly navigated to by id', async ({ page }) => {
  const wallet = await cluster.apis.renterd.wallet()
  await explorerApp.goTo('/address/' + wallet.data.address)
  await expect(
    page
      .getByTestId('entity-heading')
      .getByText(`Address ${wallet.data.address.slice(0, 5)}`)
  ).toBeVisible()
})

test('address displays the intended data', async ({ page }) => {
  const { wallet, address } = await addWalletToWalletd(cluster.apis.walletds[0])
  await sendSiacoinFromRenterd(address, toHastings(1_000_000).toString())
  await mine(10)
  const events = await cluster.apis.walletds[0].walletEvents({
    params: {
      id: wallet.id,
      limit: 1_000,
      offset: 0,
    },
  })
  const outputs = await cluster.apis.walletds[0].walletOutputsSiacoin({
    params: {
      id: wallet.id,
    },
  })
  await explorerApp.goTo('/address/' + address)
  await expect(page.getByText(`Address ${address.slice(0, 5)}`)).toBeVisible()
  await expect(page.getByText(events.data[0].id.slice(0, 5))).toBeVisible()
  await expect(page.getByText(`${events.data.length} events`)).toBeVisible()
  await page.getByRole('tab').getByText('Unspent outputs').click()
  await expect(page.getByText('Siacoin output').first()).toBeVisible()
  await expect(
    page.getByText(outputs.data.outputs[0].id.slice(0, 5))
  ).toBeVisible()
})

test('address can navigate through to a transaction', async ({ page }) => {
  const wallet = await cluster.apis.renterd.wallet()
  const events = await cluster.apis.renterd.walletEvents({
    params: {
      limit: 1,
      offset: 0,
    },
  })
  await explorerApp.goTo('/address/' + wallet.data.address)

  await page
    .locator(`a[data-testid="entity-link"][href*="${events.data[0].id}"]`)
    .click()

  await expect(page.getByText(events.data[0].id.slice(0, 5))).toBeVisible()
})
