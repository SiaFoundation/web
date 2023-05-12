import { useMemo } from 'react'
import { Contract, useContracts } from '@siafoundation/react-hostd'
import { ContractData } from './types'
import BigNumber from 'bignumber.js'

export function useDataset({
  response,
}: {
  response: ReturnType<typeof useContracts>
}) {
  return useMemo<ContractData[] | null>(() => {
    if (!response.data) {
      return null
    }
    return (
      response.data.contracts?.map((contract) => {
        return getContractFields(contract)
      }) || []
    )
  }, [response.data])
}

function getContractFields(c: Contract): ContractData {
  const accountFunding = new BigNumber(c.usage.accountFunding || 0)
  const egress = new BigNumber(c.usage.egress || 0)
  const ingress = new BigNumber(c.usage.ingress || 0)
  const riskedCollateral = new BigNumber(c.usage.riskedCollateral || 0)
  const rpc = new BigNumber(c.usage.rpc || 0)
  const storage = new BigNumber(c.usage.storage || 0)
  const total = accountFunding
    .plus(egress)
    .plus(ingress)
    .plus(riskedCollateral)
    .plus(rpc)
    .plus(storage)

  const payoutHeight =
    c.resolutionHeight > 0
      ? c.resolutionHeight + 144
      : c.revision.windowEnd + 144

  return {
    id: c.revision.parentID,
    revision: {
      parentID: c.revision.parentID,
      unlockConditions: c.revision.unlockConditions,
      filesize: new BigNumber(c.revision.filesize || 0),
      fileMerkleRoot: c.revision.fileMerkleRoot,
      windowStart: c.revision.windowStart,
      windowEnd: c.revision.windowEnd,
      payout: new BigNumber(
        c.status == 'active' || c.resolutionHeight > 0
          ? c.revision.validProofOutputs[1].value
          : c.revision.missedProofOutputs[1].value
      ),
      validProofOutputs: c.revision.validProofOutputs,
      missedProofOutputs: c.revision.missedProofOutputs,
      unlockHash: c.revision.unlockHash,
      revisionNumber: c.revision.revisionNumber,
    },

    usage: {
      total,
      accountFunding,
      egress,
      ingress,
      riskedCollateral,
      rpc,
      storage,
    },
    lockedCollateral: new BigNumber(c.lockedCollateral || 0),

    hostSignature: c.hostSignature,
    renterSignature: c.renterSignature,

    status: c.status,
    negotiationHeight: c.negotiationHeight,
    formationConfirmed: c.formationConfirmed,
    revisionConfirmed: c.revisionConfirmed,
    resolutionHeight: c.resolutionHeight,
    payoutHeight,
    contractHeightStart: c.negotiationHeight,
    contractHeightEnd: c.revision.windowStart,
    renewedTo: c.renewedTo,
    renewedFrom: c.renewedFrom,
    isRenewedFrom:
      c.renewedFrom !==
      'fcid:0000000000000000000000000000000000000000000000000000000000000000',
    isRenewedTo:
      c.renewedTo !==
      'fcid:0000000000000000000000000000000000000000000000000000000000000000',
  }
}
