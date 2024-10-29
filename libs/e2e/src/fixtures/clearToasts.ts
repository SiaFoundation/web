import { Page } from '@playwright/test'
import { step } from './step'

export const clearToasts = step(
  'clear toasts',
  async ({ page }: { page: Page }) => {
    const clearButtons = page.getByTestId('toasts').locator('button')
    while ((await clearButtons.count()) > 0) {
      try {
        await clearButtons.first().click({
          timeout: 1000,
        })
      } catch (e) {
        console.log('Attempted to clear toast, but it is already detached.')
      }
    }
  }
)
