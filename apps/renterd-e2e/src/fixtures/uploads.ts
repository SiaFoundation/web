import { Page, expect } from '@playwright/test'
import { maybeExpectAndReturn, step } from '@siafoundation/e2e'

export const uploadInList = step(
  'expect upload in list',
  async (page: Page, id: string, timeout?: number) => {
    await expect(page.getByTestId('uploadsTable').getByTestId(id)).toBeVisible({
      timeout,
    })
  }
)

export const uploadNotInList = step(
  'expect upload not in list',
  async (page: Page, id: string) => {
    await expect(page.getByTestId('uploadsTable').getByTestId(id)).toBeHidden()
  }
)

export const getUploadRowById = step(
  'get upload row by ID',
  async (page: Page, id: string, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      page.getByTestId('uploadsTable').getByTestId(id),
      shouldExpect
    )
  }
)

export const expectUploadRowById = step(
  'expect upload row by ID',
  async (page: Page, id: string) => {
    return expect(
      page.getByTestId('uploadsTable').getByTestId(id)
    ).toBeVisible()
  }
)
