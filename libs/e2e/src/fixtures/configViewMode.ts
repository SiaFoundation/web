import { Page } from '@playwright/test'
import { getSwitchByLabel } from './switchValue'
import { step } from './step'

export const setViewMode = step(
  'set view mode',
  async ({ page, state }: { page: Page; state: 'advanced' | 'basic' }) => {
    const { el, value } = await getViewMode({ page })
    if (state !== value) {
      await el.click()
    }
  },
)

export const getViewMode = step(
  'get view mode',
  async ({ page }: { page: Page }) => {
    await page.getByRole('button', { name: 'View' }).click()
    const { el, value } = await getSwitchByLabel(page, 'configViewMode')
    return {
      el,
      value: value ? 'advanced' : 'basic',
    }
  },
)
