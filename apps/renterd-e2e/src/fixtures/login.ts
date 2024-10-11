import { Page, expect } from '@playwright/test'
import { fillTextInputByName } from '@siafoundation/e2e'

export async function login({
  page,
  address,
  password,
}: {
  page: Page
  address: string
  password: string
}) {
  await page.goto('/login')
  await expect(page).toHaveTitle('renterd')
  await page.getByLabel('login settings').click()
  await page.getByRole('menuitem', { name: 'Show custom API' }).click()
  await fillTextInputByName(page, 'api', address)
  await fillTextInputByName(page, 'password', password)
  await page.locator('input[name=password]').press('Enter')
  await expect(page.getByTestId('navbar').getByText('Buckets')).toBeVisible()
}
