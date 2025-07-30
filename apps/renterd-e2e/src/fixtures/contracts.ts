import { Page } from '@playwright/test'
import { maybeExpectAndReturn, step } from '@siafoundation/e2e'

export const getContractRowById = step(
  'get contract row by ID',
  async (page: Page, id: string) => {
    return page.getByTestId('contractsTable').getByTestId(id)
  },
)

export const getContractsSummaryRow = step(
  'get contracts summary row',
  async (page: Page) => {
    return page
      .getByTestId('contractsTable')
      .locator('thead')
      .getByRole('row')
      .nth(1)
  },
)

export const getContractRowByIndex = step(
  'get contract row by index',
  async (page: Page, index: number, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      page
        .getByTestId('contractsTable')
        .locator('tbody')
        .getByRole('row')
        .nth(index),
      shouldExpect,
    )
  },
)

export function getContractRows(page: Page) {
  return page.getByTestId('contractsTable').locator('tbody').getByRole('row')
}

export const getContractRowsAll = step(
  'get contract rows',
  async (page: Page) => {
    return getContractRows(page).all()
  },
)
