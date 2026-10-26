import { test, expect } from '@playwright/test'
import { fillTextInputByName } from '@siafoundation/e2e'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { navigateToQuotas } from '../fixtures/navigate'
import { createQuota, e2eQuota } from '../fixtures/quotas'
import {
  closeSidePanel,
  confirmDialog,
  getRow,
  openRow,
  saveSidePanel,
  selectRow,
} from '../fixtures/table'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('create a quota', async ({ page }) => {
  await navigateToQuotas(page)
  await createQuota(page, e2eQuota)

  const row = getRow(page, 'e2e-quota')
  await expect(row.getByRole('cell', { name: 'E2E quota' })).toBeVisible()
  await expect(row.getByRole('cell', { name: '50.00 GB' })).toBeVisible()
  await expect(row.getByRole('cell', { name: '7', exact: true })).toBeVisible()
  await expect(row.getByRole('cell', { name: '2.00 GB' })).toBeVisible()
})

test('edit a quota', async ({ page }) => {
  await navigateToQuotas(page)
  await createQuota(page, e2eQuota)

  await openRow(page, 'e2e-quota')
  await fillTextInputByName(page, 'description', 'Edited quota')
  await fillTextInputByName(page, 'maxPinnedDataGB', '75')
  await fillTextInputByName(page, 'totalUses', '9')
  await saveSidePanel(page, 'totalUses')
  await expect(page.getByText('Quota updated')).toBeVisible()

  // The changes persist across a reload.
  await page.reload()
  const row = getRow(page, 'e2e-quota')
  await expect(row.getByRole('cell', { name: 'Edited quota' })).toBeVisible()
  await expect(row.getByRole('cell', { name: '75.00 GB' })).toBeVisible()
  await expect(row.getByRole('cell', { name: '9', exact: true })).toBeVisible()
})

test('delete a quota', async ({ page }) => {
  await navigateToQuotas(page)
  await createQuota(page, e2eQuota)

  await closeSidePanel(page)
  await selectRow(page, 'e2e-quota')
  await page.getByRole('button', { name: 'Delete', exact: true }).click()
  await confirmDialog(page, 'Delete')
  await expect(page.getByText('Deleted 1 quota')).toBeVisible()
  await expect(getRow(page, 'e2e-quota')).toBeHidden()
  // The default quota is untouched.
  await expect(getRow(page, 'default')).toBeVisible()
})
