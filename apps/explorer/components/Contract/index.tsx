'use client'

import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { SiaCentralExchangeRates } from '@siafoundation/sia-central-types'
import {
  blockHeightToTime,
  humanBytes,
  humanSiacoin,
} from '@siafoundation/units'
import { EntityList, EntityListItemProps } from '@siafoundation/design-system'
import { DatumProps, ExplorerDatum } from '../ExplorerDatum'
import { ContentLayout } from '../ContentLayout'
import { ContractHeader } from './ContractHeader'
import { siacoinToFiat } from '../../lib/currency'
import { useExchangeRate } from '../../hooks/useExchangeRate'
import {
  ExplorerFileContract,
  FileContractID,
  SiacoinOutput,
} from '@siafoundation/explored-types'

type Props = {
  previousRevisions: ExplorerFileContract[] | undefined
  currentHeight: number
  contract: ExplorerFileContract
  rates?: SiaCentralExchangeRates
  renewedToID: FileContractID | null
  renewedFromID: FileContractID | null
}

export function Contract({
  previousRevisions,
  currentHeight,
  contract,
  rates,
  renewedFromID,
  renewedToID,
}: Props) {
  const exchange = useExchangeRate(rates)
  const values = useMemo(() => {
    return [
      {
        label: 'file size',
        copyable: false,
        value: humanBytes(contract.fileContract.filesize),
      },
      {
        label: 'payout',
        copyable: false,
        value: siacoinToFiat(contract.fileContract.payout, exchange),
        comment: humanSiacoin(contract.fileContract.payout),
      },
      {
        label: 'transaction ID',
        entityType: 'transaction',
        entityValue: contract.confirmationTransactionID,
      },
      {
        label: 'merkle root',
        value: contract.fileContract.fileMerkleRoot,
      },
      {
        label: 'unlock hash',
        value: contract.fileContract.unlockHash,
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
        value: blockHeightToTime(
          currentHeight,
          contract.confirmationIndex.height
        ),
      },
      {
        label: 'expiration height',
        copyable: false,
        value: contract.fileContract.windowStart.toLocaleString() || '-',
      },
      {
        label: 'expiration time',
        copyable: false,
        value: blockHeightToTime(
          currentHeight,
          contract.fileContract.windowStart
        ),
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
          ? blockHeightToTime(currentHeight, contract.proofIndex.height)
          : '-',
      },
      {
        label: 'proof deadline height',
        copyable: false,
        value: contract.fileContract.windowEnd.toLocaleString() || '-',
      },
      {
        label: 'proof deadline time',
        copyable: false,
        value: blockHeightToTime(
          currentHeight,
          contract.fileContract.windowEnd
        ),
      },
      // {
      //   label: 'payout height',
      //   copyable: false,
      //   value: contract.payout_height?.toLocaleString() || '-',
      // },
      // {
      //   label: 'payout time',
      //   copyable: false,
      //   value:
      //     contract.payout_timestamp !== '0001-01-01T00:00:00Z'
      //       ? humanDate(contract.payout_timestamp, {
      //           dateStyle: 'medium',
      //           timeStyle: 'short',
      //         })
      //       : '-',
      // },
      {
        label: 'revision number',
        value: contract.fileContract.revisionNumber.toLocaleString(),
      },
      {
        label: 'previous revisions',
        copyable: false,
        value: (
          (previousRevisions && previousRevisions.length) ||
          0
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
          hash: renterPayoutValid?.address,
        },
        {
          label: 'host payout',
          initials: 'h',
          sc: hostPayoutValid && new BigNumber(hostPayoutValid.value),
          hash: hostPayoutValid?.address,
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
          hash: renterPayoutValid?.address,
        },
        {
          label: 'host payout',
          initials: 'h',
          sc: hostPayoutValid && new BigNumber(hostPayoutValid.value),
          hash: hostPayoutValid?.address,
        },
      ] as EntityListItemProps[]
    }
    return (
      contract.fileContract.validProofOutputs?.map(genericOutputListItem) || []
    )
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
          hash: renterPayoutMissed?.address,
        },
        {
          label: `host payout: payout minus risked collateral and storage revenue`,
          initials: 'h',
          sc: hostPayoutMissed && new BigNumber(hostPayoutMissed.value),
          hash: hostPayoutMissed?.address,
        },
        {
          label: 'host burn: host revenue plus risked collateral',
          initials: 'b',
          sc: hostBurned && new BigNumber(hostBurned.value),
          hash: hostBurned?.address,
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
          hash: renterPayoutMissed?.address,
        },
        {
          label: `host payout: payout minus risked collateral and storage revenue`,
          initials: 'h',
          sc: hostPayoutMissed && new BigNumber(hostPayoutMissed.value),
          hash: hostPayoutMissed?.address,
        },
      ] as EntityListItemProps[]
    }
    return (
      contract.fileContract.missedProofOutputs?.map(genericOutputListItem) || []
    )
  }, [contract])

  return (
    <ContentLayout
      panel={
        <div className="flex flex-col">
          <ContractHeader
            currentHeight={currentHeight}
            contract={contract}
            renewedFromId={renewedFromID}
            renewedToId={renewedToID}
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
  if (contract.fileContract.validProofOutputs?.length !== 2) {
    return false
  }
  // renter payout, host payout, and host burned
  if (contract.fileContract.missedProofOutputs?.length !== 3) {
    return false
  }

  const { renterPayoutValid, renterPayoutMissed } =
    getNewContractFormattedOutputs(contract)

  // renter payout valid and missed should be the same
  if (renterPayoutValid?.value !== renterPayoutMissed?.value) {
    // Does we need to catch undefined cases now?
    return false
  }

  // math.MaxUint64 with lost precision
  const mathMaxUint64 = 18446744073709552000
  if (contract.fileContract.revisionNumber >= mathMaxUint64) {
    return false
  }
  return true
}

function isProperlyFormedRenewedContract(contract: ExplorerFileContract) {
  // renter payout, host payout
  if (contract.fileContract.validProofOutputs?.length !== 2) {
    return false
  }
  // renter payout, host payout
  if (contract.fileContract.missedProofOutputs?.length !== 2) {
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
  if (contract.fileContract.revisionNumber !== mathMaxUint64) {
    return false
  }
  return true
}

function getNewContractFormattedOutputs(contract: ExplorerFileContract) {
  return {
    renterPayoutValid: contract.fileContract.validProofOutputs?.[0],
    renterPayoutMissed: contract.fileContract.missedProofOutputs?.[0],
    hostPayoutValid: contract.fileContract.validProofOutputs?.[1],
    hostPayoutMissed: contract.fileContract.missedProofOutputs?.[1],
    hostBurned: contract.fileContract.missedProofOutputs?.[2],
  }
}

function getRenewedContractFormattedOutputs(contract: ExplorerFileContract) {
  return {
    renterPayoutValid: contract.fileContract.validProofOutputs?.[0],
    renterPayoutMissed: contract.fileContract.missedProofOutputs?.[0],
    hostPayoutValid: contract.fileContract.validProofOutputs?.[1],
    hostPayoutMissed: contract.fileContract.missedProofOutputs?.[1],
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
