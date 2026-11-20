import { Page, expect } from '@playwright/test'
import { clearToasts, step } from '@siafoundation/e2e'
import { ObjectAccount } from '@siafoundation/indexd-types'

export function objectKey(n: number): string {
  return n.toString(16).padStart(64, '0')
}

export const blockObject = step(
  'block object',
  async (page: Page, { key, reason }: { key: string; reason: string }) => {
    await clearToasts({ page })
    await page.getByRole('button', { name: 'Block object' }).click()
    const dialog = page.getByRole('dialog', { name: 'Block object' })
    await dialog.locator('input[name="objectKey"]').fill(key)
    await dialog.locator('input[name="reason"]').fill(reason)
    await dialog.getByRole('button', { name: 'Block object' }).click()
    await expect(page.getByText('Object blocked')).toBeVisible()
    await expect(dialog).toBeHidden()
  },
)

export const findObject = step(
  'find object',
  async (page: Page, key: string) => {
    await page.getByRole('button', { name: 'Find blocked object' }).click()
    const dialog = page.getByRole('dialog', { name: 'Find blocked object' })
    await dialog.locator('input[name="objectKey"]').fill(key)
    await dialog.getByRole('button', { name: 'Find', exact: true }).click()
    await expect(dialog).toBeHidden()
  },
)

// The cluster's indexd predates the object accounts route, so mock it. Keys
// missing from the map get a 404, as indexd returns for unknown objects.
export async function mockApiObjectAccounts(
  page: Page,
  accounts: Record<string, ObjectAccount[]>,
) {
  await page.route(
    (url) =>
      url.pathname.startsWith('/api/object/') &&
      url.pathname.endsWith('/accounts'),
    async (route) => {
      const key = new URL(route.request().url()).pathname.split('/')[3]
      const list = accounts[key]
      if (list) {
        await route.fulfill({ json: list })
      } else {
        await route.fulfill({ status: 404, body: 'object not found' })
      }
    },
  )
}
