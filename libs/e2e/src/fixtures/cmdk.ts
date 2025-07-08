import { Page, expect } from '@playwright/test'
import { step } from './step'

export const openCmdkMenu = step('open cmdk menu', async (page: Page) => {
  // Ensure no dialog is open before opening the cmdk menu.
  await expect(page.getByRole('dialog')).toBeHidden()
  await page.focus('body')
  await page.keyboard.press(`ControlOrMeta+k`)
  const dialog = page.getByRole('dialog')
  await expect(dialog.locator('div[cmdk-root]')).toBeVisible()
  return dialog
})
