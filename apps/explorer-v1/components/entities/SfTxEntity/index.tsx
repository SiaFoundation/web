import { useMemo } from 'react'
import { NvgSfTxEntity } from '../../../config/navigatorTypes'
import { TxEntityLayout } from '../../TxEntityLayout'
import {
  getEntityTxInputs,
  getEntityTxOutputs,
  getTotalTransacted,
} from '../../../lib/transaction'
import BigNumber from 'bignumber.js'

type Props = {
  entity: NvgSfTxEntity
}

export function SfTxEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const totals = getTotalTransacted(entity)

    return [
      {
        label: 'Transacted SC',
        sc: totals.sc,
      },
      {
        label: 'Transacted SF',
        sf: totals.sf,
      },
      {
        label: 'Fees',
        sc: new BigNumber(data[1].Fees),
      },
    ]
  }, [entity, data])

  const inputs = useMemo(() => getEntityTxInputs(entity), [entity])
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
