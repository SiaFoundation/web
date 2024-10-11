import { test, expect } from '@playwright/test'
import { fillTextInputByName } from '@siafoundation/e2e'

test('homepage', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('siascan')).toBeVisible()
  await expect(page.getByText('zen')).toBeVisible()
})

test('look up and view a block by block number', async ({ page }) => {
  await page.goto('/')
  await fillTextInputByName(page, 'query', '3000')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('link').getByText('3,000')).toBeVisible()
  await expect(page.getByText('1 transactions')).toBeVisible()
  await expect(page.getByText('000000...647f7f')).toBeVisible()
})
