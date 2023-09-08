'use client'

import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import {
  SiaCentralContract,
  SiaCentralExchangeRates,
} from '@siafoundation/sia-central'
import { humanBytes, humanDate, humanSiacoin } from '@siafoundation/sia-js'
import { EntityList, EntityListItemProps } from '@siafoundation/design-system'
import { DatumProps, ExplorerDatum } from '../ExplorerDatum'
import { ContentLayout } from '../ContentLayout'
import { ContractHeader } from './ContractHeader'
import { siacoinToDollars } from '../../lib/currency'

type Props = {
  contract: SiaCentralContract
  rates: SiaCentralExchangeRates
  renewedTo?: SiaCentralContract
  renewedFrom?: SiaCentralContract
}

export function Contract({ contract, rates, renewedFrom, renewedTo }: Props) {
  const values = useMemo(() => {
    return [
      {
        label: 'File Size',
        copyable: false,
        value: humanBytes(contract.file_size),
      },
      {
        label: 'Payout',
        copyable: false,
        value: `${siacoinToDollars(contract.payout, rates)} (${humanSiacoin(
          contract.payout
        )})`,
      },
      {
        label: 'Transaction ID',
        entityType: 'transaction',
        entityValue: contract.transaction_id,
      },
      {
        label: 'Merkle Root',
        value: contract.merkle_root,
      },
      {
        label: 'Unlock Hash',
        value: contract.unlock_hash,
      },
      {
        label: 'Revision Number',
        value: contract.revision_number.toLocaleString(),
      },
      {
        label: 'Negotiation Height',
        value: contract.negotiation_height?.toLocaleString() || '-',
      },
      {
        label: 'Negotiation Time',
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
        label: 'Payout Height',
        value: contract.payout_height?.toLocaleString() || '-',
      },
      {
        label: 'Payout Time',
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
        label: 'Proof Confirmed',
        value: String(contract.proof_confirmed),
      },
      {
        label: 'Previous Revisions',
        copyable: false,
        value: (contract.previous_revisions?.length || 0).toLocaleString(),
      },
    ] as DatumProps[]
  }, [contract, rates])

  const missedProofOutputs = useMemo(() => {
    if (!contract) {
      return []
    }
    const list: EntityListItemProps[] = []
    contract.missed_proof_outputs?.forEach((o) => {
      list.push({
        label: o.source ? o.source.replace(/_/g, ' ') : 'output',
        sc: new BigNumber(o.value),
        hash: o.output_id,
      })
    })
    return list
  }, [contract])

  const validProofOutputs = useMemo(() => {
    if (!contract) {
      return []
    }
    const list: EntityListItemProps[] = []
    contract.valid_proof_outputs?.forEach((o) => {
      list.push({
        label: o.source ? o.source.replace(/_/g, ' ') : 'output',
        sc: new BigNumber(o.value),
        hash: o.output_id,
      })
    })
    return list
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
              entities={missedProofOutputs}
            />
          </div>
          <div>
            <EntityList
              title={`Valid proof outputs (${validProofOutputs.length})`}
              entities={validProofOutputs}
            />
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}
