import { useMemo } from 'react'
import {
  getEntityTxOutputs,
  getTotalTransacted,
} from '../../../lib/transaction'
import { BlockRewardEntity } from '../../../config/types'
import { ValueItemProps } from '../../Datum'
import { TxEntityLayout } from '../../TxEntityLayout'
import { EntityListItem } from '../../EntityList'

type Props = {
  entity: BlockRewardEntity
}

export function BlockRewardEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const list: ValueItemProps[] = [
      {
        label: 'Total transacted',
        sc: getTotalTransacted(entity).sc,
      },
    ]
    return list
  }, [entity])

  const inputs = useMemo(() => {
    const list: EntityListItem[] = []
    let subsidy = 300000 - data[1].Height
    if (subsidy < 30000) {
      subsidy = 30000
    } // Minimal future subsidy
    subsidy = subsidy * 1000000000000000000000000

    // Adding Foundation subsidy to coinbase, if exists
    let foundationSubsidy = 0
    if (data[2].transactions.length == 2) {
      foundationSubsidy = data[2].transactions[1].ScChange
    }

    const fullSubsidy = subsidy + foundationSubsidy

    list.push({
      label: 'Coinbase',
      sc: -BigInt(fullSubsidy),
    })

    const minedFees = data[2].transactions[0].ScChange - subsidy
    list.push({
      label: 'Collected transaction fees',
      sc: -BigInt(minedFees),
    })
    return list
  }, [data])
  const outputs = useMemo(() => getEntityTxOutputs(entity), [entity])

  return (
    <TxEntityLayout
      entity={entity}
      values={values}
      inputs={inputs}
      outputs={outputs}
    />
  )
}
