import Sia from '@siacentral/ledgerjs-sia'
import { LedgerDevice } from '../contexts/ledger/types'
import { transformAddressesResponse } from '../contexts/addresses/dataset'
import { Wallet, WalletAddressesResponse } from '@siafoundation/walletd-types'

export function getMockDevice() {
  return {
    type: 'HID',
    sia: {
      transport: {},
      getVersion: jest.fn(() => '0.4.5'),
      signTransaction: jest
        .fn()
        .mockReturnValueOnce(
          'Xt1EJckLmWXU+7HHHDN9bRV5KRuLdC4YY01LzaAMF269QH4hWV8zFkY3kCWs65svhb9HhA1Ix1MRGvhN9orBDpAA'
        )
        .mockReturnValueOnce(
          'fvmSaRzlO/n2L5tsT32e82kWqHnIjQJ8cqjWOc37TtlK6p/vIiOG+TO98HfvbgObTOYVqlKMtUyxTOjGb3bfCpAA'
        ),
      signV2Transaction: jest
        .fn()
        .mockReturnValueOnce(
          'Xt1EJckLmWXU+7HHHDN9bRV5KRuLdC4YY01LzaAMF269QH4hWV8zFkY3kCWs65svhb9HhA1Ix1MRGvhN9orBDpAA'
        )
        .mockReturnValueOnce(
          'fvmSaRzlO/n2L5tsT32e82kWqHnIjQJ8cqjWOc37TtlK6p/vIiOG+TO98HfvbgObTOYVqlKMtUyxTOjGb3bfCpAA'
        ),
    } as unknown as Sia,
    transport: {
      forget: jest.fn(),
      deviceModel: {
        productName: 'Ledger Nano S',
      },
      _disconnectEmitted: false,
    },
  } as LedgerDevice
}

export function getMockAddresses({
  newWallet,
  walletAddressesResponse,
}: {
  newWallet: Wallet
  walletAddressesResponse: WalletAddressesResponse
}) {
  return transformAddressesResponse(
    walletAddressesResponse,
    newWallet.id,
    () => null
  )
}
