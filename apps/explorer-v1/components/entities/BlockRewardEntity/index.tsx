import { useMemo } from 'react'
import {
  getEntityTxOutputs,
  getTotalTransacted,
} from '../../../lib/transaction'
import { NvgBlockRewardEntity } from '../../../config/navigatorTypes'
import { DatumProps } from '../../NvgDatum'
import { TxEntityLayout } from '../../TxEntityLayout'
import { EntityListItemProps } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'

type Props = {
  entity: NvgBlockRewardEntity
}

export function BlockRewardEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const list: DatumProps[] = [
      {
        label: 'Total transacted',
        sc: getTotalTransacted(entity).sc,
      },
    ]
    return list
  }, [entity])

  const inputs = useMemo(() => {
    const list: EntityListItemProps[] = []
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
      sc: new BigNumber(-fullSubsidy),
    })

    const minedFees = data[2].transactions[0].ScChange - subsidy
    list.push({
      label: 'Collected transaction fees',
      sc: new BigNumber(-minedFees),
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
