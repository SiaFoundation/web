import type { Page } from '@playwright/test'
import { getSwitchByLabel } from './switchValue'

export async function setViewMode({
  page,
  state,
}: {
  page: Page
  state: 'advanced' | 'basic'
}) {
  const { el, value } = await getViewMode({ page })
  if (state !== value) {
    await el.click()
  }
}

export async function getViewMode({ page }: { page: Page }) {
  await page.getByRole('button', { name: 'View' }).click()
  const { el, value } = await getSwitchByLabel(page, 'configViewMode')
  return {
    el,
    value: value ? 'advanced' : 'basic',
  }
}
