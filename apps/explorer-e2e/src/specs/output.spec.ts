import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { Cluster, startCluster } from '../fixtures/cluster'
import { teardownCluster } from '@siafoundation/clusterd'
import { exploredStabilization } from '../helpers/exploredStabilization'
import { findTestOutput } from '../helpers/findTestOutput'
import { humanSiacoin } from '@siafoundation/units'

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

  test('output can be searched by id', async ({ page }) => {
    const output = await findTestOutput(cluster, 'v2')

    await explorerApp.goTo('/')
    await explorerApp.navigateBySearchBar(output.id)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Output ' + output.id.slice(0, 6))
    ).toBeVisible()
  })

  test('output can be directly navigated to by id', async ({ page }) => {
    const output = await findTestOutput(cluster, 'v2')

    await explorerApp.goTo('/output/' + output.id)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Output ' + output.id.slice(0, 6))
    ).toBeVisible()
  })

  test('output displays the correct data', async ({ page }) => {
    const output = await findTestOutput(cluster, 'v2')

    await explorerApp.goTo('/output/' + output.id)

    await expect(
      page.getByText(output.siacoinOutput.address.slice(0, 6))
    ).toBeVisible()
    await expect(
      page.getByText(humanSiacoin(output.siacoinOutput.value))
    ).toBeVisible()
  })

  test('output can navigate through to an address', async ({ page }) => {
    const output = await findTestOutput(cluster, 'v2')

    await explorerApp.goTo('/output/' + output.id)

    await page.getByText(output.siacoinOutput.address.slice(0, 6)).click()

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText(`Address ${output.siacoinOutput.address.slice(0, 6)}`)
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

  test('output can be searched by id', async ({ page }) => {
    const output = await findTestOutput(cluster, 'v1')

    await explorerApp.goTo('/')
    await explorerApp.navigateBySearchBar(output.id)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Output ' + output.id.slice(0, 6))
    ).toBeVisible()
  })

  test('output can be directly navigated to by id', async ({ page }) => {
    const output = await findTestOutput(cluster, 'v1')

    await explorerApp.goTo('/output/' + output.id)

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText('Output ' + output.id.slice(0, 6))
    ).toBeVisible()
  })

  test('output displays the correct data', async ({ page }) => {
    const output = await findTestOutput(cluster, 'v1')

    await explorerApp.goTo('/output/' + output.id)

    await expect(
      page.getByText(output.siacoinOutput.address.slice(0, 6))
    ).toBeVisible()
    await expect(
      page.getByText(humanSiacoin(output.siacoinOutput.value))
    ).toBeVisible()
  })

  test('output can navigate through to an address', async ({ page }) => {
    const output = await findTestOutput(cluster, 'v1')

    await explorerApp.goTo('/output/' + output.id)

    await page.getByText(output.siacoinOutput.address.slice(0, 6)).click()

    await expect(
      page
        .getByTestId('entity-heading')
        .getByText(`Address ${output.siacoinOutput.address.slice(0, 6)}`)
    ).toBeVisible()
  })
})
