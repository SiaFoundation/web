import { Page, expect } from '@playwright/test'

export async function login({ page }: { page: Page }) {
  await page.goto('/')
  await expect(page).toHaveTitle('walletd')
  await page.getByLabel('login settings').click()
  await page.getByRole('menuitem', { name: 'Show custom API' }).click()
  await page.locator('input[name=api]').fill('https://walletd.local')
  await page.locator('input[name=api]').press('Tab')
  await page.locator('input[name=password]').fill('password')
  await page.locator('input[name=password]').press('Enter')
}
