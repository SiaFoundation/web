import { Page } from '@playwright/test'
import { Alert } from '@siafoundation/indexd-types'

// The cluster's indexd does not raise alerts on its own in a predictable
// way, so alerts are mocked.
export async function mockApiAlerts({
  page,
  alerts,
}: {
  page: Page
  alerts: Alert[]
}) {
  let current = [...alerts]
  const dismissed: string[] = []

  await page.route(
    (url) => url.pathname === '/api/alerts',
    async (route) => {
      await route.fulfill({ json: current })
    },
  )

  await page.route(
    (url) => url.pathname === '/api/alerts/dismiss',
    async (route) => {
      const ids = route.request().postDataJSON() as string[]
      current = current.filter((a) => !ids.includes(a.id))
      dismissed.push(...ids)
      await route.fulfill({ status: 200, body: '' })
    },
  )

  await page.route(
    (url) =>
      url.pathname.startsWith('/api/alerts/') &&
      url.pathname !== '/api/alerts/dismiss',
    async (route) => {
      const id = route.request().url().split('/api/alerts/')[1]
      const alert = current.find((a) => a.id === id)
      if (alert) {
        await route.fulfill({ json: alert })
      } else {
        await route.fulfill({ status: 404, body: 'alert not found' })
      }
    },
  )

  return { dismissed }
}
