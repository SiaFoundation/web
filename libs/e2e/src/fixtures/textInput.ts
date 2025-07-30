import { Page, expect } from '@playwright/test'
import { step } from './step'

export const fillTextInputByName = step(
  'fill text input by name',
  async (page: Page, name: string, value: string, tabAfterFill = false) => {
    await page.locator(`input[name="${name}"]`).click()
    await page.locator(`input[name="${name}"]`).fill(value)
    if (tabAfterFill) {
      await page.locator(`input[name="${name}"]`).press('Tab')
    }
  },
)

export const expectTextInputByName = step(
  'expect text input by name',
  async (page: Page, name: string, value: string) => {
    await expect(page.locator(`input[name="${name}"]`)).toHaveValue(value)
  },
)

export const expectTextInputNotVisible = step(
  'expect text input not visible',
  async (page: Page, name: string) => {
    await expect(page.locator(`input[name="${name}"]`)).toBeHidden()
  },
)

export const expectTextInputByNameAttribute = step(
  'expect text input by name attribute',
  async (page: Page, name: string, value: string) => {
    await expect(page.locator(`input[name="${name}"]`)).toHaveAttribute(value)
  },
)

export const getTextInputValueByName = step(
  'get text input value by name',
  async (page: Page, name: string, waitForValue = true) => {
    if (waitForValue) {
      await expect(page.locator(`input[name="${name}"]`)).toHaveValue(/.*/)
    }
    return await page.locator(`input[name="${name}"]`).inputValue()
  },
)
