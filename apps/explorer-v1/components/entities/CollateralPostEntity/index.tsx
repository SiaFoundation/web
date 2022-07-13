import { useMemo } from 'react'
import {
  getEntityTxInputs,
  getEntityTxOutputs,
  getTotalTransacted,
} from '../../../lib/transaction'
import { NvgCollateralPostEntity } from '../../../config/navigatorTypes'
import { DatumProps } from '../../NvgDatum'
import { TxEntityLayout } from '../../TxEntityLayout'

type Props = {
  entity: NvgCollateralPostEntity
}

export function CollateralPostEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const list: DatumProps[] = [
      {
        label: 'Total transacted',
        sc: getTotalTransacted(entity).sc,
      },
      {
        label: 'Collateral for contract ID',
        entityType: 'contract',
        entityValue: data[1].HashSynonyms.split(',')[0],
      },
    ]
    return list
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
