import { Page, expect } from '@playwright/test'
import { step } from './step'

export const openCmdkMenu = step('open cmdk menu', async (page: Page) => {
  const isMac = process.platform === 'darwin'
  const modifier = isMac ? 'Meta' : 'Control'
  await page.keyboard.press(`${modifier}+k`)
  const dialog = page.getByRole('dialog')
  await expect(dialog.locator('div[cmdk-root]')).toBeVisible()
  return dialog
})
