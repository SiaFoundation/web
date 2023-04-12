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
    return (
      response.data?.map((contract) => {
        return getContractFields(contract)
      }) || null
    )
  }, [response.data])
}

function getContractFields(c: Contract): ContractData {
  return {
    id: c.revision.ParentID,
    revision: {
      parentID: c.revision.ParentID,
      unlockConditions: c.revision.UnlockConditions,
      filesize: c.revision.Filesize,
      fileMerkleRoot: c.revision.FileMerkleRoot,
      windowStart: c.revision.WindowStart,
      windowEnd: c.revision.WindowEnd,
      payout: new BigNumber(c.revision.Payout || 0),
      validProofOutputs: c.revision.ValidProofOutputs,
      missedProofOutputs: c.revision.MissedProofOutputs,
      unlockHash: c.revision.UnlockHash,
      revisionNumber: c.revision.RevisionNumber,
    },

    hostSignature: c.hostSignature,
    renterSignature: c.renterSignature,

    status: c.status,
    lockedCollateral: new BigNumber(c.lockedCollateral || 0),
    usage: new BigNumber(c.usage || 0),
    negotiationHeight: c.negotiationHeight,
    formationConfirmed: c.formationConfirmed,
    revisionConfirmed: c.revisionConfirmed,
    resolutionConfirmed: c.resolutionConfirmed,
    renewedTo: c.renewedTo,
    renewedFrom: c.renewedFrom,
  }
}
