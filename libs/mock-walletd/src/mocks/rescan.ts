import { RescanResponse } from '@siafoundation/react-walletd'
import { Page } from 'playwright'

export function getMockRescanResponse(): RescanResponse {
  return {
    startIndex: {
      height: 61676,
      id: 'bid:00000010d5da9002b9640d920d9eb9f7502c5c3b2a796ecf800a103920bea96f',
    },
    index: {
      height: 61676,
      id: 'bid:00000010d5da9002b9640d920d9eb9f7502c5c3b2a796ecf800a103920bea96f',
    },
    startTime: new Date().toISOString(),
    error: undefined,
  }
}

export async function mockApiRescan({
  page,
  response,
}: {
  page: Page
  response?: RescanResponse
}) {
  const json = response || getMockRescanResponse()
  await page.route('**/api/rescan*', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill()
    } else {
      await route.fulfill({ json })
    }
  })
  return json
}
