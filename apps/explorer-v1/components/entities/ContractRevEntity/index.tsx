import { useMemo } from 'react'
import { DatumProps } from '../../Datum'
import {
  getEntityTxInputs,
  getEntityTxOutputs,
  getTotalTransacted,
} from '../../../lib/transaction'
import { NvgRevisionEntity } from '../../../config/navigatorTypes'
import { TxEntityLayout } from '../../TxEntityLayout'
import { ContractConditionsSection } from '../../ContractConditionsSection'

type Props = {
  entity: NvgRevisionEntity
}

export function ContractRevEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const list: DatumProps[] = [
      {
        label: 'Total transacted',
        sc: getTotalTransacted(entity).sc,
      },
      {
        label: 'New revision number',
        value: data[1].NewRevisionNum,
      },
      {
        label: 'New file size',
        value: data[1].NewFileSize,
      },
      {
        label: 'Contract ID',
        entityType: 'contract',
        entityValue: data[1].ContractId,
      },
    ]
    return list
  }, [entity, data])

  const details = useMemo(() => {
    return <ContractConditionsSection entity={entity} />
  }, [entity])

  const inputs = useMemo(() => {
    return getEntityTxInputs(entity)
  }, [entity])

  const outputs = useMemo(() => {
    return getEntityTxOutputs(entity)
  }, [entity])

  return (
    <TxEntityLayout
      entity={entity}
      details={details}
      values={values}
      inputs={inputs}
      outputs={outputs}
    />
  )
}
