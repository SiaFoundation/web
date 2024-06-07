import { StateResponse } from '@siafoundation/walletd-types'
import { Page } from 'playwright'

export function getMockState(): StateResponse {
  return {
    buildTime: '2023-01-01T00:00:00Z',
    commit: 'commit',
    os: 'os',
    startTime: '2023-01-01T00:00:00Z',
    version: 'version',
  }
}

export async function mockApiState({ page }: { page: Page }) {
  const json = getMockState()
  await page.route('**/api/state*', async (route) => {
    await route.fulfill({ json })
  })
  return json
}
