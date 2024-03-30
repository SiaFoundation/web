import { ConsensusTipResponse } from '@siafoundation/react-walletd'
import { Page } from 'playwright'

export function getMockConsensusTipResponse(): ConsensusTipResponse {
  return {
    height: 61676,
    id: 'bid:00000010d5da9002b9640d920d9eb9f7502c5c3b2a796ecf800a103920bea96f',
  }
}

export async function mockApiConsensusTip({ page }: { page: Page }) {
  const json = getMockConsensusTipResponse()
  await page.route('**/api/consensus/tip*', async (route) => {
    await route.fulfill({ json })
  })
  return json
}
