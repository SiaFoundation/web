import { test, expect } from '@playwright/test'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  fillTextInputByName,
  openCmdkMenu,
  setSwitchByLabel,
} from '@siafoundation/e2e'
import fs from 'fs'
import jszip from 'jszip'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('generating a bug report', async ({ page }) => {
  const cmdk = await openCmdkMenu(page)
  await fillTextInputByName(page, 'cmdk-input', 'generate a bug report')
  await expect(cmdk.locator('div[cmdk-item]')).toHaveCount(1)
  await cmdk
    .locator('div[cmdk-item]')
    .getByText('generate a bug report')
    .click()
  const dialog = page.getByRole('dialog', {
    name: 'Generate a bug report',
  })

  // Wait for the download event and capture it.
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    dialog.getByRole('button', { name: 'Generate' }).click(),
  ])

  // Check if the download file has the correct name.
  const downloadPath = await download.path()
  expect(download.suggestedFilename()).toBe('renterd-debug-report.zip')

  // Verify contents of the zip.
  const zipBuffer = fs.readFileSync(downloadPath)
  const zip = await jszip.loadAsync(zipBuffer)
  const fileNames = Object.keys(zip.files)
  expect(fileNames).toContain('contracts.json')
  expect(fileNames).toContain('alerts.json')
  expect(fileNames).toContain('autopilot.json')
  expect(fileNames).toContain('gouging.json')
  expect(fileNames).toContain('upload.json')
  expect(fileNames).toContain('pinned.json')

  // Check the contents is json.
  const alertsFileContent = await zip.file('alerts.json').async('string')
  expect(alertsFileContent).toContain('{')

  // Disabled some metadata and regenerate.
  await setSwitchByLabel(page, 'autopilot', false)
  await setSwitchByLabel(page, 'gouging', false)

  // Wait for the download event and capture it.
  const [download2] = await Promise.all([
    page.waitForEvent('download'),
    dialog.getByRole('button', { name: 'Generate' }).click(),
  ])

  // Check if the download file has the correct name.
  const downloadPath2 = await download2.path()
  expect(download2.suggestedFilename()).toBe('renterd-debug-report.zip')

  // Verify contents of the zip.
  const zipBuffer2 = fs.readFileSync(downloadPath2)
  const zip2 = await jszip.loadAsync(zipBuffer2)
  const fileNames2 = Object.keys(zip2.files)
  expect(fileNames2).toContain('contracts.json')
  expect(fileNames2).toContain('alerts.json')
  expect(fileNames2).not.toContain('autopilot.json')
  expect(fileNames2).not.toContain('gouging.json')
  expect(fileNames2).toContain('upload.json')
  expect(fileNames2).toContain('pinned.json')
})
