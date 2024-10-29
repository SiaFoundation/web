import { Locator, Page, expect } from '@playwright/test'
import { maybeExpectAndReturn, step } from '@siafoundation/e2e'

export const getHostRowById = step(
  'get host row by ID',
  async (page: Page, id: string, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      page.getByTestId('hostsTable').getByTestId(id),
      shouldExpect
    )
  }
)

export const getHostsSummaryRow = step(
  'get hosts summary row',
  async (page: Page, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      page.getByTestId('hostsTable').locator('thead').getByRole('row').nth(1),
      shouldExpect
    )
  }
)

export const getHostRowByIndex = step(
  'get host row by index',
  async (page: Page, index: number, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      page
        .getByTestId('hostsTable')
        .locator('tbody')
        .getByRole('row')
        .nth(index),
      shouldExpect
    )
  }
)

export const openHostContextMenu = step(
  'open host context menu',
  async (page: Page, name: string) => {
    const menu = page
      .getByTestId('hostsTable')
      .locator('tbody')
      .getByRole('row', { name })
      .getByRole('button')
      .first()
    await expect(menu).toBeVisible()
    return menu.click()
  }
)

export const openRowHostContextMenu = step(
  'open row host context menu',
  async (row: Locator) => {
    const menu = row.getByTestId('actions').getByRole('button').first()
    await expect(menu).toBeVisible()
    return menu.click()
  }
)
