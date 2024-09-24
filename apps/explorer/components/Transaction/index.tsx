'use client'

import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import {
  EntityList,
  EntityListItemProps,
  stripPrefix,
} from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { ContentLayout } from '../ContentLayout'
import { TransactionHeader, TransactionHeaderData } from './TransactionHeader'
import { OutputListItem } from './OutputListItem'
import { ExplorerTransaction } from '@siafoundation/explored-types'

type Props = {
  transactionHeaderData: TransactionHeaderData
  transaction: ExplorerTransaction
  title?: string
}

type OutputItem = {
  label: string
  addressHref: string
  address: string
  sc?: BigNumber
  sf?: number
  outputId: string
}

export function Transaction({
  title,
  transaction,
  transactionHeaderData,
}: Props) {
  const inputs = useMemo(() => {
    if (!transaction) {
      return []
    }
    const list: OutputItem[] = []
    transaction.siacoinInputs?.forEach((o) => {
      list.push({
        label: 'siacoin output',
        addressHref: routes.address.view.replace(':id', o.address),
        address: o.address,
        sc: new BigNumber(o.value),
        outputId: o.parentID,
      })
    })
    transaction.siafundInputs?.forEach((o) => {
      list.push({
        label: 'siafund output',
        addressHref: routes.address.view.replace(':id', o.address),
        address: o.address,
        sc: new BigNumber(o.value),
        outputId: o.parentID,
      })
    })
    return list
  }, [transaction])

  const outputs = useMemo(() => {
    if (!transaction) {
      return []
    }
    const list: OutputItem[] = []
    transaction.siacoinOutputs?.forEach((o) => {
      list.push({
        label:
          o.source === 'transaction'
            ? 'siacoin output'
            : o.source.replace(/_/g, ' '),
        addressHref: routes.address.view.replace(
          ':id',
          o.siacoinOutput.address
        ),
        address: o.siacoinOutput.address,
        sc: new BigNumber(o.siacoinOutput.value),
        outputId: o.id,
      })
    })
    transaction.siafundOutputs?.forEach((o) => {
      list.push({
        label: 'siafund output',
        addressHref: routes.address.view.replace(
          ':id',
          o.siafundOutput.address
        ),
        address: o.siafundOutput.address,
        sf: Number(o.siafundOutput.value),
        outputId: o.id,
      })
    })
    return list
  }, [transaction])

  const operations = useMemo(() => {
    if (!transaction) {
      return []
    }
    const operations: EntityListItemProps[] = []
    transaction.fileContracts?.forEach((contract) => {
      operations.push({
        label: 'contract formation',
        type: 'contract',
        href: routes.contract.view.replace(':id', stripPrefix(contract.id)),
        hash: contract.id,
      })
    })
    transaction.fileContractRevisions?.forEach((contract) => {
      operations.push({
        label: 'contract revision',
        type: 'contract',
        href: routes.contract.view.replace(':id', stripPrefix(contract.id)),
        hash: contract.id,
      })
    })
    transaction.hostAnnouncements?.forEach((host) => {
      operations.push({
        label: 'host announcement',
        // type: 'host',
        hash: host.netAddress,
      })
    })
    transaction.storageProofs?.forEach((proof) => {
      operations.push({
        label: 'storage proof',
        hash: proof.parentID,
      })
    })
    return operations
  }, [transaction])

  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-16">
          <TransactionHeader
            title={title}
            transactionHeaderData={transactionHeaderData}
          />
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
          <div>
            <EntityList title={`Inputs (${inputs.length})`} dataset={inputs}>
              {inputs?.map((i) => (
                <OutputListItem key={i.outputId} {...i} />
              ))}
            </EntityList>
          </div>
          <div>
            <EntityList title={`Outputs (${outputs.length})`} dataset={outputs}>
              {outputs?.map((o) => (
                <OutputListItem key={o.outputId} {...o} />
              ))}
            </EntityList>
          </div>
        </div>
        {!!operations?.length && (
          <EntityList
            title={`Related operations (${operations.length})`}
            dataset={operations}
          />
        )}
      </div>
    </ContentLayout>
  )
}
