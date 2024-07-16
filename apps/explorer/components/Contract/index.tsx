'use client'

import {
  EntityList,
  type EntityListItemProps,
} from '@siafoundation/design-system'
import type {
  SiaCentralContract,
  SiaCentralExchangeRates,
  SiaCentralPartialSiacoinOutput,
} from '@siafoundation/sia-central-types'
import { humanBytes, humanDate, humanSiacoin } from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { useExchangeRate } from '../../hooks/useExchangeRate'
import { siacoinToFiat } from '../../lib/currency'
import { ContentLayout } from '../ContentLayout'
import { type DatumProps, ExplorerDatum } from '../ExplorerDatum'
import { ContractHeader } from './ContractHeader'

type Props = {
  contract: SiaCentralContract
  rates?: SiaCentralExchangeRates
  renewedTo?: SiaCentralContract
  renewedFrom?: SiaCentralContract
}

export function Contract({ contract, rates, renewedFrom, renewedTo }: Props) {
  const exchange = useExchangeRate(rates)
  const values = useMemo(() => {
    return [
      {
        label: 'file size',
        copyable: false,
        value: humanBytes(contract.file_size),
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
        entityValue: contract.transaction_id,
      },
      {
        label: 'merkle root',
        value: contract.merkle_root,
      },
      {
        label: 'unlock hash',
        value: contract.unlock_hash,
      },
      {
        label: 'proof confirmed',
        copyable: false,
        value: String(contract.proof_confirmed),
      },
      {
        label: 'negotiation height',
        copyable: false,
        value: contract.negotiation_height?.toLocaleString() || '-',
      },
      {
        label: 'negotiation time',
        copyable: false,
        value:
          contract.negotiation_timestamp !== '0001-01-01T00:00:00Z'
            ? humanDate(contract.negotiation_timestamp, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })
            : '-',
      },
      {
        label: 'expiration height',
        copyable: false,
        value: contract.expiration_height?.toLocaleString() || '-',
      },
      {
        label: 'expiration time',
        copyable: false,
        value:
          contract.expiration_timestamp !== '0001-01-01T00:00:00Z'
            ? humanDate(contract.expiration_timestamp, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })
            : '-',
      },
      {
        label: 'proof height',
        copyable: false,
        value: contract.proof_height
          ? contract.proof_height.toLocaleString()
          : '-',
      },
      {
        label: 'proof time',
        copyable: false,
        value:
          contract.proof_timestamp !== '0001-01-01T00:00:00Z'
            ? humanDate(contract.proof_timestamp, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })
            : '-',
      },
      {
        label: 'proof deadline height',
        copyable: false,
        value: contract.proof_deadline?.toLocaleString() || '-',
      },
      {
        label: 'proof deadline time',
        copyable: false,
        value:
          contract.proof_deadline_timestamp !== '0001-01-01T00:00:00Z'
            ? humanDate(contract.proof_deadline_timestamp, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })
            : '-',
      },
      {
        label: 'payout height',
        copyable: false,
        value: contract.payout_height?.toLocaleString() || '-',
      },
      {
        label: 'payout time',
        copyable: false,
        value:
          contract.payout_timestamp !== '0001-01-01T00:00:00Z'
            ? humanDate(contract.payout_timestamp, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })
            : '-',
      },
      {
        label: 'revision number',
        value: contract.revision_number.toLocaleString(),
      },
      {
        label: 'previous revisions',
        copyable: false,
        value: (contract.previous_revisions?.length || 0).toLocaleString(),
      },
    ] as DatumProps[]
  }, [contract, exchange])

  const validProofOutputs = useMemo(() => {
    if (isProperlyFormedNewContract(contract)) {
      const { renterPayoutValid, hostPayoutValid } =
        getNewContractFormattedOutputs(contract)
      return [
        {
          label: 'renter payout: remaining renter allowance',
          initials: 'r',
          sc: new BigNumber(renterPayoutValid.value),
          hash: renterPayoutValid.output_id,
        },
        {
          label: 'host payout',
          initials: 'h',
          sc: new BigNumber(hostPayoutValid.value),
          hash: hostPayoutValid.output_id,
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
          sc: new BigNumber(renterPayoutValid.value),
          hash: renterPayoutValid.output_id,
        },
        {
          label: 'host payout',
          initials: 'h',
          sc: new BigNumber(hostPayoutValid.value),
          hash: hostPayoutValid.output_id,
        },
      ] as EntityListItemProps[]
    }
    return contract?.valid_proof_outputs?.map(genericOutputListItem) || []
  }, [contract])

  const missedProofOutputs = useMemo(() => {
    if (isProperlyFormedNewContract(contract)) {
      const { renterPayoutMissed, hostPayoutMissed, hostBurned } =
        getNewContractFormattedOutputs(contract)
      return [
        {
          label: 'renter payout: remaining renter allowance',
          initials: 'r',
          sc: new BigNumber(renterPayoutMissed.value),
          hash: renterPayoutMissed.output_id,
        },
        {
          label: `host payout: payout minus risked collateral and storage revenue`,
          initials: 'h',
          sc: new BigNumber(hostPayoutMissed.value),
          hash: hostPayoutMissed.output_id,
        },
        {
          label: 'host burn: host revenue plus risked collateral',
          initials: 'b',
          sc: new BigNumber(hostBurned.value),
          hash: hostBurned.output_id,
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
          sc: new BigNumber(renterPayoutMissed.value),
          hash: renterPayoutMissed.output_id,
        },
        {
          label: `host payout: payout minus risked collateral and storage revenue`,
          initials: 'h',
          sc: new BigNumber(hostPayoutMissed.value),
          hash: hostPayoutMissed.output_id,
        },
      ] as EntityListItemProps[]
    }
    return contract?.missed_proof_outputs?.map(genericOutputListItem) || []
  }, [contract])

  return (
    <ContentLayout
      panel={
        <div className="flex flex-col">
          <ContractHeader
            contract={contract}
            renewedFromId={renewedFrom?.id}
            renewedToId={renewedTo?.id}
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

function isProperlyFormedNewContract(contract: SiaCentralContract) {
  // renter payout, host payout
  if (contract.valid_proof_outputs?.length !== 2) {
    return false
  }
  // renter payout, host payout, and host burned
  if (contract.missed_proof_outputs?.length !== 3) {
    return false
  }

  const { renterPayoutValid, renterPayoutMissed } =
    getNewContractFormattedOutputs(contract)

  // renter payout valid and missed should be the same
  if (renterPayoutValid.value !== renterPayoutMissed.value) {
    return false
  }

  // math.MaxUint64 with lost precision
  const mathMaxUint64 = 18446744073709552000
  if (contract.revision_number >= mathMaxUint64) {
    return false
  }
  return true
}

function isProperlyFormedRenewedContract(contract: SiaCentralContract) {
  // renter payout, host payout
  if (contract.valid_proof_outputs?.length !== 2) {
    return false
  }
  // renter payout, host payout
  if (contract.missed_proof_outputs?.length !== 2) {
    return false
  }

  const {
    renterPayoutValid,
    renterPayoutMissed,
    hostPayoutValid,
    hostPayoutMissed,
  } = getRenewedContractFormattedOutputs(contract)

  // renter payout valid and missed should be the same
  if (renterPayoutValid.value !== renterPayoutMissed.value) {
    return false
  }

  // host payout valid and missed should be the same
  if (hostPayoutValid.value !== hostPayoutMissed.value) {
    return false
  }

  // math.MaxUint64 with lost precision
  const mathMaxUint64 = 18446744073709552000
  if (contract.revision_number !== mathMaxUint64) {
    return false
  }
  return true
}

function getNewContractFormattedOutputs(contract: SiaCentralContract) {
  return {
    renterPayoutValid: contract.valid_proof_outputs[0],
    renterPayoutMissed: contract.missed_proof_outputs[0],
    hostPayoutValid: contract.valid_proof_outputs[1],
    hostPayoutMissed: contract.missed_proof_outputs[1],
    hostBurned: contract.missed_proof_outputs[2],
  }
}

function getRenewedContractFormattedOutputs(contract: SiaCentralContract) {
  return {
    renterPayoutValid: contract.valid_proof_outputs[0],
    renterPayoutMissed: contract.missed_proof_outputs[0],
    hostPayoutValid: contract.valid_proof_outputs[1],
    hostPayoutMissed: contract.missed_proof_outputs[1],
  }
}

function genericOutputListItem(
  o: SiaCentralPartialSiacoinOutput,
): EntityListItemProps {
  return {
    label: o.source ? o.source.replace(/_/g, ' ') : 'output',
    sc: new BigNumber(o.value),
    hash: o.output_id,
  }
}
