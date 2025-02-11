import { login } from './login'
import { Page } from 'playwright'
import { mockApiSiaCentralHostsNetworkAverages } from '@siafoundation/sia-central-mock'
import {
  clusterd,
  mine,
  setupCluster,
  teardownCluster,
} from '@siafoundation/clusterd'
import { Bus } from '@siafoundation/renterd-js'
import {
  setCurrencyDisplay,
  mockApiSiaScanExchangeRates,
} from '@siafoundation/e2e'

export async function beforeTest(
  page: Page,
  { siafundAddr }: { siafundAddr?: string } = {}
) {
  await mockApiSiaScanExchangeRates({ page })
  await mockApiSiaCentralHostsNetworkAverages({ page })
  await setupCluster({
    walletdCount: 1,
    renterdCount: 1,
    networkVersion: 'transition',
    siafundAddr,
  })
  const walletdNode = clusterd.nodes.find((n) => n.type === 'walletd')

  await login({
    page,
    address: walletdNode.apiAddress,
    password: walletdNode.password,
  })

  // Reset state.
  await setCurrencyDisplay(page, 'bothPreferSc')
}

// Helper that assumes a single renterd node is being used to test sending funds.
export async function sendSiacoinFromRenterd(address: string, amount: string) {
  const renterdNode = clusterd.nodes.find((n) => n.type === 'renterd')
  const bus = Bus({
    api: renterdNode.apiAddress + '/api',
    password: renterdNode.password,
  })

  try {
    // Send some funds to the wallet.
    await bus.walletSend({
      data: {
        address,
        amount,
        subtractMinerFee: false,
      },
    })
    await mine(1)
  } catch (e) {
    console.log('error sending siacoin', e)
  }
}

// Helper that assumes a single renterd node is being used to test sending funds.
export async function getRenterdAddress() {
  const renterdNode = clusterd.nodes.find((n) => n.type === 'renterd')
  return renterdNode.walletAddress
}

export async function afterTest() {
  teardownCluster()
}
