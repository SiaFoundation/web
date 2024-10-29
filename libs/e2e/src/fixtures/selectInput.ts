import { Page, expect } from '@playwright/test'
import { step } from './step'

export const fillSelectInputByName = step(
  'fill select input by name',
  async (page: Page, name: string, value: string) => {
    await page.locator(`select[name="${name}"]`).click()
    await page.locator(`select[name="${name}"]`).selectOption(value)
  }
)

export const expectSelectInputByName = step(
  'expect select input by name',
  async (page: Page, name: string, value: string) => {
    await expect(page.locator(`select[name="${name}"]`)).toHaveValue(value)
  }
)

export const expectSelectInputByNameAttribute = step(
  'expect select input by name attribute',
  async (page: Page, name: string, value: string) => {
    await expect(page.locator(`select[name="${name}"]`)).toHaveAttribute(value)
  }
)
