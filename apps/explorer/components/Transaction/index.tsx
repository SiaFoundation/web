'use client'

import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { Panel, stripPrefix, Text } from '@siafoundation/design-system'
import { EntityList } from '../Entity/EntityList'
import { EntityListItemProps } from '../Entity/EntityListItem'
import { routes } from '../../config/routes'
import { ContentLayout } from '../ContentLayout'
import { TransactionHeader, TransactionHeaderData } from './TransactionHeader'
import { OutputListItem } from './OutputListItem'
import {
  ExplorerFileContractRevision,
  ExplorerTransaction,
  ExplorerV2Transaction,
  V2FileContractRevision,
} from '@siafoundation/explored-types'
import { getTransactionSummary } from '../../lib/tx'
import { EntityType } from '@siafoundation/units'
import { ExplorerAccordion } from '../ExplorerAccordion'
import { ExplorerTextarea } from '../ExplorerTextarea'

type Props = {
  transactionHeaderData: TransactionHeaderData
  transaction: ExplorerTransaction | ExplorerV2Transaction
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
        label: 'siacoin input',
        addressHref: routes.address.view.replace(
          ':id',
          stripPrefix(
            'parent' in o ? o.parent.siacoinOutput.address : o.address
          )
        ),
        address: 'parent' in o ? o.parent.siacoinOutput.address : o.address,
        sc: new BigNumber(
          'parent' in o ? o.parent.siacoinOutput.value : o.value
        ),
        outputId: 'parent' in o ? o.parent.id : o.parentID,
      })
    })
    transaction.siafundInputs?.forEach((o) => {
      list.push({
        label: 'siafund input',
        addressHref: routes.address.view.replace(
          ':id',
          stripPrefix(
            'parent' in o ? o.parent.siafundOutput.address : o.address
          )
        ),
        address: 'parent' in o ? o.parent.siafundOutput.address : o.address,
        sf: Number('parent' in o ? o.parent.siafundOutput.value : o.value),
        outputId: 'parent' in o ? o.parent.id : o.parentID,
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
          'source' in o
            ? o.source === 'transaction'
              ? 'siacoin output'
              : o.source.replace(/_/g, ' ')
            : 'siacoin output',
        addressHref: routes.address.view.replace(
          ':id',

          o.siacoinOutput.address
        ),
        address: o.siacoinOutput.address,
        sc: new BigNumber(o.siacoinOutput.value),
        outputId: 'id' in o && o.id ? o.id : '',
      })
    })
    transaction.siafundOutputs?.forEach((o) => {
      list.push({
        label: 'siafund output',
        addressHref: routes.address.view.replace(
          ':id',
          stripPrefix(o.siafundOutput.address)
        ),
        address: o.siafundOutput.address,
        sf: Number(o.siafundOutput.value),
        outputId: 'id' in o && o.id ? o.id : '',
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
      if ('id' in contract) {
        return operations.push({
          label: 'contract formation',
          type: 'contract',
          href: routes.contract.view.replace(':id', stripPrefix(contract.id)),
          hash: contract.id,
        })
      }
    })
    transaction.fileContractRevisions?.forEach(
      (contract: ExplorerFileContractRevision | V2FileContractRevision) => {
        if ('parent' in contract) {
          return operations.push({
            label: 'contract revision',
            type: 'contract',
            href: routes.contract.view.replace(
              ':id',
              stripPrefix(contract.parent.id)
            ),
            hash: contract.parent.id,
          })
        }
        return operations.push({
          label: 'contract revision',
          type: 'contract',
          href: routes.contract.view.replace(':id', stripPrefix(contract.id)),
          hash: contract.id,
        })
      }
    )
    transaction.hostAnnouncements?.forEach((host) => {
      operations.push({
        label: 'host announcement',
        // type: 'host',
        hash:
          'netAddress' in host
            ? host.netAddress
            : host.V2HostAnnouncement.filter(
                (ha) => ha.protocol === 'siamux'
              )[0].address,
      })
    })
    {
      'storageProofs' in transaction &&
        transaction.storageProofs?.forEach((proof) => {
          operations.push({
            label: 'storage proof',
            hash: proof.parentID,
          })
        })
    }
    return operations
  }, [transaction])

  const summary: EntityListItemProps[] = useMemo(() => {
    const { sf, sc } = getTransactionSummary(transaction)

    const sfItems = sf.map((item) => ({
      type: 'address' as EntityType,
      hash: item.address,
      href: routes.address.view.replace(':id', item.address),
      sf: item.sf,
    }))

    const scItems = sc.map((item) => ({
      type: 'address' as EntityType,
      hash: item.address,
      href: routes.address.view.replace(':id', item.address),
      sc: item.sc,
    }))

    return [...sfItems, ...scItems]
  }, [transaction])

  const JSONAccordion = (
    <ExplorerAccordion title="JSON">
      <div className="p-2">
        <ExplorerTextarea value={JSON.stringify(transaction, null, 2)} />
      </div>
    </ExplorerAccordion>
  )

  // An "empty" transaction.
  if (!inputs.length && !outputs.length && !operations.length) {
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
          <Panel className="p-4 flex justify-center">
            <Text size="16" color="subtle">
              No activity
            </Text>
          </Panel>
          {JSONAccordion}
        </div>
      </ContentLayout>
    )
  }

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
        <EntityList
          title="Summary"
          emptyMessage="No address activity recorded in this transaction"
          dataset={summary}
        />
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
        {JSONAccordion}
      </div>
    </ContentLayout>
  )
}
