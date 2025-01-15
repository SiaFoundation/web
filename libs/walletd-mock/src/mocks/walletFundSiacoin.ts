import { WalletFundSiacoinResponse } from '@siafoundation/walletd-types'
import { Page } from 'playwright'

export function getMockWalletFundSiacoinResponse(): WalletFundSiacoinResponse {
  return {
    transaction: {
      siacoinInputs: [
        {
          parentID:
            'aa3e781330c9b3991e0141807df1327fadf114ca6c37acb9e58004f942d91dfb',
          unlockConditions: {
            timelock: 0,
            publicKeys: null,
            signaturesRequired: 0,
          },
        },
        {
          parentID:
            '32e430158591b4073a6834e9f4c4b67162e348844f569f4e472896bb72efb724',
          unlockConditions: {
            timelock: 0,
            publicKeys: null,
            signaturesRequired: 0,
          },
        },
      ],
      siacoinOutputs: [
        {
          value: '1000000000000000000000000',
          address:
            '90c6057cdd2463eca61f83796e83152dbba28b6cb9a74831a043833051ec9f422726bfff2ee8',
        },
        {
          value: '97984280000000000000000000',
          address:
            'f2dbf56b5b0c698d7fbf43f646c76169d84e597e8b37fada97348beeecaa812d400ac4ce7981',
        },
      ],
      minerFees: ['3930000000000000000000'],
    },
    toSign: [
      'aa3e781330c9b3991e0141807df1327fadf114ca6c37acb9e58004f942d91dfb',
      '32e430158591b4073a6834e9f4c4b67162e348844f569f4e472896bb72efb724',
    ],
    dependsOn: null,
  }
}

export async function mockApiWalletFundSiacoin({
  page,
  walletId,
  response,
  expectPost,
}: {
  page: Page
  walletId: string
  response?: WalletFundSiacoinResponse
  expectPost?: (data: string | null) => void
}) {
  const json = response || getMockWalletFundSiacoinResponse()
  await page.route(`**/api/wallets/${walletId}/fund*`, async (route) => {
    if (expectPost) {
      expectPost(route.request().postData())
    }
    await route.fulfill({ json })
  })
  return json
}
