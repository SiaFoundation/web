import { Page, expect } from '@playwright/test'

export async function fillSelectInputByName(
  page: Page,
  name: string,
  value: string
) {
  await page.locator(`select[name="${name}"]`).click()
  await page.locator(`select[name="${name}"]`).selectOption(value)
}

export async function expectSelectInputByName(
  page: Page,
  name: string,
  value: string
) {
  await expect(page.locator(`select[name="${name}"]`)).toHaveValue(value)
}

export async function expectSelectInputByNameAttribute(
  page: Page,
  name: string,
  value: string
) {
  await expect(page.locator(`select[name="${name}"]`)).toHaveAttribute(value)
}
