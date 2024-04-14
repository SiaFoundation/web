import { WalletOutputsSiacoinResponse } from '@siafoundation/walletd-react'
import { SiacoinElement } from '@siafoundation/types'
import { Page } from 'playwright'

export function getMockWalletOutputsSiacoinResponse(): WalletOutputsSiacoinResponse {
  return [
    {
      id: 'h:aa3e781330c9b3991e0141807df1327fadf114ca6c37acb9e58004f942d91dfb',
      leafIndex: 304248,
      merkleProof: [
        'h:0a7a4c392f78899e3c38c5cd9e6a673b2c7afec97930af539af9c8e20209aa78',
        'h:a1e074dc48634a234b7366a0d7ab19cd05e3e698e1d44bf07e24d75ae0c65b3c',
        'h:44d107342962e2068d289ce090c87b7bf0c847f734bdfad10db5546e402c3ad7',
        'h:64ea3e65ecd5ebc1c0ce014673148060855ce550571208b6303b8e2a83e33451',
        'h:19e37bf7747c6d8c7b87d2474dbbd3a8f5b26d89642f8e1af4b9b02abdfb2ea6',
        'h:1fc2ac9f70211a3be6f334db14feb8b327458aee49d3539770640cbdec9b4a5f',
        'h:defbbc18c64349f11e75537955861ececce0fadf10baec456f6c74b024820af1',
        'h:87d27ff868ca3b1dce59ae754eaec48239718e81e2e6f3b7b418f5a00362bcf7',
        'h:93d823c55fbd09de462a8e355921433b3693d63de58ea8e2780a2c2ffabd0fee',
        'h:a68820d6b79b2735b15c69d0fc26b11252bb27f22b9088559ed13f9420f5dda1',
        'h:1bbcead690290291ea9628214a121ef783411693975171803bf5716a3a6ff19b',
      ],
      siacoinOutput: {
        value: '1000000000000000000000000',
        address:
          'addr:f2dbf56b5b0c698d7fbf43f646c76169d84e597e8b37fada97348beeecaa812d400ac4ce7981',
      },
      maturityHeight: 0,
    },
    {
      id: 'h:32e430158591b4073a6834e9f4c4b67162e348844f569f4e472896bb72efb724',
      leafIndex: 305723,
      merkleProof: [
        'h:8c02aeec48de589ce497ebe72fb8b527cfe022ef513fcfdc56745c84832f00ec',
        'h:1bf63b9959e60272fd7a48a8cecd4120a852c0e14557ea27ccad6ea2071e70b3',
        'h:21b7e1606e9fd677059c58a1a687682182f71ce09e071431dcaff823a3a5d49e',
        'h:e81ac37d3b4db6166dc1bb10ebfa49f57cbf99aababd36ee4e3e5e12082dc6dc',
        'h:ecc307c6c3e505d97ccf821938e5e5702ef0130d33c991ca95735f7d9706a4b8',
        'h:9560060ee399793f102e092afdfdbdd33692706256955e8390af552de0addfc0',
      ],
      siacoinOutput: {
        value: '97988210000000000000000000',
        address:
          'addr:f2dbf56b5b0c698d7fbf43f646c76169d84e597e8b37fada97348beeecaa812d400ac4ce7981',
      },
      maturityHeight: 0,
    },
  ]
}

export async function mockApiWalletOutputsSiacoin({
  page,
  walletId,
  response,
}: {
  page: Page
  walletId: string
  response?: SiacoinElement[]
}) {
  const json = response || getMockWalletOutputsSiacoinResponse()
  await page.route(
    `**/api/wallets/${walletId}/outputs/siacoin*`,
    async (route) => {
      await route.fulfill({ json })
    }
  )
  return json
}
