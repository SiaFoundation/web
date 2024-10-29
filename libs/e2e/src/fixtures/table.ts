import { Page } from '@playwright/test'
import { step } from './step'

export const waitForTableToReload = step(
  'wait for table to reload',
  async (page: Page, tableTestId: string) => {
    await page
      .locator(`[data-testid=${tableTestId}][data-loading=true]`)
      .isVisible()
    await page
      .locator(`[data-testid=${tableTestId}][data-loading=false]`)
      .isVisible()
  }
)
