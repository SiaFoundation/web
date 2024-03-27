import { test, expect } from '@playwright/test'
import { mockApiDefaults } from '../mocks/mock'
import { login } from '../fixtures/login'
import { createWallet } from '../fixtures/createWallet'

const seed =
  'credit tonight gauge army noodle reopen pepper property try mom taste solid'

const newWallet = {
  id: '100',
  name: 'new wallet 1',
  description: 'wallet description',
  dateCreated: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
  metadata: {
    type: 'seed',
    seedHash:
      '9fe676742eb80d61fea4476e2d33a088d708a24c2762fa028f9bfbe693612d15b83223f7ba5bc2e0fe2390d243a47a18144f19acd34b105757b1ac7751da821f',
  },
}

test('wallet create', async ({ page }) => {
  await mockApiDefaults({ page })
  await login({ page })
  await createWallet({ page, newWallet, seed })
  await expect(page.locator(`span:text('${newWallet.name}')`)).toBeVisible()
  await page.locator(`span:text('${newWallet.name}')`).click()
  await expect(page.getByText('The wallet has no')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Addresses' })).toBeVisible()
})
