import { useMemo } from 'react'
import {
  getEntityTxInputs,
  getEntityTxOutputs,
  getTotalTransacted,
} from '../../../lib/transaction'
import { NvgHostAnnEntity } from '../../../config/navigatorTypes'
import { DatumProps } from '../../NvgDatum'
import { TxEntityLayout } from '../../TxEntityLayout'
import { ValueCopyable } from '@siafoundation/design-system'

type Props = {
  entity: NvgHostAnnEntity
}

export function HostAnnEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const list: DatumProps[] = [
      {
        label: 'Total transacted',
        sc: getTotalTransacted(entity).sc,
      },
      {
        label: 'Announced IP',
        value: (
          <ValueCopyable
            scaleSize="18"
            label="IP"
            value={data[1].IP}
            maxLength={100}
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
