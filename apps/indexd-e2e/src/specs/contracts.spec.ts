import { test, expect } from '@playwright/test'
import { fillTextInputByName } from '@siafoundation/e2e'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { navigateToContracts } from '../fixtures/navigate'
import { buildContract, mockApiContracts } from '../fixtures/contracts'
import { confirmDialog, getRow, selectRow } from '../fixtures/table'

const contractA = buildContract({
  id: 'aa'.repeat(32),
  hostKey: `ed25519:${'11'.repeat(32)}`,
  state: 'active',
  good: true,
})
const contractB = buildContract({
  id: 'bb'.repeat(32),
  hostKey: `ed25519:${'22'.repeat(32)}`,
  state: 'expired',
  good: false,
})

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('list contracts', async ({ page }) => {
  await mockApiContracts({ page, contracts: [contractA, contractB] })
  await navigateToContracts(page)
  await expect(getRow(page, contractA.id.slice(0, 12))).toBeVisible()
  await expect(getRow(page, contractB.id.slice(0, 12))).toBeVisible()
  await expect(
    getRow(page, contractA.id.slice(0, 12)).getByText('active'),
  ).toBeVisible()
  await expect(
    getRow(page, contractB.id.slice(0, 12)).getByText('expired'),
  ).toBeVisible()
})

test('filter contracts by contract ID', async ({ page }) => {
  await mockApiContracts({ page, contracts: [contractA, contractB] })
  await navigateToContracts(page)
  await page.getByPlaceholder('Filter contracts').click()
  await page
    .getByRole('option', { name: 'Contracts filter by contract ID' })
    .click()
  const dialog = page.getByRole('dialog', {
    name: 'Filter contracts by contract ID',
  })
  await fillTextInputByName(page, 'contractID', contractA.id)
  await dialog.getByRole('button', { name: 'Apply filter' }).click()
  await expect(getRow(page, contractA.id.slice(0, 12))).toBeVisible()
  await expect(getRow(page, contractB.id.slice(0, 12))).toBeHidden()
})

test('delete a contract', async ({ page }) => {
  const { deleted } = await mockApiContracts({
    page,
    contracts: [contractA, contractB],
  })
  await navigateToContracts(page)
  await selectRow(page, contractA.id.slice(0, 12))
  await page.getByRole('button', { name: 'Delete', exact: true }).click()
  await confirmDialog(page, 'Delete')
  await expect(page.getByText('Deleted 1 contract')).toBeVisible()
  await expect(getRow(page, contractA.id.slice(0, 12))).toBeHidden()
  await expect(getRow(page, contractB.id.slice(0, 12))).toBeVisible()
  expect(deleted).toEqual([contractA.id])
})
