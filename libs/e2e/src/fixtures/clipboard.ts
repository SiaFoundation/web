import { Page, Locator } from '@playwright/test'
import { step } from './step'

/**
 * Click the copy button and return the value copied to clipboard.
 * Throws if no value is copied to clipboard.
 */
export const valueFromCopyToClipboardButton = step(
  'value from copy to clipboard button',
  async (page: Page, copyButton: Locator): Promise<string> => {
    await copyButton.click()
    const value = await page.evaluate(() => navigator.clipboard.readText())
    if (!value) {
      throw new Error('No value copied to clipboard')
    }
    return value
  },
)
