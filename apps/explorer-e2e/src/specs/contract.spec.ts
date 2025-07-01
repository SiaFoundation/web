import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { Cluster, startCluster } from '../fixtures/cluster'
import { teardownCluster } from '@siafoundation/clusterd'
import { exploredStabilization } from '../helpers/exploredStabilization'
import {
  findV1TestContractWithStatus,
  findV2TestContractWithResolutionType,
} from '../helpers/findTestContract'
import { RENEWED_FROM_BUTTON, RENEWED_TO_BUTTON } from '../fixtures/constants'
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

  test('contract can be searched by id', async ({ page }) => {
    const activeContract = await findV2TestContractWithResolutionType(
      cluster,
      'renewal'
    )
    // eslint-disable-next-line playwright/no-conditional-in-test
    const contractID = activeContract?.id || 'invalid'

    await explorerApp.goTo('/')
    await explorerApp.navigateBySearchBar(contractID)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Contract ' + contractID.slice(0, 5))
    ).toBeVisible()
  })

  test('contract can be directly navigated to', async ({ page }) => {
    const activeContract = await findV2TestContractWithResolutionType(
      cluster,
      'renewal'
    )
    // eslint-disable-next-line playwright/no-conditional-in-test
    const contractID = activeContract?.id || 'invalid'

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
    await expect(page.getByText('active')).toBeVisible()
  })

  test('contract navigate to and from a renewed contract', async ({ page }) => {
    const renewedContract = await findV2TestContractWithResolutionType(
      cluster,
      'renewal'
    )
    await explorerApp.goTo('/contract/' + renewedContract?.id)
    await expectThenClick(page.getByTestId(RENEWED_TO_BUTTON))
    await expect(
      page
        .getByText(renewedContract?.renewedTo?.slice(0, 6) || 'TEST FAIL')
        .first()
    ).toBeVisible()
    await expectThenClick(page.getByTestId(RENEWED_FROM_BUTTON))
    await expect(
      page.getByText(renewedContract?.id.slice(0, 6) || 'TEST FAIL').first()
    ).toBeVisible()
  })

  test('contract displays the correct version', async ({ page }) => {
    const contract = await findV2TestContractWithResolutionType(
      cluster,
      'renewal'
    )
    // eslint-disable-next-line playwright/no-conditional-in-test
    const contractID = contract?.id || 'invalid'

    await explorerApp.goTo('/contract/' + contractID)

    await expect(
      page.getByTestId('explorer-contract-version').getByText('v2')
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

  test('contract can be searched by id', async ({ page }) => {
    const completedContract = await findV1TestContractWithStatus(
      cluster,
      'active'
    )
    // eslint-disable-next-line playwright/no-conditional-in-test
    const contractID = completedContract?.id || 'invalid'

    await explorerApp.goTo('/')
    await explorerApp.navigateBySearchBar(contractID)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Contract ' + contractID.slice(0, 5))
    ).toBeVisible()
  })

  test('contract can be directly navigated to', async ({ page }) => {
    const activeContract = await findV1TestContractWithStatus(cluster, 'active')

    // eslint-disable-next-line playwright/no-conditional-in-test
    const contractID = activeContract?.id || 'invalid'

    await explorerApp.goTo('/contract/' + contractID)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Contract ' + contractID.slice(0, 5))
    ).toBeVisible()
  })

  test('contract correctly displays a completed contract', async ({ page }) => {
    const completedContract = await findV1TestContractWithStatus(
      cluster,
      'complete'
    )
    await explorerApp.goTo('/contract/' + completedContract?.id)

    await expect(page.getByText('complete')).toBeVisible()
  })

  test('contract correctly displays a failed contract', async ({ page }) => {
    const failedContract = await findV1TestContractWithStatus(cluster, 'failed')

    await explorerApp.goTo('/contract/' + failedContract?.id)

    await expect(page.getByText('failed')).toBeVisible()
  })

  test('contract correctly displays an active contract', async ({ page }) => {
    const activeContract = await findV1TestContractWithStatus(cluster, 'active')

    await explorerApp.goTo('/contract/' + activeContract?.id)

    await expect(page.getByText('active')).toBeVisible()
  })

  test('contract displays the correct version', async ({ page }) => {
    const activeContract = await findV1TestContractWithStatus(cluster, 'active')

    // eslint-disable-next-line playwright/no-conditional-in-test
    const contractID = activeContract?.id || 'invalid'

    await explorerApp.goTo('/contract/' + contractID)

    await expect(
      page.getByTestId('explorer-contract-version').getByText('v1')
    ).toBeVisible()
  })
})
