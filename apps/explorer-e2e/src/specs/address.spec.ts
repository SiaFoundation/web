import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { startCluster, Cluster } from '../fixtures/cluster'
import { teardownCluster } from '@siafoundation/clusterd'
import { exploredStabilization } from '../helpers/exploredStabilization'
import { expectThenClick } from '@siafoundation/e2e'
import { findTestOutput } from '../helpers/findTestOutput'

let explorerApp: ExplorerApp
let cluster: Cluster

// V2
test.describe('v2', () => {
  test.beforeEach(async ({ page, context }) => {
    cluster = await startCluster({ context, testContracts: 'v2' })
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
    const { siacoinOutput } = await findTestOutput(cluster, 'v2')
    const events = await cluster.daemons.explored.api.addressEvents({
      params: { address: siacoinOutput.address },
    })

    await explorerApp.goTo('/address/' + siacoinOutput.address)
    await expect(
      page.getByText(`Address ${siacoinOutput.address.slice(0, 5)}`)
    ).toBeVisible()
    await expect(page.getByText(events.data[0].id.slice(0, 5))).toBeVisible()
    await expect(page.getByTestId('entity-link')).toHaveCount(
      events.data.length
    )

    // The test output is missing the ID, so we need to get an output from
    // explored.
    const outputs = await cluster.daemons.explored.api.addressSiacoinUTXOs({
      params: { address: siacoinOutput.address },
    })
    await expectThenClick(page.getByRole('tab').getByText('Unspent outputs'))
    await expect(page.getByText('Siacoin output').first()).toBeVisible()
    await expect(page.getByText(outputs.data[0].id.slice(0, 5))).toBeVisible()
  })
})

// V1
test.describe('v1', () => {
  test.beforeEach(async ({ page, context }) => {
    cluster = await startCluster({
      context,
      testContracts: 'v1',
    })
    await exploredStabilization(cluster)
    explorerApp = new ExplorerApp(page)
  })

  test.afterEach(async () => {
    await teardownCluster()
  })

  test('address can be searched by id', async ({ page }) => {
    const { siacoinOutput } = await findTestOutput(cluster, 'v1')
    const address = siacoinOutput.address
    await explorerApp.goTo('/')
    await explorerApp.navigateBySearchBar(address)
    await expect(
      page
        .getByTestId('entity-heading')
        .getByText(`Address ${address.slice(0, 5)}`)
    ).toBeVisible()
  })

  test('address can be directly navigated to by id', async ({ page }) => {
    const { siacoinOutput } = await findTestOutput(cluster, 'v1')
    const address = siacoinOutput.address
    await explorerApp.goTo('/address/' + address)
    await expect(
      page
        .getByTestId('entity-heading')
        .getByText(`Address ${address.slice(0, 5)}`)
    ).toBeVisible()
  })

  test('address displays the intended data', async ({ page }) => {
    const { siacoinOutput } = await findTestOutput(cluster, 'v1')
    const events = await cluster.daemons.explored.api.addressEvents({
      params: { address: siacoinOutput.address },
    })

    await explorerApp.goTo('/address/' + siacoinOutput.address)
    await expect(
      page.getByText(`Address ${siacoinOutput.address.slice(0, 5)}`)
    ).toBeVisible()
    await expect(page.getByText(events.data[0].id.slice(0, 5))).toBeVisible()
    await expect(page.getByTestId('entity-link')).toHaveCount(
      events.data.length
    )

    // The test output is missing the ID, so we need to get an output from
    // explored.
    const outputs = await cluster.daemons.explored.api.addressSiacoinUTXOs({
      params: { address: siacoinOutput.address },
    })
    await expectThenClick(page.getByRole('tab').getByText('Unspent outputs'))
    await expect(page.getByText('Siacoin output').first()).toBeVisible()
    await expect(page.getByText(outputs.data[0].id.slice(0, 5))).toBeVisible()
  })
})
