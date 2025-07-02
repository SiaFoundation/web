import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { Cluster, startCluster } from '../fixtures/cluster'
import { teardownCluster } from '@siafoundation/clusterd'
import { exploredStabilization } from '../helpers/exploredStabilization'
import { expectThenClick } from '@siafoundation/e2e'

let explorerApp: ExplorerApp
let cluster: Cluster

// V2
test.describe('v2', () => {
  test.beforeEach(async ({ page, context }) => {
    cluster = await startCluster({ context, networkVersion: 'v2' })
    await exploredStabilization(cluster)
    explorerApp = new ExplorerApp(page)
  })

  test.afterEach(async () => {
    await teardownCluster()
  })

  test('block can be searched by height', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const testBlock = String(data.height - 1)

    await explorerApp.goTo('/')
    await explorerApp.navigateBySearchBar(testBlock)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Block ' + testBlock.toLocaleString())
    ).toBeVisible()
  })

  test('block can be searched by id', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const blockID = String(data.id)

    await explorerApp.goTo('/')
    await explorerApp.navigateBySearchBar(blockID)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Block ' + data.height.toLocaleString())
    ).toBeVisible()
  })

  test('block can be directly navigated to by height', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const height = String(data.height - 1)

    await explorerApp.goTo('/block/' + height)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Block ' + height.toLocaleString())
    ).toBeVisible()
  })

  test('block can be directly navigated to by id', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const blockID = String(data.id)

    await explorerApp.goTo('/block/' + blockID)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Block ' + data.height.toLocaleString())
    ).toBeVisible()
  })

  test('block can navigate to previous block', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const height = String(data.height - 1)

    await explorerApp.goTo('/block/' + height)
    await expectThenClick(page.getByTestId('explorer-block-prevBlock'))

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText((Number(height) - 1).toLocaleString())
    ).toBeVisible()
  })

  test('block can navigate to nextblock', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const height = String(data.height - 1)

    await explorerApp.goTo('/block/' + height)
    await expectThenClick(page.getByTestId('explorer-block-nextBlock'))

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText((Number(height) + 1).toLocaleString())
    ).toBeVisible()
  })

  test('block can click through to a transaction', async ({ page }) => {
    const events = await cluster.daemons.renterds[0].api.walletEvents({
      params: { limit: 1, offset: 0 },
    })
    const transaction = events.data[0]

    await explorerApp.goTo('/block/' + transaction.maturityHeight)
    await expectThenClick(
      page.locator(`a[data-testid="entity-link"][href*="${transaction.id}"]`)
    )

    await expect(
      page.getByTestId('entity-heading').getByText(transaction.id.slice(0, 5))
    ).toBeVisible()
  })

  test('block displays the correct version', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const height = String(data.height - 1)

    await explorerApp.goTo('/block/' + height)

    await expect(
      page.getByTestId('explorer-block-version').getByText('v2')
    ).toBeVisible()
  })
})

// V1
test.describe('v1', () => {
  test.beforeEach(async ({ page, context }) => {
    cluster = await startCluster({ context, networkVersion: 'v1' })
    await exploredStabilization(cluster)
    explorerApp = new ExplorerApp(page)
  })

  test.afterEach(async () => {
    await teardownCluster()
  })

  test('block can be searched by height', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const testBlock = String(data.height - 1)

    await explorerApp.goTo('/')
    await explorerApp.navigateBySearchBar(testBlock)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Block ' + testBlock.toLocaleString())
    ).toBeVisible()
  })

  test('block can be searched by id', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const blockID = String(data.id)

    await explorerApp.goTo('/')
    await explorerApp.navigateBySearchBar(blockID)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Block ' + data.height.toLocaleString())
    ).toBeVisible()
  })

  test('block can be directly navigated to by height', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const height = String(data.height - 1)

    await explorerApp.goTo('/block/' + height)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Block ' + height.toLocaleString())
    ).toBeVisible()
  })

  test('block can be directly navigated to by id', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const blockID = String(data.id)

    await explorerApp.goTo('/block/' + blockID)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Block ' + data.height.toLocaleString())
    ).toBeVisible()
  })

  test('block can navigate to previous block', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const height = String(data.height - 1)

    await explorerApp.goTo('/block/' + height)
    await expectThenClick(page.getByTestId('explorer-block-prevBlock'))

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText((Number(height) - 1).toLocaleString())
    ).toBeVisible()
  })

  test('block can navigate to nextblock', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const height = String(data.height - 1)

    await explorerApp.goTo('/block/' + height)
    await expectThenClick(page.getByTestId('explorer-block-nextBlock'))

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText((Number(height) + 1).toLocaleString())
    ).toBeVisible()
  })

  test('block can click through to a transaction', async ({ page }) => {
    const events = await cluster.daemons.renterds[0].api.walletEvents({
      params: { limit: 1, offset: 0 },
    })
    const transaction = events.data[0]

    await explorerApp.goTo('/block/' + transaction.maturityHeight)
    await expectThenClick(
      page.locator(`a[data-testid="entity-link"][href*="${transaction.id}"]`)
    )

    await expect(
      page.getByTestId('entity-heading').getByText(transaction.id.slice(0, 5))
    ).toBeVisible()
  })

  test('block displays the correct version', async ({ page }) => {
    const { data } = await cluster.daemons.hostds[0].api.consensusTip()
    const height = String(data.height - 1)

    await explorerApp.goTo('/block/' + height)

    await expect(
      page.getByTestId('explorer-block-version').getByText('v1')
    ).toBeVisible()
  })
})
