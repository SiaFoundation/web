import { useMemo } from 'react'
import { Contract, V2Contract } from '@siafoundation/hostd-types'
import { useContracts, useContractsV2 } from '@siafoundation/hostd-react'
import { ContractData } from './types'
import BigNumber from 'bignumber.js'
import { Maybe } from '@siafoundation/types'

export function useDataset({
  response,
  responseV2,
}: {
  response: ReturnType<typeof useContracts>
  responseV2: ReturnType<typeof useContractsV2>
}) {
  return useMemo<Maybe<ContractData[]>>(() => {
    if (!response.data || !responseV2.data) {
      return undefined
    }
    const v1 =
      response.data.contracts?.map((c) => getContractFieldsFromV1(c)) || []
    const v2 =
      responseV2.data.contracts?.map((c) => getContractFieldsFromV2(c)) || []
    return [...v1, ...v2]
  }, [response.data, responseV2.data])
}

function getContractFieldsFromV1(c: Contract): ContractData {
  const accountFunding = new BigNumber(c.usage.accountFunding || 0)
  const egress = new BigNumber(c.usage.egress || 0)
  const ingress = new BigNumber(c.usage.ingress || 0)
  const riskedCollateral = new BigNumber(c.usage.riskedCollateral || 0)
  const rpc = new BigNumber(c.usage.rpc || 0)
  const storage = new BigNumber(c.usage.storage || 0)
  const total = accountFunding
    .plus(egress)
    .plus(ingress)
    .plus(rpc)
    .plus(storage)

  return {
    id: c.revision.parentID,
    version: 1,
    status: c.status,
    fileMerkleRoot: c.revision.fileMerkleRoot,
    filesize: new BigNumber(c.revision.filesize || 0),
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
    payout: new BigNumber(
      c.status == 'active' || c.resolutionHeight > 0
        ? c.revision.validProofOutputs[1].value
        : c.revision.missedProofOutputs[1].value
    ),
    remainingRenterFunds: new BigNumber(
      c.revision.validProofOutputs?.[0].value || 0
    ),
    negotiationHeight: c.negotiationHeight,
    formationConfirmed: c.formationConfirmed,
    revisionConfirmed: c.revisionConfirmed,
    contractHeightStart: c.negotiationHeight,
    contractHeightEnd: c.revision.windowStart,
    proofWindowHeightStart: c.revision.windowStart,
    proofWindowHeightEnd: c.revision.windowEnd,
    resolutionHeight: c.resolutionHeight,
    payoutHeight:
      c.resolutionHeight > 0
        ? c.resolutionHeight + 144
        : c.revision.windowEnd + 144,
    renewedTo: c.renewedTo,
    renewedFrom: c.renewedFrom,
    isRenewedFrom:
      c.renewedFrom !==
      '0000000000000000000000000000000000000000000000000000000000000000',
    isRenewedTo:
      c.renewedTo !==
      '0000000000000000000000000000000000000000000000000000000000000000',
  }
}

function getContractFieldsFromV2(c: V2Contract): ContractData {
  const accountFunding = new BigNumber(c.usage.accountFunding || 0)
  const egress = new BigNumber(c.usage.egress || 0)
  const ingress = new BigNumber(c.usage.ingress || 0)
  const riskedCollateral = new BigNumber(c.usage.collateral || 0)
  const rpc = new BigNumber(c.usage.rpc || 0)
  const storage = new BigNumber(c.usage.storage || 0)
  const total = accountFunding
    .plus(egress)
    .plus(ingress)
    .plus(rpc)
    .plus(storage)

  return {
    id: c.id,
    version: 2,
    status: c.status,
    fileMerkleRoot: c.fileMerkleRoot,
    filesize: new BigNumber(c.filesize || 0),
    usage: {
      total,
      accountFunding,
      egress,
      ingress,
      riskedCollateral,
      rpc,
      storage,
    },
    lockedCollateral: new BigNumber(c.totalCollateral || 0),
    remainingRenterFunds: new BigNumber(c.renterOutput.value),
    negotiationHeight: c.negotiationHeight,
    formationConfirmed: c.formationIndex.height > 0,
    revisionConfirmed: c.revisionConfirmed,
    contractHeightStart: c.formationIndex.height,
    contractHeightEnd: c.proofHeight,
    // For v2 contracts "proofHeight" means the start of the proof window.
    proofWindowHeightStart: c.proofHeight,
    proofWindowHeightEnd: c.expirationHeight,
    // In V1 a resolution was always a valid proof. In V2 there are multiple
    // types of resolutions. Renewals, proofs, and expiration are all different
    // types of resolutions and one of them needs to happen for funds to be unlocked.
    resolutionHeight: c.resolutionIndex.height,
    // The payout height is 144 blocks after the resolution height. Until we
    // know the resolution height, the latest possible payout height is used.
    payoutHeight:
      c.resolutionIndex.height > 0
        ? c.resolutionIndex.height + 144
        : c.expirationHeight + 144,
    // There might be a payout. but the contract API does not provide enough
    // information to calculate it. If there is going to be a payout, it will
    // show up in the wallet at least.
    // When this value is null, it is rendered in the table as 'unknown'.
    payout:
      c.status === 'renewed'
        ? null
        : new BigNumber(
            c.status == 'active' || c.resolutionIndex.height > 0
              ? c.hostOutput.value
              : c.missedHostValue
          ),
    renewedTo: c.renewedTo,
    renewedFrom: c.renewedFrom,
    isRenewedFrom:
      c.renewedFrom !==
      '0000000000000000000000000000000000000000000000000000000000000000',
    isRenewedTo:
      c.renewedTo !==
      '0000000000000000000000000000000000000000000000000000000000000000',
  }
}
