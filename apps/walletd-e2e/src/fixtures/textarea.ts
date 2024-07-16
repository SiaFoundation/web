import { type Page, expect } from '@playwright/test'

export async function clickTextareaByName(page: Page, name: string) {
  await page.locator(`textarea[name="${name}"]`).click()
}

export async function fillTextareaByName(
  page: Page,
  name: string,
  value: string,
  tabAfterFill = false,
) {
  await page.locator(`textarea[name="${name}"]`).click()
  await page.locator(`textarea[name="${name}"]`).fill(value)
  if (tabAfterFill) {
    await page.locator(`textarea[name="${name}"]`).press('Tab')
  }
}

export async function expectTextareaByName(
  page: Page,
  name: string,
  value: string,
) {
  await expect(page.locator(`textarea[name="${name}"]`)).toHaveValue(value)
}

export async function expectTextareaNotVisible(page: Page, name: string) {
  await expect(page.locator(`textarea[name="${name}"]`)).toBeHidden()
}

export async function expectTextareaByNameAttribute(
  page: Page,
  name: string,
  value: string,
) {
  await expect(page.locator(`textarea[name="${name}"]`)).toHaveAttribute(value)
}
