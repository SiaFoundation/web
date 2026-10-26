import { test, expect } from '@playwright/test'
import { Alert } from '@siafoundation/indexd-types'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { navigateToAlerts } from '../fixtures/navigate'
import { mockApiAlerts } from '../fixtures/alerts'
import { getRow, openRow, selectRow } from '../fixtures/table'

const lostSectorsAlert: Alert = {
  id: 'aa'.repeat(32),
  severity: 'critical',
  message: 'Hosts lost sectors',
  data: {
    hostKeys: [`ed25519:${'11'.repeat(32)}`],
    hint: 'The hosts may have lost data.',
  },
  timestamp: '2026-01-01T00:00:00Z',
}
const infoAlert: Alert = {
  id: 'bb'.repeat(32),
  severity: 'info',
  message: 'Maintenance completed',
  timestamp: '2026-01-01T00:00:00Z',
}

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('list alerts', async ({ page }) => {
  await mockApiAlerts({ page, alerts: [lostSectorsAlert, infoAlert] })
  await navigateToAlerts(page)
  await expect(
    getRow(page, 'Hosts lost sectors').getByText('critical'),
  ).toBeVisible()
  await expect(
    getRow(page, 'Maintenance completed').getByText('info'),
  ).toBeVisible()
})

test('view and dismiss an alert', async ({ page }) => {
  const { dismissed } = await mockApiAlerts({
    page,
    alerts: [lostSectorsAlert, infoAlert],
  })
  await navigateToAlerts(page)
  await openRow(page, 'Hosts lost sectors')
  await expect(page.getByText('The hosts may have lost data.')).toBeVisible()

  await page.getByRole('button', { name: 'Dismiss alert' }).click()
  await expect(page.getByText('Alert dismissed')).toBeVisible()
  await expect(getRow(page, 'Hosts lost sectors')).toBeHidden()
  await expect(getRow(page, 'Maintenance completed')).toBeVisible()
  expect(dismissed).toEqual([lostSectorsAlert.id])
})

test('dismiss selected alerts', async ({ page }) => {
  const { dismissed } = await mockApiAlerts({
    page,
    alerts: [lostSectorsAlert, infoAlert],
  })
  await navigateToAlerts(page)
  await selectRow(page, 'Hosts lost sectors')
  await selectRow(page, 'Maintenance completed')
  await page.getByRole('button', { name: 'Dismiss alerts' }).click()
  await expect(page.getByText('Alerts dismissed')).toBeVisible()
  await expect(page.getByText('There are currently no alerts.')).toBeVisible()
  expect(dismissed.sort()).toEqual([lostSectorsAlert.id, infoAlert.id].sort())
})
