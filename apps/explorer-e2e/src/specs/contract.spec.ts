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

const networkVersions = ['v1', 'v2', 'transition'] as const

for (const networkVersion of networkVersions) {
  test.describe(`${networkVersion}`, () => {
    test.beforeEach(async ({ page, context }) => {
      cluster = await startCluster({ context, networkVersion })
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

    // Tests
    test('contract can be searched by id', async ({ page }) => {
      /* eslint-disable playwright/no-conditional-in-test */
      if (networkVersion === 'v1') {
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
      }

      if (networkVersion === 'transition') {
        const hostContracts = await cluster.daemons.hostds[0].api.contractsV2({
          data: { statuses: ['active'] },
        })
        const contractID = hostContracts.data.contracts[0].id

        await explorerApp.goTo('/')
        await explorerApp.navigateBySearchBar(contractID)

        await expect(
          page
            .getByTestId('entity-heading')
            .getByText('Contract ' + contractID.slice(0, 5))
        ).toBeVisible()
      }

      if (networkVersion === 'v2') {
        const hostContracts = await cluster.daemons.hostds[0].api.contractsV2({
          data: { statuses: ['active'] },
        })
        const contractID = hostContracts.data.contracts[0].id

        await explorerApp.goTo('/')
        await explorerApp.navigateBySearchBar(contractID)

        await expect(
          page
            .getByTestId('entity-heading')
            .getByText('Contract ' + contractID.slice(0, 5))
        ).toBeVisible()
      }
      /* eslint-enable playwright/no-conditional-in-test */
    })

    test('contract can be directly navigated to', async ({ page }) => {
      /* eslint-disable playwright/no-conditional-in-test */
      if (networkVersion === 'v1') {
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
      }

      if (networkVersion === 'transition') {
        const hostContracts = await cluster.daemons.hostds[0].api.contractsV2({
          data: { statuses: ['active'] },
        })
        const contractID = hostContracts.data.contracts[0].id

        await explorerApp.goTo('/contract/' + contractID)

        await expect(
          page
            .getByTestId('entity-heading')
            .getByText('Contract ' + contractID.slice(0, 5))
        ).toBeVisible()
      }

      if (networkVersion === 'v2') {
        const hostContracts = await cluster.daemons.hostds[0].api.contractsV2({
          data: { statuses: ['active'] },
        })
        const contractID = hostContracts.data.contracts[0].id

        await explorerApp.goTo('/contract/' + contractID)

        await expect(
          page
            .getByTestId('entity-heading')
            .getByText('Contract ' + contractID.slice(0, 5))
        ).toBeVisible()
      }
      /* eslint-enable playwright/no-conditional-in-test */
    })
  })
}
