import { Page, expect } from '@playwright/test'
import { fillTextInputByName, step } from '@siafoundation/e2e'

export const login = step(
  'login',
  async ({
    page,
    address,
    password,
  }: {
    page: Page
    address: string
    password: string
  }) => {
    await page.goto('/login')
    await expect(page).toHaveTitle('walletd')
    await page.getByLabel('login settings').click()
    await page.getByRole('menuitem', { name: 'Show custom API' }).click()
    await fillTextInputByName(page, 'api', address)
    await fillTextInputByName(page, 'password', password)
    await page.locator('input[name=password]').press('Enter')
    await expect(page.getByTestId('navbar').getByText('Wallets')).toBeVisible()
  }
)
