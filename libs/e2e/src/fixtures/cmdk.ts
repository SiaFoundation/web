import { Page, expect } from '@playwright/test'
import { step } from './step'
import { clearToasts } from './clearToasts'

export const openCmdkMenu = step('open cmdk menu', async (page: Page) => {
  // Ensure no dialog is open before opening the cmdk menu.
  await expect(page.getByRole('dialog')).toBeHidden()
  await clearToasts({ page })
  await page.keyboard.press(`ControlOrMeta+k`)
  return expectCmdkMenu(page)
})

export const expectCmdkMenu = step('expect cmdk menu', async (page: Page) => {
  const cmdk = page.getByRole('dialog').locator('div[cmdk-root]')
  await expect(cmdk).toBeVisible()
  return cmdk
})
