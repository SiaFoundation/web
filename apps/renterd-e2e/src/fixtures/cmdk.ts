import { Page, expect } from '@playwright/test'

export async function openCmdkMenu(page: Page) {
  const isMac = process.platform === 'darwin'
  const modifier = isMac ? 'Meta' : 'Control'
  await page.keyboard.press(`${modifier}+k`)
  const dialog = page.getByRole('dialog')
  await expect(dialog.locator('div[cmdk-root]')).toBeVisible()
  return dialog
}
