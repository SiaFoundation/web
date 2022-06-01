import { useMemo } from 'react'
import {
  getEntityTxInputs,
  getEntityTxOutputs,
  getTotalTransacted,
} from '../../../lib/transaction'
import { HostAnnEntity } from '../../../config/types'
import { ValueItemProps } from '../../Datum'
import { TxEntityLayout } from '../../TxEntityLayout'
import { ValueCopyable } from '../../ValueCopyable'

type Props = {
  entity: HostAnnEntity
}

export function HostAnnEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const list: ValueItemProps[] = [
      {
        label: 'Total transacted',
        sc: getTotalTransacted(entity).sc,
      },
      {
        label: 'Announced IP',
        value: (
          <ValueCopyable
            size="24"
            value={data[1].IP}
            maxLength={100}
            type="IP"
          />
        ),
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
