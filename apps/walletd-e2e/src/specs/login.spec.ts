import { test, expect } from '@playwright/test'
import { mockApiDefaults } from '../mocks/mock'
import { login } from '../fixtures/login'

test('login', async ({ page }) => {
  await mockApiDefaults({ page })
  await login({ page })
  await expect(page.getByRole('button', { name: 'Add wallet' })).toBeVisible()
})
