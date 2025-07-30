import BigNumber from 'bignumber.js'
import {
  ExplorerTransaction,
  ExplorerV2Transaction,
} from '@siafoundation/explored-types'
import { getV2TransactionType } from '@siafoundation/units'

export type AddressSummary = {
  address: string
  sc?: BigNumber
  sf?: number
}

/**
 * Calculates how many siacoins and siafunds each address gained or lost
 * in a transaction.
 *
 * Returns two separate lists for sc and sf, each with individual address
 * entries, sorted from highest to lowest.
 *
 * @param transaction - The transaction to summarize
 * @returns An object with { sc, sf } arrays of address summaries
 */
export function getTransactionSummary(
  transaction: ExplorerTransaction | ExplorerV2Transaction,
): { sc: AddressSummary[]; sf: AddressSummary[] } {
  const scMap = new Map<string, BigNumber>()
  const sfMap = new Map<string, number>()

  const updateSC = (address: string, amount: BigNumber) => {
    scMap.set(address, (scMap.get(address) || new BigNumber(0)).plus(amount))
  }

  const updateSF = (address: string, amount: number) => {
    sfMap.set(address, (sfMap.get(address) || 0) + amount)
  }

  // Subtract inputs.
  transaction.siacoinInputs?.forEach((input) => {
    const address =
      'parent' in input ? input.parent.siacoinOutput.address : input.address
    const value = new BigNumber(
      'parent' in input ? input.parent.siacoinOutput.value : input.value,
    )
    updateSC(address, value.negated())
  })

  transaction.siafundInputs?.forEach((input) => {
    const address =
      'parent' in input ? input.parent.siafundOutput.address : input.address
    const value = Number(
      'parent' in input ? input.parent.siafundOutput.value : input.value,
    )
    // Note the negation here.
    updateSF(address, -value)
  })

  // Add outputs.
  transaction.siacoinOutputs?.forEach((output) => {
    const address = output.siacoinOutput.address
    const value = new BigNumber(output.siacoinOutput.value)
    updateSC(address, value)
  })

  transaction.siafundOutputs?.forEach((output) => {
    const address = output.siafundOutput.address
    const value = Number(output.siafundOutput.value)
    updateSF(address, value)
  })

  // Convert to sorted arrays.
  const sc: AddressSummary[] = Array.from(scMap.entries())
    .map(([address, sc]) => ({ address, sc }))
    .sort(
      (a, b) =>
        (b.sc ?? new BigNumber(0)).comparedTo(a.sc ?? new BigNumber(0)) ?? 0,
    )

  const sf: AddressSummary[] = Array.from(sfMap.entries())
    .map(([address, sf]) => ({ address, sf }))
    .sort((a, b) => (b.sf ?? 0) - (a.sf ?? 0))

  return { sc, sf }
}

export function explorerV2TransactionToGetV2TransactionTypeParam(
  tx: ExplorerV2Transaction,
): Parameters<typeof getV2TransactionType>[0] {
  return {
    ...tx,
    fileContractResolutions: tx.fileContractResolutions?.map((r) => {
      if (r.type === 'renewal') {
        return {
          ...r,
          parent: {
            v2FileContract: {
              proofHeight: r.parent.v2FileContract.proofHeight,
              expirationHeight: r.parent.v2FileContract.expirationHeight,
            },
          },
          resolution: {
            newContract: {
              proofHeight: r.resolution.newContract.v2FileContract.proofHeight,
              expirationHeight:
                r.resolution.newContract.v2FileContract.expirationHeight,
            },
          },
        }
      }
      if (r.type === 'storage_proof') {
        return {
          type: 'storageProof',
        }
      }
      return r
    }),
    fileContractRevisions: tx.fileContractRevisions?.map((r) => ({
      ...r,
      parent: {
        v2FileContract: {
          proofHeight: r.parent.v2FileContract.proofHeight,
          expirationHeight: r.parent.v2FileContract.expirationHeight,
        },
      },
      revision: {
        proofHeight: r.revision.proofHeight,
        expirationHeight: r.revision.expirationHeight,
      },
    })),
  }
}
