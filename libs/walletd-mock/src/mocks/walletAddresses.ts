import {
  WalletAddress,
  WalletAddressesResponse,
} from '@siafoundation/walletd-react'
import { Page } from 'playwright'

export function getMockWalletAddressesResponse(): WalletAddressesResponse {
  return [
    {
      address:
        'addr:f2dbf56b5b0c698d7fbf43f646c76169d84e597e8b37fada97348beeecaa812d400ac4ce7981',
      description: '',
      metadata: {
        index: 0,
        unlockConditions: {
          signaturesRequired: 1,
          timelock: 0,
          publicKeys: [
            'ed25519:ee122b2169bdae5776b55609e384e0c58372cd5c529d4edc9b9918b26f8e5535',
          ],
        },
      },
    },
    {
      address:
        'addr:90c6057cdd2463eca61f83796e83152dbba28b6cb9a74831a043833051ec9f422726bfff2ee8',
      description: '',
      metadata: {
        index: 1,
        unlockConditions: {
          signaturesRequired: 1,
          timelock: 0,
          publicKeys: [
            'ed25519:624d6d477a8f4ceac873e6dd9138740f9322cb34a24246f96f9d64c021172f43',
          ],
        },
      },
    },
    {
      address:
        'addr:170173c40ca0f39f9618da30af14c390c7ce70248a3662a7a5d3d5a8a31c9fbfa2071e9f6518',
      description: '',
      metadata: {
        index: 2,
        unlockConditions: {
          signaturesRequired: 1,
          timelock: 0,
          publicKeys: [
            'ed25519:65cac661a4acf36847c0aa67cbc6956e3449fd82a7430cfd673ea7fedbfcf5fa',
          ],
        },
      },
    },
  ]
}

export async function mockApiWalletAddresses({
  page,
  walletId,
  response,
}: {
  page: Page
  walletId: string
  response?: WalletAddress[]
}) {
  const json = response || getMockWalletAddressesResponse()
  await page.route(`**/api/wallets/${walletId}/addresses*`, async (route) => {
    if (route.request().method() === 'PUT') {
      const data = route.request().postData()
      if (data) {
        json.push(JSON.parse(data))
      }
      await route.fulfill({ json })
    } else {
      await route.fulfill({ json })
    }
  })
  return json
}
