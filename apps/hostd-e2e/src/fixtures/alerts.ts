import { Page } from '@playwright/test'
import { maybeExpectAndReturn, step } from '@siafoundation/e2e'

export const getAlertRows = (page: Page) => {
  return page.getByTestId('alertsTable').locator('tbody').getByRole('row')
}

export const getAlertRowsAll = step('get alert rows', async (page: Page) => {
  return getAlertRows(page).all()
})

export const getAlertRowByIndex = step(
  'get alert row by index',
  async (page: Page, index: number, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      page
        .getByTestId('alertsTable')
        .locator('tbody')
        .getByRole('row')
        .nth(index),
      shouldExpect,
    )
  },
)
