import { expect, test } from '@playwright/test'
import { login } from '../fixtures/login'

test('login', async ({ page }) => {
  await login({ page })
  await expect(page.getByTestId('navbar').getByText('Buckets')).toBeVisible()
})
