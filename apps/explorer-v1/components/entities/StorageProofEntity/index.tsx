import { useMemo } from 'react'
import {
  getEntityTxInputs,
  getEntityTxOutputs,
  getTotalTransacted,
} from '../../../lib/transaction'
import { NvgStorageProofEntity } from '../../../config/navigatorTypes'
import { DatumProps } from '../../NvgDatum'
import { TxEntityLayout } from '../../TxEntityLayout'

type Props = {
  entity: NvgStorageProofEntity
}

export function StorageProofEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const list: DatumProps[] = [
      {
        label: 'Total transacted',
        sc: getTotalTransacted(entity).sc,
      },
      {
        label: 'Proof for contract ID',
        entityType: 'contract',
        entityValue: data[1].ContractId,
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
