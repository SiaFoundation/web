import { Page, expect } from '@playwright/test'
import { maybeExpectAndReturn, step } from '@siafoundation/e2e'

export const uploadInList = step(
  'expect upload in list',
  async (page: Page, id: string, timeout?: number) => {
    await expect(getUploadsTable(page).getByTestId(id)).toBeVisible({
      timeout,
    })
  },
)

export const uploadNotInList = step(
  'expect upload not in list',
  async (page: Page, id: string) => {
    await expect(getUploadsTable(page).getByTestId(id)).toBeHidden()
  },
)

export const getUploadRowById = step(
  'get upload row by ID',
  async (page: Page, id: string, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      getUploadsTable(page).getByTestId(id),
      shouldExpect,
    )
  },
)

export function getUploadsTable(page: Page) {
  return page.getByTestId('uploadsTable')
}

export function getUploadRows(page: Page) {
  return getUploadsTable(page).locator('tbody').getByRole('row')
}

export const expectUploadRowById = step(
  'expect upload row by ID',
  async (page: Page, id: string) => {
    return expect(getUploadsTable(page).getByTestId(id)).toBeVisible()
  },
)
