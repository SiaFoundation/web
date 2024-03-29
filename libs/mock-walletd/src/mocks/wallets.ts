import { Wallet, WalletsResponse } from '@siafoundation/react-walletd'
import { Page } from 'playwright'

export function getMockWalletsResponse(): WalletsResponse {
  return [
    {
      id: '1',
      name: '1',
      description: '1',
      dateCreated: '2024-03-20T18:49:01Z',
      lastUpdated: '2024-03-20T18:49:01Z',
      metadata: {
        type: 'seed',
        mnemonicHash:
          '302626ee851d3712c19007c6141fc7f3a229ae64e6df71403a31b3ad131ac53657cf3dcae9405d9203e57204eb0084a7899224880e8d8beb4e103949255d861e',
      },
    },
    {
      id: '2',
      name: '2',
      description: '2',
      dateCreated: '2024-03-20T18:49:50Z',
      lastUpdated: '2024-03-20T19:30:04Z',
      metadata: {
        type: 'seed',
        mnemonicHash:
          '302626ee851d3712c19007c6141fc7f3a229ae64e6df71403a31b3ad131ac53657cf3dcae9405d9203e57204eb0084a7899224880e8d8beb4e103949255d861e',
      },
    },
    {
      id: '3',
      name: '3',
      description: '3',
      dateCreated: '2024-03-20T18:53:27Z',
      lastUpdated: '2024-03-20T18:53:27Z',
      metadata: {
        type: 'watch',
      },
    },
  ]
}

export async function mockApiWallets({
  page,
  createWallet,
}: {
  page: Page
  createWallet?: Wallet
}) {
  const json = getMockWalletsResponse()
  await page.route('**/api/wallets*', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ json: createWallet })
    } else {
      await route.fulfill({ json })
    }
  })
  return json
}
