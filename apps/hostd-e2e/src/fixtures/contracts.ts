import { expect, Page } from '@playwright/test'
import {
  maybeExpectAndReturn,
  step,
  toggleColumnVisibility,
} from '@siafoundation/e2e'

export const getContractRowById = step(
  'get contract row by ID',
  async (page: Page, id: string) => {
    return page.getByTestId('contractsTable').getByTestId(id)
  }
)

export const getContractsSummaryRow = step(
  'get contracts summary row',
  async (page: Page) => {
    return page
      .getByTestId('contractsTable')
      .locator('thead')
      .getByRole('row')
      .nth(1)
  }
)

export function locateContractRowByIndex(page: Page, index: number) {
  return page
    .getByTestId('contractsTable')
    .locator('tbody')
    .getByRole('row')
    .nth(index)
}

export const getContractRowByIndex = step(
  'get contract row by index',
  async (page: Page, index: number, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      locateContractRowByIndex(page, index),
      shouldExpect
    )
  }
)

export const expectContractRowByIndex = step(
  'expect contract row by index',
  async (page: Page, index: number) => {
    return expect(
      page
        .getByTestId('contractsTable')
        .locator('tbody')
        .getByRole('row')
        .nth(index)
    ).toBeVisible()
  }
)

export function getContractRows(page: Page) {
  return page.getByTestId('contractsTable').locator('tbody').getByRole('row')
}

export const getContractRowsAll = step(
  'get contract rows',
  async (page: Page) => {
    return getContractRows(page).all()
  }
)

export const setVersionMode = step(
  'set version mode',
  async (page: Page, version: 'v1' | 'v2') => {
    await page.getByLabel('contracts version mode').click()
    await page.getByText(`View ${version} contracts`).click()
  }
)

export const expectVersionMode = step(
  'expect version mode',
  async (page, version: 'v1' | 'v2') => {
    await toggleColumnVisibility(page, 'version', true)
    await expect(page.getByLabel('contracts version mode')).toHaveText(version)
    await expect(
      locateContractRowByIndex(page, 0)
        .getByTestId('version')
        .getByText(version)
    ).toBeVisible()
  }
)
