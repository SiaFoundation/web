import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { Cluster, startCluster } from '../fixtures/cluster'
import {
  renterdWaitForContracts,
  teardownCluster,
} from '@siafoundation/clusterd'
import { exploredStabilization } from '../helpers/exploredStabilization'
// import { RENEWED_FROM_BUTTON,
//  RENEWED_TO_BUTTON,} from '../fixtures/constants'

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

test('contract can be searched by id', async ({ page }) => {
  const hostContracts = await cluster.daemons.hostds[0].api.contracts({
    data: { statuses: ['active'] },
  })
  const contractID = hostContracts.data.contracts[0].revision.parentID

  await explorerApp.goTo('/')
  await explorerApp.navigateBySearchBar(contractID)

  await expect(
    page
      .getByTestId('entity-heading')
      .getByText('Contract ' + contractID.slice(0, 5))
  ).toBeVisible()
})

test('contract can be directly navigated to', async ({ page }) => {
  const hostContracts = await cluster.daemons.hostds[0].api.contracts({
    data: { statuses: ['active'] },
  })
  const contractID = hostContracts.data.contracts[0].revision.parentID

  await explorerApp.goTo('/contract/' + contractID)

  await expect(
    page
      .getByTestId('entity-heading')
      .getByText('Contract ' + contractID.slice(0, 5))
  ).toBeVisible()
})
