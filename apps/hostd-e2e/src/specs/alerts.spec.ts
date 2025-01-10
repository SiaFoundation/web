import { test, expect, Page } from '@playwright/test'
import { navigateToAlerts, navigateToVolumes } from '../fixtures/navigate'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { Alert } from '@siafoundation/hostd-types'
import { getAlertRows } from '../fixtures/alerts'
import { createVolume, deleteVolume } from '../fixtures/volumes'
import fs from 'fs'
import os from 'os'
import { continueToClickUntil } from '@siafoundation/e2e'

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

test('filtering alerts', async ({ page }) => {
  await mockApiAlerts(page)
  await page.reload()

  await navigateToAlerts(page)

  // Check initial number of alerts.
  await expect(getAlertRows(page)).toHaveCount(2)

  // Verify alert content.
  await expect(page.getByText('Volume initialized')).toBeVisible()
  await expect(page.getByText('Volume warning')).toBeVisible()

  // Test filtering.
  await page.getByRole('button', { name: 'Info' }).click()
  await expect(getAlertRows(page)).toHaveCount(1)
})

test('dismissing alerts', async ({ page }) => {
  const name = 'my-new-volume'
  await navigateToVolumes({ page })
  await createVolume(page, name, dirPath)
  await navigateToAlerts(page)
  await expect(getAlertRows(page).getByText('Volume initialized')).toBeVisible()
  // Dismissing the alert too early will cause the alert to reappear
  // so maybe try to dismiss more than once.
  await continueToClickUntil(
    page.getByRole('button', { name: 'dismiss alert' }),
    page.getByText('There are currently no alerts.')
  )
  await navigateToVolumes({ page })
  await deleteVolume(page, name, dirPath)
})

async function mockApiAlerts(page: Page) {
  const alerts: Alert[] = [
    {
      id: 'c39d09ee61a5d1dd9ad97015a0e87e9286f765bbf109cafad936d5a1aa843e54',
      severity: 'info',
      message: 'Volume initialized',
      data: {
        elapsed: 95823333,
        target: 2623,
        volumeID: 3,
      },
      timestamp: '2025-01-10T10:17:52.365323-05:00',
    },
    {
      id: '93683b58d12c2de737a8849561b9f0dae07120eee3185f40da489d48585b416a',
      severity: 'warning',
      message: 'Volume warning',
      data: {
        elapsed: 257749500,
        targetSectors: 7868,
        volumeID: 2,
      },
      timestamp: '2025-01-10T10:17:18.754568-05:00',
    },
  ]
  await page.route('**/api/alerts', async (route) => {
    await route.fulfill({ json: alerts })
  })
}
