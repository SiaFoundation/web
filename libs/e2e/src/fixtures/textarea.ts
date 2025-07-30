import { Page, expect } from '@playwright/test'
import { step } from './step'

export const clickTextareaByName = step(
  'click textarea by name',
  async (page: Page, name: string) => {
    await page.locator(`textarea[name="${name}"]`).click()
  },
)

export const fillTextareaByName = step(
  'fill textarea by name',
  async (page: Page, name: string, value: string, tabAfterFill = false) => {
    await page.locator(`textarea[name="${name}"]`).click()
    await page.locator(`textarea[name="${name}"]`).fill(value)
    if (tabAfterFill) {
      await page.locator(`textarea[name="${name}"]`).press('Tab')
    }
  },
)

export const expectTextareaByName = step(
  'expect textarea by name',
  async (page: Page, name: string, value: string) => {
    await expect(page.locator(`textarea[name="${name}"]`)).toHaveValue(value)
  },
)

export const expectTextareaNotVisible = step(
  'expect textarea not visible',
  async (page: Page, name: string) => {
    await expect(page.locator(`textarea[name="${name}"]`)).toBeHidden()
  },
)

export const expectTextareaByNameAttribute = step(
  'expect textarea by name attribute',
  async (page: Page, name: string, value: string) => {
    await expect(page.locator(`textarea[name="${name}"]`)).toHaveAttribute(
      value,
    )
  },
)
