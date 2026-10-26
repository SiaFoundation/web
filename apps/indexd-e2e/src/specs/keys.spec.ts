import { test, expect } from '@playwright/test'
import { fillSelectInputByName, fillTextInputByName } from '@siafoundation/e2e'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { navigateToKeys, navigateToQuotas } from '../fixtures/navigate'
import { createKey } from '../fixtures/keys'
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

test('create a connect key', async ({ page }) => {
  await navigateToKeys(page)
  await createKey(page, { description: 'E2E key', quota: 'default' })

  const row = getRow(page, 'E2E key')
  await expect(row.getByRole('cell', { name: 'default' })).toBeVisible()
  // Remaining uses start at the quota's total uses.
  await expect(row.getByRole('cell', { name: '5', exact: true })).toBeVisible()
})

test('edit a connect key', async ({ page }) => {
  await navigateToQuotas(page)
  await createQuota(page, e2eQuota)
  await navigateToKeys(page)
  await createKey(page, { description: 'E2E key', quota: 'default' })

  await openRow(page, 'E2E key')
  await fillSelectInputByName(page, 'quota', 'e2e-quota')
  await fillTextInputByName(page, 'description', 'Edited key')
  await saveSidePanel(page, 'description')
  await expect(page.getByText('Key updated')).toBeVisible()

  // The changes persist across a reload.
  await page.reload()
  const row = getRow(page, 'Edited key')
  await expect(row.getByRole('cell', { name: 'e2e-quota' })).toBeVisible()
})

test('reassign the quota of multiple connect keys', async ({ page }) => {
  await navigateToQuotas(page)
  await createQuota(page, e2eQuota)
  await navigateToKeys(page)
  await createKey(page, { description: 'E2E key 1', quota: 'default' })
  await createKey(page, { description: 'E2E key 2', quota: 'default' })
  await closeSidePanel(page)

  await selectRow(page, 'E2E key 1')
  await selectRow(page, 'E2E key 2')
  await expect(page.getByText('Selected keys (2)')).toBeVisible()
  await page.getByRole('button', { name: 'Reassign quota' }).click()
  const dialog = page.getByRole('dialog', { name: 'Reassign quota' })
  await fillSelectInputByName(page, 'quota', 'e2e-quota')
  await dialog.getByRole('button', { name: 'Reassign quota' }).click()
  await expect(
    page.getByText('Reassigned 2 keys to quota "e2e-quota"'),
  ).toBeVisible()

  for (const description of ['E2E key 1', 'E2E key 2']) {
    await expect(
      getRow(page, description).getByRole('cell', { name: 'e2e-quota' }),
    ).toBeVisible()
  }
})

test('delete a connect key', async ({ page }) => {
  await navigateToKeys(page)
  await createKey(page, { description: 'E2E key', quota: 'default' })
  await closeSidePanel(page)

  await selectRow(page, 'E2E key')
  await page.getByRole('button', { name: 'Delete', exact: true }).click()
  await confirmDialog(page, 'Delete')
  await expect(page.getByText('Deleted 1 key')).toBeVisible()
  await expect(getRow(page, 'E2E key')).toBeHidden()
  await expect(page.getByText('There are no keys yet.')).toBeVisible()
})
