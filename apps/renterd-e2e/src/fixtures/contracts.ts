import { Page } from '@playwright/test'

export function getContractRowById(page: Page, id: string) {
  return page.getByTestId('contractsTable').getByTestId(id)
}

export function getContractsSummaryRow(page: Page) {
  return page
    .getByTestId('contractsTable')
    .locator('thead')
    .getByRole('row')
    .nth(1)
}

export function getContractRowByIndex(page: Page, index: number) {
  return page
    .getByTestId('contractsTable')
    .locator('tbody')
    .getByRole('row')
    .nth(index)
}

export async function getContractRows(page: Page) {
  return page
    .getByTestId('contractsTable')
    .locator('tbody')
    .getByRole('row')
    .all()
}
