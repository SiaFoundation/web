import { Page } from '@playwright/test'
import { step } from './step'

export const clearToasts = step(
  'clear toasts',
  async ({ page }: { page: Page }) => {
    // Click close button on every toast instance.
    await page.evaluate(() => {
      document
        .querySelectorAll(
          'li[data-sonner-toast] button[aria-label="Close toast"]'
        )
        .forEach((btn) => (btn as HTMLElement).click())
    })

    // Wait until no toast containers remain in the DOM.
    await page
      .locator('li[data-sonner-toast]')
      .waitFor({ state: 'hidden', timeout: 1000 })
      .catch(() => {
        // Silent catch: toast container already gone.
        return undefined
      })
  }
)
