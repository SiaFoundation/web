import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { Cluster, startCluster } from '../fixtures/cluster'
import {
  renterdWaitForContracts,
  teardownCluster,
} from '@siafoundation/clusterd'
import { exploredStabilization } from '../helpers/exploredStabilization'
import {
  findV1TestContractWithResolutionType,
  findV2TestContractWithResolutionType,
} from '../helpers/findTestContract'
import { RENEWED_FROM_BUTTON, RENEWED_TO_BUTTON } from '../fixtures/constants'

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

  test('contract can be searched by id', async ({ page }) => {
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
  })

  test('contract can be directly navigated to', async ({ page }) => {
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
  })

  test('contract correctly displays a completed contract', async ({ page }) => {
    const completedContract = await findV2TestContractWithResolutionType(
      cluster,
      'storage_proof'
    )
    await explorerApp.goTo('/contract/' + completedContract?.id)

    await expect(page.getByText('complete')).toBeVisible()
  })

  test('contract correctly displays a failed contract', async ({ page }) => {
    const failedContract = await findV2TestContractWithResolutionType(
      cluster,
      'expiration'
    )
    await explorerApp.goTo('/contract/' + failedContract?.id)

    await expect(page.getByText('failed')).toBeVisible()
  })

  test('contract correctly displays a contract in progress', async ({
    page,
  }) => {
    const renewedContract = await findV2TestContractWithResolutionType(
      cluster,
      'renewal'
    )
    await explorerApp.goTo('/contract/' + renewedContract?.renewedTo)
    await expect(page.getByText('in progress')).toBeVisible()
  })

  test('contract navigate to and from a renewed contract', async ({ page }) => {
    const renewedContract = await findV2TestContractWithResolutionType(
      cluster,
      'renewal'
    )
    console.log(renewedContract?.id)
    await explorerApp.goTo('/contract/' + renewedContract?.id)
    await page.getByTestId(RENEWED_TO_BUTTON).click()
    await expect(
      page.getByText(renewedContract?.renewedTo?.slice(0, 6) || 'TEST FAIL')
    ).toBeVisible()
    await page.getByTestId(RENEWED_FROM_BUTTON).click()
    await expect(
      page.getByText(renewedContract?.id.slice(0, 6) || 'TEST FAIL').first()
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

  test('contract correctly displays a completed contract', async ({ page }) => {
    const completedContract = await findV1TestContractWithResolutionType(
      cluster,
      'complete'
    )
    await explorerApp.goTo('/contract/' + completedContract?.id)

    await expect(page.getByText('complete')).toBeVisible()
  })

  test('contract correctly displays a failed contract', async ({ page }) => {
    const failedContract = await findV1TestContractWithResolutionType(
      cluster,
      'failed'
    )

    await explorerApp.goTo('/contract/' + failedContract?.id)

    await expect(page.getByText('failed')).toBeVisible()
  })

  test('contract correctly displays a contract in progress', async ({
    page,
  }) => {
    const inProgressContract = await findV1TestContractWithResolutionType(
      cluster,
      'in progress'
    )

    await explorerApp.goTo('/contract/' + inProgressContract?.id)

    await expect(page.getByText('in progress')).toBeVisible()
  })
})
