import { Page } from '@playwright/test'

export async function clearToasts({ page }: { page: Page }) {
  const clearButtons = page.getByTestId('toasts').locator('button')
  while ((await clearButtons.count()) > 0) {
    await clearButtons.first().click()
    // Timeout required because the toast animation is not instantaneous.
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(1000)
  }
}
