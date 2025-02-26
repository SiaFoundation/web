import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { Cluster, startCluster } from '../fixtures/cluster'
import { teardownCluster } from '@siafoundation/clusterd'
import { exploredStabilization } from '../helpers/exploredStabilization'
import {
  getDownloadCost,
  getStorageCost,
  getUploadCost,
} from '@siafoundation/units'
import { currencyOptions } from '@siafoundation/react-core'

// Hosts can not be guaranteed like other test slices. Therefore, we'll grab
// the displayed values and test them against the patterns we expect to see.

let explorerApp: ExplorerApp
let cluster: Cluster

test.beforeEach(async ({ page, context }) => {
  cluster = await startCluster({ context })
  await exploredStabilization(cluster)

  explorerApp = new ExplorerApp(page)
})

test.afterEach(async () => {
  await teardownCluster()
})

test('host can be searched by id', async ({ page }) => {
  const host = await cluster.daemons.hostds[0].api.stateHost()
  const { publicKey } = host.data

  await explorerApp.goTo('/')
  await explorerApp.navigateBySearchBar(publicKey)

  await expect(
    page.getByText(String(publicKey.slice(0, 6))).first()
  ).toBeVisible()
})

test('host can be directly navigated to', async ({ page }) => {
  const host = await cluster.daemons.hostds[0].api.stateHost()
  const { publicKey } = host.data

  await explorerApp.goTo('/host/' + publicKey)

  await expect(
    page.getByText(String(publicKey.slice(0, 6))).first()
  ).toBeVisible()
})

test('host displays properly formatted data', async ({ page }) => {
  const host = await cluster.daemons.hostds[0].api.stateHost()
  const { publicKey } = host.data
  const usd = currencyOptions.filter((currency) => currency.id === 'usd')[0]
  const {
    data: { egressPrice, ingressPrice, storagePrice },
  } = await cluster.daemons.hostds[0].api.settings()
  const { data: rate } = await cluster.daemons.explored.api.exchangeRate({
    params: { currency: usd.id },
  })
  const downloadCost = getDownloadCost({
    price: egressPrice,
    exchange: { currency: { prefix: usd.prefix }, rate: rate.toString() },
  })
  const uploadCost = getUploadCost({
    price: ingressPrice,
    exchange: { currency: { prefix: usd.prefix }, rate: rate.toString() },
  })
  const storageCost = getStorageCost({
    price: storagePrice,
    exchange: { currency: { prefix: usd.prefix }, rate: rate.toString() },
  })

  await explorerApp.goTo('/host/' + publicKey)

  expect(await page.getByText(downloadCost).count()).toBe(2)
  expect(await page.getByText(uploadCost).count()).toBe(2)
  expect(await page.getByText(storageCost).count()).toBe(2)
})
