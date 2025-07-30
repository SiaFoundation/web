import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { Cluster, startCluster } from '../fixtures/cluster'
import { teardownCluster } from '@siafoundation/clusterd'
import { exploredStabilization } from '../helpers/exploredStabilization'
import {
  findV1TestContractWithStatus,
  findV2TestContractWithResolutionType,
} from '../helpers/findTestContract'
import { expectThenClick } from '@siafoundation/e2e'

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

  test('transaction can be searched by id', async ({ page }) => {
    const contract = await findV2TestContractWithResolutionType(
      cluster,
      'renewal',
    )

    // eslint-disable-next-line playwright/no-conditional-in-test
    const transactionID = contract?.confirmationTransactionID || 'invalid'

    await explorerApp.goTo('/')
    await explorerApp.navigateBySearchBar(transactionID)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Transaction ' + transactionID.slice(0, 5)),
    ).toBeVisible()
  })

  test('transaction can be navigated to by id', async ({ page }) => {
    const contract = await findV2TestContractWithResolutionType(
      cluster,
      'renewal',
    )

    // eslint-disable-next-line playwright/no-conditional-in-test
    const transactionID = contract?.confirmationTransactionID || 'invalid'

    await explorerApp.goTo('/tx/' + transactionID)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Transaction ' + transactionID.slice(0, 5)),
    ).toBeVisible()
  })

  test('transaction can click through to a contract', async ({ page }) => {
    const contract = await findV2TestContractWithResolutionType(
      cluster,
      'renewal',
    )

    // eslint-disable-next-line playwright/no-conditional-in-test
    const transactionID = contract?.confirmationTransactionID || 'invalid'

    await explorerApp.goTo('/tx/' + transactionID)
    await expectThenClick(
      page.getByRole('link', { name: 'C', exact: true }).first(),
    )

    await expect(
      page.getByTestId('entity-heading').getByText('Contract'),
    ).toBeVisible()
  })

  test('transaction can click through to an address', async ({ page }) => {
    const contract = await findV2TestContractWithResolutionType(
      cluster,
      'renewal',
    )

    // eslint-disable-next-line playwright/no-conditional-in-test
    const transactionID = contract?.confirmationTransactionID || 'invalid'

    await explorerApp.goTo('/tx/' + transactionID)
    await expectThenClick(page.getByText('Address').first())

    await expect(
      page.getByTestId('entity-heading').getByText('Address'),
    ).toBeVisible()
  })

  test('transaction can click through to an output', async ({ page }) => {
    const contract = await findV2TestContractWithResolutionType(
      cluster,
      'renewal',
    )

    // eslint-disable-next-line playwright/no-conditional-in-test
    const transactionID = contract?.confirmationTransactionID || 'invalid'

    await explorerApp.goTo('/tx/' + transactionID)
    await expectThenClick(
      page.getByRole('link', { name: 'SO', exact: true }).first(),
    )

    await expect(
      page.getByTestId('entity-heading').getByText('Output'),
    ).toBeVisible()
  })

  test('transaction displays the correct version', async ({ page }) => {
    const contract = await findV2TestContractWithResolutionType(
      cluster,
      'renewal',
    )

    // eslint-disable-next-line playwright/no-conditional-in-test
    const transactionID = contract?.confirmationTransactionID || 'invalid'

    await explorerApp.goTo('/tx/' + transactionID)

    await expect(
      page.getByTestId('explorer-transaction-version').getByText('v2'),
    ).toBeVisible()
  })
})

// V1
test.describe('v1', () => {
  test.beforeEach(async ({ page, context }) => {
    cluster = await startCluster({ context, testContracts: 'v1' })
    await exploredStabilization(cluster)
    explorerApp = new ExplorerApp(page)
  })

  test.afterEach(async () => {
    await teardownCluster()
  })

  test('transaction can be searched by id', async ({ page }) => {
    const testContract = await findV1TestContractWithStatus(cluster, 'active')

    // eslint-disable-next-line playwright/no-conditional-in-test
    const transactionID = testContract?.confirmationTransactionID || 'invalid'

    await explorerApp.goTo('/')
    await explorerApp.navigateBySearchBar(transactionID)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Transaction ' + transactionID.slice(0, 5)),
    ).toBeVisible()
  })

  test('transaction can be navigated to by id', async ({ page }) => {
    const testContract = await findV1TestContractWithStatus(cluster, 'active')

    // eslint-disable-next-line playwright/no-conditional-in-test
    const transactionID = testContract?.confirmationTransactionID || 'invalid'

    await explorerApp.goTo('/tx/' + transactionID)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Transaction ' + transactionID.slice(0, 5)),
    ).toBeVisible()
  })

  test('transaction can click through to a contract', async ({ page }) => {
    const testContract = await findV1TestContractWithStatus(cluster, 'active')

    // eslint-disable-next-line playwright/no-conditional-in-test
    const transactionID = testContract?.confirmationTransactionID || 'invalid'

    await explorerApp.goTo('/tx/' + transactionID)
    await expectThenClick(
      page.getByRole('link', { name: 'C', exact: true }).first(),
    )

    await expect(
      page.getByTestId('entity-heading').getByText('Contract'),
    ).toBeVisible()
  })

  test('transaction can click through to an address', async ({ page }) => {
    const testContract = await findV1TestContractWithStatus(cluster, 'active')

    // eslint-disable-next-line playwright/no-conditional-in-test
    const transactionID = testContract?.confirmationTransactionID || 'invalid'

    await explorerApp.goTo('/tx/' + transactionID)
    await expectThenClick(page.getByText('Address').first())

    await expect(
      page.getByTestId('entity-heading').getByText('Address'),
    ).toBeVisible()
  })

  test('transaction can click through to an output', async ({ page }) => {
    const testContract = await findV1TestContractWithStatus(cluster, 'active')

    // eslint-disable-next-line playwright/no-conditional-in-test
    const transactionID = testContract?.confirmationTransactionID || 'invalid'

    await explorerApp.goTo('/tx/' + transactionID)
    await expectThenClick(
      page.getByRole('link', { name: 'SO', exact: true }).first(),
    )

    await expect(
      page.getByTestId('entity-heading').getByText('Output'),
    ).toBeVisible()
  })

  test('transaction displays the correct version', async ({ page }) => {
    const testContract = await findV1TestContractWithStatus(cluster, 'active')

    // eslint-disable-next-line playwright/no-conditional-in-test
    const transactionID = testContract?.confirmationTransactionID || 'invalid'

    await explorerApp.goTo('/tx/' + transactionID)

    await expect(
      page.getByTestId('explorer-transaction-version').getByText('v1'),
    ).toBeVisible()
  })
})
