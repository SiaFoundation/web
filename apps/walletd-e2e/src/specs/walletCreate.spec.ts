import { test, expect } from '@playwright/test'
import { login } from '../fixtures/login'
import { createWallet } from '../fixtures/createWallet'
import {
  getMockScenarioSeedWallet,
  mockApiDefaults,
} from '@siafoundation/mock-walletd'

test('wallet create', async ({ page }) => {
  const mocks = getMockScenarioSeedWallet()
  const { newWallet, mnemonic } = mocks
  await mockApiDefaults({ page })
  await login({ page })
  await createWallet({ page, newWallet, mnemonic })
  await expect(page.locator(`span:text('${newWallet.name}')`)).toBeVisible()
  await page.locator(`span:text('${newWallet.name}')`).click()
  await expect(page.getByText('The wallet has no')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Addresses' })).toBeVisible()
})
