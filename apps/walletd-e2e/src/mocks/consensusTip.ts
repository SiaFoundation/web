import { ConsensusTipResponse } from '@siafoundation/react-walletd'
import { cloneDeep } from '@technically/lodash'
import { Page } from 'playwright'

const data: ConsensusTipResponse = {
  height: 61676,
  id: 'bid:00000010d5da9002b9640d920d9eb9f7502c5c3b2a796ecf800a103920bea96f',
}

export async function mockApiConsensusTipState({ page }: { page: Page }) {
  const json = cloneDeep(data)
  await page.route('**/api/consensus/tipstate*', async (route) => {
    await route.fulfill({ json })
  })
  return json
}
