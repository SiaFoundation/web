import { Page } from '@playwright/test'
import { Contract } from '@siafoundation/indexd-types'

// indexd only forms contracts with hosts it can scan, and the cluster hosts
// announce private addresses that indexd never scans. Contracts are mocked so
// the contracts UI can be tested.
export function buildContract(
  overrides: Partial<Contract> & Pick<Contract, 'id' | 'hostKey'>,
): Contract {
  return {
    formation: '2026-01-01T00:00:00Z',
    renewedFrom:
      '0000000000000000000000000000000000000000000000000000000000000000',
    renewedTo:
      '0000000000000000000000000000000000000000000000000000000000000000',
    nextPrune: '2026-01-02T00:00:00Z',
    lastBroadcastAttempt: '2026-01-01T00:00:00Z',
    revisionNumber: 10,
    proofHeight: 2000,
    expirationHeight: 2144,
    capacity: 4194304,
    size: 4194304,
    initialAllowance: '1000000000000000000000000',
    remainingAllowance: '500000000000000000000000',
    totalCollateral: '2000000000000000000000000',
    usedCollateral: '100000000000000000000000',
    contractPrice: '200000000000000000000000',
    minerFee: '10000000000000000000000',
    good: true,
    state: 'active',
    spending: {
      appendSector: '0',
      freeSector: '0',
      fundAccount: '0',
      sectorRoots: '0',
    },
    ...overrides,
  }
}

export async function mockApiContracts({
  page,
  contracts,
}: {
  page: Page
  contracts: Contract[]
}) {
  let current = [...contracts]
  const deleted: string[] = []

  await page.route(
    (url) => url.pathname === '/api/contracts',
    async (route) => {
      const params = new URL(route.request().url()).searchParams
      const ids = params.getAll('id')
      const hostKeys = params.getAll('hostkey')
      const list = current.filter(
        (c) =>
          (ids.length === 0 || ids.includes(c.id)) &&
          (hostKeys.length === 0 || hostKeys.includes(c.hostKey)),
      )
      await route.fulfill({ json: list })
    },
  )

  await page.route(
    (url) => url.pathname.startsWith('/api/contract/'),
    async (route) => {
      const id = route.request().url().split('/api/contract/')[1]
      if (route.request().method() === 'DELETE') {
        current = current.filter((c) => c.id !== id)
        deleted.push(id)
        await route.fulfill({ status: 200, body: '' })
        return
      }
      const contract = current.find((c) => c.id === id)
      if (contract) {
        await route.fulfill({ json: contract })
      } else {
        await route.fulfill({ status: 404, body: 'contract not found' })
      }
    },
  )

  return { deleted }
}
