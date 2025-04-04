import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { Cluster, startCluster } from '../fixtures/cluster'
import {
  renterdWaitForContracts,
  teardownCluster,
} from '@siafoundation/clusterd'
import { exploredStabilization } from '../helpers/exploredStabilization'

let explorerApp: ExplorerApp
let cluster: Cluster

test.beforeEach(async ({ page, context }) => {
  cluster = await startCluster({ context })
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

test('transaction can be searched by id', async ({ page }) => {
  const events = await cluster.daemons.renterds[0].api.walletEvents({
    params: {
      limit: 1,
      offset: 0,
    },
  })
  const transactionID = events.data[0].id

  await explorerApp.goTo('/')
  await explorerApp.navigateBySearchBar(transactionID)

  await expect(
    page
      .getByTestId('entity-heading')
      .getByText('Transaction ' + transactionID.slice(0, 5))
  ).toBeVisible()
})

test('transaction can be navigated to by id', async ({ page }) => {
  const events = await cluster.daemons.renterds[0].api.walletEvents({
    params: {
      limit: 1,
      offset: 0,
    },
  })
  const transactionID = events.data[0].id

  await explorerApp.goTo('/tx/' + transactionID)

  await expect(
    page
      .getByTestId('entity-heading')
      .getByText('Transaction ' + transactionID.slice(0, 5))
  ).toBeVisible()
})

test('transaction can click through to a contract', async ({ page }) => {
  const events = await cluster.daemons.renterds[0].api.walletEvents({
    params: {
      limit: 1,
      offset: 0,
    },
  })
  const transactionID = events.data[0].id

  await explorerApp.goTo('/tx/' + transactionID)
  await page.getByRole('link', { name: 'C', exact: true }).click()

  await expect(
    page.getByTestId('entity-heading').getByText('Contract')
  ).toBeVisible()
})

test('transaction can click through to an address', async ({ page }) => {
  const events = await cluster.daemons.renterds[0].api.walletEvents({
    params: {
      limit: 1,
      offset: 0,
    },
  })
  const transactionID = events.data[0].id

  await explorerApp.goTo('/tx/' + transactionID)
  await page.getByRole('link', { name: 'SO', exact: true }).first().click()

  await expect(
    page.getByTestId('entity-heading').getByText('Address')
  ).toBeVisible()
})
