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
    await expect(page).toHaveTitle('indexd')
    await page.getByLabel('login settings').click()
    await page.getByRole('menuitem', { name: 'Show custom API' }).click()
    // The settings menu occasionally stays open after selecting the item. An
    // open menu traps focus, so the form would never be submitted.
    const menu = page.getByRole('menu')
    if (await menu.isVisible()) {
      await page.keyboard.press('Escape')
    }
    await expect(menu).toBeHidden()
    await fillTextInputByName(page, 'api', address)
    await fillTextInputByName(page, 'password', password)
    await page.locator('input[name=password]').press('Enter')
    // The indexd pages do not set a navbar title, so check the route and the
    // sidenav instead.
    await expect(page).toHaveURL(/\/hosts/)
    await expect(page.getByTestId('sidenav').getByLabel('Hosts')).toBeVisible()
  },
)
