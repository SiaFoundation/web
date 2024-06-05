import { test, expect } from '@playwright/test'
import { login } from '../fixtures/login'

test('login', async ({ page }) => {
  await login({ page })
  await expect(page.locator('#navbar').getByText('Overview')).toBeVisible()
})
