import { Page, expect } from '@playwright/test'

export async function fillTextInputByName(
  page: Page,
  name: string,
  value: string
) {
  await page.locator(`input[name="${name}"]`).click()
  await page.locator(`input[name="${name}"]`).fill(value)
}

export async function expectTextInputByName(
  page: Page,
  name: string,
  value: string
) {
  await expect(page.locator(`input[name="${name}"]`)).toHaveValue(value)
}

export async function expectTextInputNotVisible(page: Page, name: string) {
  await expect(page.locator(`input[name="${name}"]`)).toBeHidden()
}

export async function expectTextInputVisible(page: Page, name: string) {
  await expect(page.locator(`input[name="${name}"]`)).toBeVisible()
}

export async function expectTextInputByNameAttribute(
  page: Page,
  name: string,
  value: string
) {
  await expect(page.locator(`input[name="${name}"]`)).toHaveAttribute(value)
}
