'use client'

import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { SiaCentralExchangeRates } from '@siafoundation/sia-central-types'
import { humanBytes, humanSiacoin } from '@siafoundation/units'
import { EntityList, EntityListItemProps } from '@siafoundation/design-system'
import { DatumProps, ExplorerDatum } from '../ExplorerDatum'
import { ContentLayout } from '../ContentLayout'
import { ContractHeader } from './ContractHeader'
import { siacoinToFiat } from '../../lib/currency'
import { useExchangeRate } from '../../hooks/useExchangeRate'
import {
  ChainIndex,
  ExplorerFileContract,
  FileContractID,
  SiacoinOutput,
} from '@siafoundation/explored-types'
import { blockHeightToHumanDate } from '../../lib/time'

type Props = {
  previousRevisions: ExplorerFileContract[] | undefined
  currentHeight: number
  contract: ExplorerFileContract
  rates?: SiaCentralExchangeRates
  renewedToID: FileContractID | null
  renewedFromID: FileContractID | null
  formationTxnChainIndex: ChainIndex[]
}

export function Contract({
  previousRevisions,
  currentHeight,
  contract,
  rates,
  renewedFromID,
  renewedToID,
  formationTxnChainIndex,
}: Props) {
  const exchange = useExchangeRate(rates)
  const values = useMemo(() => {
    return [
      {
        label: 'file size',
        copyable: false,
        value: humanBytes(contract.filesize),
      },
      {
        label: 'payout',
        copyable: false,
        value: siacoinToFiat(contract.payout, exchange),
        comment: humanSiacoin(contract.payout),
      },
      {
        label: 'transaction ID',
        entityType: 'transaction',
        entityValue: contract.transactionID,
      },
      {
        label: 'merkle root',
        value: contract.fileMerkleRoot,
      },
      {
        label: 'unlock hash',
        value: contract.unlockHash,
      },
      {
        label: 'proof confirmed',
        copyable: false,
        value: String(!!contract.proofTransactionID),
      },
      {
        label: 'negotiation height',
        copyable: false,
        value: contract.confirmationIndex.height.toLocaleString() || '-',
      },
      {
        label: 'negotiation time',
        copyable: false,
        value:
          blockHeightToHumanDate(
            currentHeight,
            contract.confirmationIndex.height
          ) || '-',
      },
      {
        label: 'expiration height',
        copyable: false,
        value: contract.windowStart.toLocaleString() || '-',
      },
      {
        label: 'expiration time',
        copyable: false,
        value:
          blockHeightToHumanDate(currentHeight, contract.windowStart) || '-',
      },
      {
        label: 'proof height',
        copyable: false,
        value: contract.proofIndex
          ? contract.proofIndex.height.toLocaleString()
          : '-',
      },
      {
        label: 'proof time',
        copyable: false,
        value: contract.proofIndex
          ? blockHeightToHumanDate(currentHeight, contract.proofIndex.height)
          : '-',
      },
      {
        label: 'proof deadline height',
        copyable: false,
        value: contract.windowEnd.toLocaleString() || '-',
      },
      {
        label: 'proof deadline time',
        copyable: false,
        value: blockHeightToHumanDate(currentHeight, contract.windowEnd) || '-',
      },
      {
        label: 'payout height',
        copyable: false,
        value: determinePayoutHeight(contract).toLocaleString() || '-',
      },
      {
        label: 'payout time',
        copyable: false,
        value:
          blockHeightToHumanDate(
            currentHeight,
            determinePayoutHeight(contract)
          ) || '-',
      },
      {
        label: 'revision number',
        value: contract.revisionNumber.toLocaleString(),
      },
      {
        label: 'previous revisions',
        copyable: false,
        value: (previousRevisions && previousRevisions.length > 1
          ? previousRevisions.length - 1
          : 0
        ).toLocaleString(),
      },
    ] as DatumProps[]
  }, [contract, exchange, previousRevisions, currentHeight])

  const validProofOutputs = useMemo(() => {
    if (isProperlyFormedNewContract(contract)) {
      const { renterPayoutValid, hostPayoutValid } =
        getNewContractFormattedOutputs(contract)
      return [
        {
          label: 'renter payout: remaining renter allowance',
          initials: 'r',
          sc: renterPayoutValid && new BigNumber(renterPayoutValid.value),
          hash: renterPayoutValid?.id,
        },
        {
          label: 'host payout',
          initials: 'h',
          sc: hostPayoutValid && new BigNumber(hostPayoutValid.value),
          hash: hostPayoutValid?.id,
        },
      ] as EntityListItemProps[]
    }
    if (isProperlyFormedRenewedContract(contract)) {
      const { renterPayoutValid, hostPayoutValid } =
        getRenewedContractFormattedOutputs(contract)
      return [
        {
          label: 'renter payout: remaining renter allowance',
          initials: 'r',
          sc: renterPayoutValid && new BigNumber(renterPayoutValid.value),
          hash: renterPayoutValid?.id,
        },
        {
          label: 'host payout',
          initials: 'h',
          sc: hostPayoutValid && new BigNumber(hostPayoutValid.value),
          hash: hostPayoutValid?.id,
        },
      ] as EntityListItemProps[]
    }
    return contract.validProofOutputs?.map(genericOutputListItem) || []
  }, [contract])

  const missedProofOutputs = useMemo(() => {
    if (isProperlyFormedNewContract(contract)) {
      const { renterPayoutMissed, hostPayoutMissed, hostBurned } =
        getNewContractFormattedOutputs(contract)
      return [
        {
          label: 'renter payout: remaining renter allowance',
          initials: 'r',
          sc: renterPayoutMissed && new BigNumber(renterPayoutMissed.value),
          hash: renterPayoutMissed?.id,
        },
        {
          label: `host payout: payout minus risked collateral and storage revenue`,
          initials: 'h',
          sc: hostPayoutMissed && new BigNumber(hostPayoutMissed.value),
          hash: hostPayoutMissed?.id,
        },
        {
          label: 'host burn: host revenue plus risked collateral',
          initials: 'b',
          sc: hostBurned && new BigNumber(hostBurned.value),
          hash: hostBurned?.id,
        },
      ] as EntityListItemProps[]
    }
    if (isProperlyFormedRenewedContract(contract)) {
      const { renterPayoutMissed, hostPayoutMissed } =
        getRenewedContractFormattedOutputs(contract)
      return [
        {
          label: 'renter payout: remaining renter allowance',
          initials: 'r',
          sc: renterPayoutMissed && new BigNumber(renterPayoutMissed.value),
          hash: renterPayoutMissed?.id,
        },
        {
          label: `host payout: payout minus risked collateral and storage revenue`,
          initials: 'h',
          sc: hostPayoutMissed && new BigNumber(hostPayoutMissed.value),
          hash: hostPayoutMissed?.id,
        },
      ] as EntityListItemProps[]
    }
    return contract.missedProofOutputs?.map(genericOutputListItem) || []
  }, [contract])

  return (
    <ContentLayout
      panel={
        <div className="flex flex-col">
          <ContractHeader
            currentHeight={currentHeight}
            contract={contract}
            renewedFromID={renewedFromID}
            renewedToID={renewedToID}
            formationTxnChainIndex={formationTxnChainIndex}
          />
          {!!values?.length && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-4">
              {values.map((item) => (
                <ExplorerDatum key={item.label} {...item} />
              ))}
            </div>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
          <div>
            <EntityList
              title={`Missed proof outputs (${missedProofOutputs.length})`}
              dataset={missedProofOutputs}
            />
          </div>
          <div>
            <EntityList
              title={`Valid proof outputs (${validProofOutputs.length})`}
              dataset={validProofOutputs}
            />
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}

function isProperlyFormedNewContract(contract: ExplorerFileContract) {
  // renter payout, host payout
  if (contract.validProofOutputs?.length !== 2) {
    return false
  }
  // renter payout, host payout, and host burned
  if (contract.missedProofOutputs?.length !== 3) {
    return false
  }

  const { renterPayoutValid, renterPayoutMissed } =
    getNewContractFormattedOutputs(contract)

  // renter payout valid and missed should be the same
  if (renterPayoutValid?.value !== renterPayoutMissed?.value) {
    // Do we need to catch undefined cases now?
    return false
  }

  // math.MaxUint64 with lost precision
  const mathMaxUint64 = 18446744073709552000
  if (contract.revisionNumber >= mathMaxUint64) {
    return false
  }
  return true
}

function isProperlyFormedRenewedContract(contract: ExplorerFileContract) {
  // renter payout, host payout
  if (contract.validProofOutputs?.length !== 2) {
    return false
  }
  // renter payout, host payout
  if (contract.missedProofOutputs?.length !== 2) {
    return false
  }

  const {
    renterPayoutValid,
    renterPayoutMissed,
    hostPayoutValid,
    hostPayoutMissed,
  } = getRenewedContractFormattedOutputs(contract)

  // renter payout valid and missed should be the same
  if (renterPayoutValid?.value !== renterPayoutMissed?.value) {
    return false
  }

  // host payout valid and missed should be the same
  if (hostPayoutValid?.value !== hostPayoutMissed?.value) {
    return false
  }

  // math.MaxUint64 with lost precision
  const mathMaxUint64 = 18446744073709552000
  if (contract.revisionNumber !== mathMaxUint64) {
    return false
  }
  return true
}

function getNewContractFormattedOutputs(contract: ExplorerFileContract) {
  return {
    renterPayoutValid: contract.validProofOutputs?.[0],
    renterPayoutMissed: contract.missedProofOutputs?.[0],
    hostPayoutValid: contract.validProofOutputs?.[1],
    hostPayoutMissed: contract.missedProofOutputs?.[1],
    hostBurned: contract.missedProofOutputs?.[2],
  }
}

function getRenewedContractFormattedOutputs(contract: ExplorerFileContract) {
  return {
    renterPayoutValid: contract.validProofOutputs?.[0],
    renterPayoutMissed: contract.missedProofOutputs?.[0],
    hostPayoutValid: contract.validProofOutputs?.[1],
    hostPayoutMissed: contract.missedProofOutputs?.[1],
  }
}

function genericOutputListItem(
  siacoinOutput: SiacoinOutput
): EntityListItemProps {
  const { value, address } = siacoinOutput
  return {
    // label: o.source ? o.source.replace(/_/g, ' ') : 'output',
    sc: new BigNumber(value),
    hash: address,
  }
}

// The payout height is either the proofIndex.height + 144, if it exists,
// or the windowEnd + 144.
function determinePayoutHeight(contract: ExplorerFileContract) {
  return (contract.proofIndex?.height || contract.windowEnd) + 144
}
