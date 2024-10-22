import { test, expect } from '@playwright/test'
import { fillTextInputByName } from '@siafoundation/e2e'

test('homepage', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('explorer-identity-appName')).toBeVisible()
  await expect(page.getByTestId('explorer-identity-network')).toBeVisible()
})

test('look up and view a block by block number', async ({ page }) => {
  await page.goto('/')
  await fillTextInputByName(page, 'query', '60000')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('link').getByText('60,000')).toBeVisible()
  await expect(page.getByText('11 transactions')).toBeVisible()
  await expect(page.getByText('000000...fa54c1')).toBeVisible()
})
