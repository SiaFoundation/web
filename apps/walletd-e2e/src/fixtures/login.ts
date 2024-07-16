import { type Page, expect } from '@playwright/test'
import { fillTextInputByName } from './textInput'

export async function login({ page }: { page: Page }) {
  await page.goto('/login')
  await expect(page).toHaveTitle('walletd')
  await page.getByLabel('login settings').click()
  await page.getByRole('menuitem', { name: 'Show custom API' }).click()
  await fillTextInputByName(page, 'api', process.env.WALLETD_E2E_TEST_API_URL)
  await fillTextInputByName(
    page,
    'password',
    process.env.WALLETD_E2E_TEST_API_PASSWORD,
  )
  await page.locator('input[name=password]').press('Enter')
  await expect(page.getByTestId('navbar').getByText('Wallets')).toBeVisible()
}
