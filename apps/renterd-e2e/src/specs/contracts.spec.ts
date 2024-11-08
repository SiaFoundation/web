import { test, expect } from '@playwright/test'
import { toggleColumnVisibility } from '@siafoundation/e2e'
import { navigateToContracts } from '../fixtures/navigate'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  getContractRowByIndex,
  getContractRows,
  getContractsSummaryRow,
} from '../fixtures/contracts'

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
  const rows = await getContractRows(page)
  for (const row of rows) {
    const prunableSize = row.getByLabel('prunable size')
    await expect(prunableSize).toBeVisible()
  }
})
