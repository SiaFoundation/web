'use client'

import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { SiaCentralTransaction } from '@siafoundation/sia-central'
import { EntityList, EntityListItemProps } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { ContentLayout } from '../ContentLayout'
import { TransactionHeader } from './TransactionHeader'

type Props = {
  transaction: SiaCentralTransaction
  title?: string
}

export function Transaction({ title, transaction }: Props) {
  const inputs = useMemo(() => {
    if (!transaction) {
      return []
    }
    const list: EntityListItemProps[] = []
    transaction.siacoin_inputs?.forEach((o) => {
      list.push({
        label:
          o.source === 'transaction'
            ? 'siacoin output'
            : o.source.replace(/_/g, ' '),
        sc: new BigNumber(o.value),
        hash: o.output_id,
      })
    })
    transaction.siafund_inputs?.forEach((o) => {
      list.push({
        label: 'siafund output',
        sc: new BigNumber(o.value),
        hash: o.output_id,
      })
    })
    return list
  }, [transaction])

  const outputs = useMemo(() => {
    if (!transaction) {
      return []
    }
    const list: EntityListItemProps[] = []
    transaction.siacoin_outputs?.forEach((o) => {
      list.push({
        label:
          o.source === 'transaction'
            ? 'siacoin output'
            : o.source.replace(/_/g, ' '),
        sc: new BigNumber(o.value),
        hash: o.output_id,
      })
    })
    transaction.siafund_outputs?.forEach((o) => {
      list.push({
        label: 'siafund output',
        sf: Number(o.value),
        hash: o.output_id,
      })
    })
    return list
  }, [transaction])

  const operations = useMemo(() => {
    if (!transaction) {
      return []
    }
    const operations: EntityListItemProps[] = []
    transaction.storage_contracts?.forEach((contract) => {
      operations.push({
        label: 'contract formation',
        type: 'contract',
        href: routes.contract.view.replace(':id', contract.id),
        hash: contract.id,
      })
    })
    transaction.contract_revisions?.forEach((contract) => {
      operations.push({
        label: 'contract revision',
        type: 'contract',
        href: routes.contract.view.replace(':id', contract.id),
        hash: contract.id,
      })
    })
    transaction.host_announcements?.forEach((host) => {
      operations.push({
        label: 'host announcement',
        // type: 'host',
        hash: host.net_address,
      })
    })
    transaction.storage_proofs?.forEach((proof) => {
      operations.push({
        label: 'storage proof',
        hash: proof.transaction_id,
      })
    })
    return operations
  }, [transaction])

  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-16">
          <TransactionHeader title={title} transaction={transaction} />
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
          <div>
            <EntityList title={`Inputs (${inputs.length})`} entities={inputs} />
          </div>
          <div>
            <EntityList
              title={`Outputs (${outputs.length})`}
              entities={outputs}
            />
          </div>
        </div>
        {!!operations?.length && (
          <EntityList
            title={`Related operations (${operations.length})`}
            entities={operations}
          />
        )}
      </div>
    </ContentLayout>
  )
}
