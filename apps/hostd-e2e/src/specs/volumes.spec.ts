import { expect, test } from '@playwright/test'
import { navigateToVolumes } from '../fixtures/navigate'
import {
  createVolume,
  deleteVolume,
  openVolumeContextMenu,
} from '../fixtures/volumes'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import fs from 'fs'
import os from 'os'
import { fillTextInputByName } from '@siafoundation/e2e'

let dirPath = '/'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
  // Create a temporary directory.
  dirPath = fs.mkdtempSync(process.env.GITHUB_WORKSPACE || os.tmpdir())
})

test.afterEach(async () => {
  await afterTest()
  fs.rmSync(dirPath, { recursive: true })
})

test('can create and delete a volume', async ({ page }) => {
  const name = 'my-new-volume'
  await navigateToVolumes({ page })
  await createVolume(page, name, dirPath)
  await deleteVolume(page, name, dirPath)
})

test('can resize volume', async ({ page }) => {
  const name = 'my-new-volume'
  await navigateToVolumes({ page })
  await createVolume(page, name, dirPath)
  await openVolumeContextMenu(page, `${dirPath}/${name}`)
  await page.getByText('Resize').click()
  await fillTextInputByName(page, 'size', '1300')
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByText('Must be between 10.00 GB')).toBeVisible()
  await fillTextInputByName(page, 'size', '13')
  await expect(dialog.getByText('Must be between 10.00 GB')).toBeHidden()
  await dialog.locator('input[name=size]').press('Enter')
  await expect(dialog).toBeHidden()
  await expect(page.getByText('Volume resizing')).toBeVisible()
  await expect(page.getByText('resizing')).toBeVisible()
})
