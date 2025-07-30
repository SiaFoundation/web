import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import {
  APP_NAME,
  APP_NETWORK,
  HOME_ACTIVE_HOSTS,
  HOME_HEIGHT,
  LATEST_BLOCKS_ITEM,
  METRICS_ITEM,
  TOP_HOSTS_ITEMS,
} from '../fixtures/constants'
import { Cluster, startCluster } from '../fixtures/cluster'
import { teardownCluster } from '@siafoundation/clusterd'
import { exploredStabilization } from '../helpers/exploredStabilization'

let explorerApp: ExplorerApp
let cluster: Cluster

// V2
test.describe('v2', () => {
  test.beforeEach(async ({ page, context }) => {
    cluster = await startCluster({ context, testContracts: 'v2' })
    await exploredStabilization(cluster)
    explorerApp = new ExplorerApp(page)
    await explorerApp.goTo('/')
  })

  test.afterEach(async () => {
    await teardownCluster()
  })

  test('home displays app identity', async ({ page }) => {
    await expect(page.getByTestId(APP_NAME)).toContainText('siascan')
    await expect(page.getByTestId(APP_NETWORK)).toContainText('zen')
  })

  test('home displays metrics', async ({ page }) => {
    await expect(page.getByTestId(METRICS_ITEM)).toHaveCount(6)
  })

  test('home displays latest blocks', async ({ page }) => {
    await expect(page.getByTestId(LATEST_BLOCKS_ITEM)).toHaveCount(5)
  })

  test('home displays top hosts', async ({ page }) => {
    await expect(page.getByTestId(TOP_HOSTS_ITEMS)).toHaveCount(1)
  })

  test('home displays accurate network information', async ({ page }) => {
    const activeHostCount = cluster.daemons.hostds.length
    const {
      data: { height },
    } = await cluster.daemons.hostds[0].api.consensusTip()

    await expect(page.getByTestId(HOME_ACTIVE_HOSTS)).toContainText(
      String(activeHostCount),
    )
    await expect(page.getByTestId(HOME_HEIGHT)).toContainText(String(height))
  })
})

// V1
test.describe('v1', () => {
  test.beforeEach(async ({ page, context }) => {
    cluster = await startCluster({ context, testContracts: 'v1' })
    await exploredStabilization(cluster)
    explorerApp = new ExplorerApp(page)
    await explorerApp.goTo('/')
  })

  test.afterEach(async () => {
    await teardownCluster()
  })

  test('home displays app identity', async ({ page }) => {
    await expect(page.getByTestId(APP_NAME)).toContainText('siascan')
    await expect(page.getByTestId(APP_NETWORK)).toContainText('zen')
  })

  test('home displays metrics', async ({ page }) => {
    await expect(page.getByTestId(METRICS_ITEM)).toHaveCount(6)
  })

  test('home displays latest blocks', async ({ page }) => {
    await expect(page.getByTestId(LATEST_BLOCKS_ITEM)).toHaveCount(5)
  })

  test('home displays top hosts', async ({ page }) => {
    await expect(page.getByTestId(TOP_HOSTS_ITEMS)).toHaveCount(1)
  })

  test('home displays accurate network information', async ({ page }) => {
    const activeHostCount = cluster.daemons.hostds.length
    const {
      data: { height },
    } = await cluster.daemons.hostds[0].api.consensusTip()

    await expect(page.getByTestId(HOME_ACTIVE_HOSTS)).toContainText(
      String(activeHostCount),
    )
    await expect(page.getByTestId(HOME_HEIGHT)).toContainText(String(height))
  })
})
