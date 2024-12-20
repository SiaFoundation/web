import { test, expect } from '@playwright/test'
import { toggleColumnVisibility } from '@siafoundation/e2e'
import { navigateToContracts } from '../fixtures/navigate'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  getContractRowByIndex,
  getContractRows,
  getContractRowsAll,
  getContractsSummaryRow,
} from '../fixtures/contracts'
import { openManageListsDialog } from '../fixtures/hosts'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    hostdCount: 3,
  })
})

test.afterEach(async () => {
  await afterTest()
})

test('contracts prunable size', async ({ page }) => {
  await navigateToContracts({ page })

  // Ensure the prunable size column is visible.
  await toggleColumnVisibility(page, 'prunable size', true)

  // Check that the prunable summary is not visible.
  const summaryRow = await getContractsSummaryRow(page)
  const summaryRowCell = summaryRow.getByTestId('prunableSize')
  await expect(summaryRowCell).toBeVisible()
  await expect(summaryRowCell.getByRole('button')).toBeVisible()
  await expect(summaryRowCell.getByLabel('prunable size')).toBeHidden({
    timeout: 30_000,
  })

  // Check that the prunable size is not visible on the first row.
  const row1 = await getContractRowByIndex(page, 0)
  const row1Cell = row1.getByTestId('prunableSize')
  await expect(row1Cell).toBeVisible()
  await expect(row1Cell.getByRole('button')).toBeVisible()
  await expect(row1Cell.getByLabel('prunable size')).toBeHidden()

  // Fetch prunable size on the first row.
  await row1Cell.getByRole('button').click()

  // Check that the prunable size is visible on the first row but not the summary.
  await expect(row1Cell.getByLabel('prunable size')).toBeVisible()
  await expect(summaryRowCell.getByLabel('prunable size')).toBeHidden()

  // Fetch prunable size for all contracts.
  await summaryRowCell.getByRole('button').click()

  // Check that the prunable summary is visible.
  const summarySize = summaryRowCell.getByLabel('prunable size')
  await expect(summarySize).toBeVisible()

  // Check that the prunable size is visible for all contracts.
  const rows = await getContractRowsAll(page)
  for (const row of rows) {
    const prunableSize = row.getByLabel('prunable size')
    await expect(prunableSize).toBeVisible()
  }
})

test('contracts bulk delete', async ({ page }) => {
  await navigateToContracts({ page })
  const rows = await getContractRowsAll(page)
  await rows.at(0).click({ position: { x: 5, y: 5 } })
  await rows.at(-1).click({ modifiers: ['Shift'] })

  // Delete selected contracts.
  const menu = page.getByLabel('contract multi-select menu')
  await menu.getByLabel('delete selected contracts').click()
  const dialog = page.getByRole('dialog')
  await dialog.getByRole('button', { name: 'Delete' }).click()

  await expect(page.getByText('3 contracts deleted')).toBeVisible()
})

test('contracts bulk rescan', async ({ page }) => {
  await navigateToContracts({ page })
  const rows = await getContractRowsAll(page)
  await rows.at(0).click({ position: { x: 5, y: 5 } })
  await rows.at(-1).click({ modifiers: ['Shift'] })

  // Rescan selected hosts.
  const menu = page.getByLabel('contract multi-select menu')
  await menu.getByLabel('rescan selected hosts').click()
  await expect(page.getByText('rescanning 3 hosts')).toBeVisible()
})

test('contracts bulk allowlist', async ({ page }) => {
  await navigateToContracts({ page })
  const rows = await getContractRowsAll(page)
  await rows.at(0).click({ position: { x: 5, y: 5 } })
  await rows.at(-1).click({ modifiers: ['Shift'] })

  const menu = page.getByLabel('contract multi-select menu')
  const dialog = page.getByRole('dialog')

  // Add selected contract hosts to the allowlist.
  await menu.getByLabel('add host public keys to allowlist').click()
  await dialog.getByRole('button', { name: 'Add to allowlist' }).click()

  await openManageListsDialog(page)
  await expect(dialog.getByText('The blocklist is empty')).toBeVisible()
  await dialog.getByLabel('view allowlist').click()
  await expect(
    dialog.getByTestId('allowlistPublicKeys').getByTestId('item')
  ).toHaveCount(3)
  await dialog.getByLabel('close').click()

  await rows.at(0).click({ position: { x: 5, y: 5 } })
  await rows.at(-1).click({ modifiers: ['Shift'] })

  // Remove selected contract hosts from the allowlist.
  await menu.getByLabel('remove host public keys from allowlist').click()
  await dialog.getByRole('button', { name: 'Remove from allowlist' }).click()

  await openManageListsDialog(page)
  await expect(dialog.getByText('The blocklist is empty')).toBeVisible()
  await dialog.getByLabel('view allowlist').click()
  await expect(dialog.getByText('The allowlist is empty')).toBeVisible()
})

test('new contracts do not show a renewed from', async ({ page }) => {
  await navigateToContracts({ page })
  await expect(getContractRows(page).getByTestId('renewedFrom')).toBeHidden()
})
