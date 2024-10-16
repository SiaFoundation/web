import { Locator, Page } from '@playwright/test'

export function getHostRowById(page: Page, id: string) {
  return page.getByTestId('hostsTable').getByTestId(id)
}

export function getHostsSummaryRow(page: Page) {
  return page.getByTestId('hostsTable').locator('thead').getByRole('row').nth(1)
}

export async function getHostRowByIndex(page: Page, index: number) {
  return page
    .getByTestId('hostsTable')
    .locator('tbody')
    .getByRole('row')
    .nth(index)
}

export async function getHostRows(page: Page) {
  return page.getByTestId('hostsTable').locator('tbody').getByRole('row').all()
}

export async function openHostContextMenu(page: Page, name: string) {
  await page
    .getByTestId('hostsTable')
    .locator('tbody')
    .getByRole('row', { name })
    .getByRole('button')
    .first()
    .click()
}

export async function openRowHostContextMenu(row: Locator) {
  await row.getByTestId('actions').getByRole('button').first().click()
}
