import { expect, test } from '@playwright/test'
import { navigateToVolumes, navigateToAlerts } from '../fixtures/navigate'
import {
  createVolume,
  deleteVolume,
  expectVolumeRowByIndex,
  getVolumeRows,
  openVolumeContextMenu,
  volumeInList,
} from '../fixtures/volumes'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import fs from 'fs'
import os from 'os'
import { fillTextInputByName } from '@siafoundation/e2e'
import path from 'path'
import { getAlertRows } from '../fixtures/alerts'

let dirPath = '/'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
  // Create a temporary directory.
  dirPath = fs.mkdtempSync(process.env.GITHUB_WORKSPACE || os.tmpdir())
})

test.afterEach(async () => {
  await afterTest()
  try {
    fs.rmSync(dirPath, { recursive: true })
  } catch (e) {
    console.error(e)
  }
})

test('can create and delete a volume', async ({ page }) => {
  const name = 'my-new-volume'
  await navigateToVolumes({ page })
  await createVolume(page, name, dirPath)
  await navigateToAlerts(page)
  await expect(getAlertRows(page).getByText('Volume initialized')).toBeVisible()
  await navigateToVolumes({ page })
  await deleteVolume(page, name, dirPath)
})

test('can resize volume', async ({ page }) => {
  const name = 'my-new-volume'
  await navigateToVolumes({ page })
  await createVolume(page, name, dirPath)
  await openVolumeContextMenu(page, `${dirPath}/${name}`)
  await page.getByText('Resize').click()
  await fillTextInputByName(page, 'size', '1300000')
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByText('Must be between 10.00 GB')).toBeVisible()
  await fillTextInputByName(page, 'size', '13')
  await expect(dialog.getByText('Must be between 10.00 GB')).toBeHidden()
  await dialog.locator('input[name=size]').press('Enter')
  await expect(dialog).toBeHidden()
  await expect(page.getByText('Volume resizing')).toBeVisible()
  await expect(page.getByText('resizing')).toBeVisible()
})

test('paginating volumes with known total and client side pagination', async ({
  page,
}) => {
  await navigateToVolumes({ page })
  // The cluster creates an initial volume so the following is the second volume.
  await createVolume(page, 'v2', dirPath)
  await createVolume(page, 'v3', dirPath)
  const url = page.url()
  await page.goto(url + '?limit=1')

  const first = page.getByRole('button', { name: 'go to first page' })
  const previous = page.getByRole('button', { name: 'go to previous page' })
  const next = page.getByRole('button', { name: 'go to next page' })
  const last = page.getByRole('button', { name: 'go to last page' })
  await expect(getVolumeRows(page).getByText('sia-cluster')).toBeVisible()
  await expect(first).toBeDisabled()
  await expect(previous).toBeDisabled()
  await expect(next).toBeEnabled()
  await expect(last).toBeEnabled()
  await next.click()
  await volumeInList(page, getVolumePath(dirPath, 'v2'))
  await expect(first).toBeEnabled()
  await expect(previous).toBeEnabled()
  await expect(next).toBeEnabled()
  await expect(last).toBeEnabled()
  await next.click()
  await volumeInList(page, getVolumePath(dirPath, 'v3'))
  await expect(first).toBeEnabled()
  await expect(previous).toBeEnabled()
  await expect(next).toBeDisabled()
  await expect(last).toBeDisabled()
})

test('viewing a page with no data shows the correct empty state', async ({
  page,
}) => {
  await navigateToVolumes({ page })
  // The cluster creates an initial volume so the following is the second volume.
  await createVolume(page, 'v2', dirPath)
  const url = page.url()
  await page.goto(url + '?limit=1')

  const first = page.getByRole('button', { name: 'go to first page' })
  const previous = page.getByRole('button', { name: 'go to previous page' })
  const next = page.getByRole('button', { name: 'go to next page' })
  const last = page.getByRole('button', { name: 'go to last page' })
  await expect(getVolumeRows(page).getByText('sia-cluster')).toBeVisible()
  await expect(first).toBeDisabled()
  await expect(previous).toBeDisabled()
  await expect(next).toBeEnabled()
  await expect(last).toBeEnabled()
  await next.click()
  await volumeInList(page, getVolumePath(dirPath, 'v2'))
  await expect(first).toBeEnabled()
  await expect(previous).toBeEnabled()
  await expect(next).toBeDisabled()
  await expect(last).toBeDisabled()

  await page.goto(url + '?limit=1&offset=2')

  await expect(
    page.getByText('No data on this page, reset pagination to continue.'),
  ).toBeVisible()
  await expect(page.getByText('Back to first page')).toBeVisible()
  await page.getByText('Back to first page').click()
  // Ensure we are now seeing rows of data.
  await expectVolumeRowByIndex(page, 0)
  await expect(first).toBeDisabled()
  await expect(previous).toBeDisabled()
  await expect(next).toBeEnabled()
  await expect(last).toBeEnabled()
})

function getVolumePath(dirPath: string, name: string) {
  return path.join(dirPath, name)
}
