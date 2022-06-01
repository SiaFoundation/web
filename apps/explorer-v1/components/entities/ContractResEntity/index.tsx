import { useMemo } from 'react'
import { getContractStatus, getTotalTransacted } from '../../../lib/transaction'
import { ContractResEntity } from '../../../config/types'
import { EntityListItem } from '../../EntityList'
import { ValueItemProps } from '../../Datum'
import { TxEntityLayout } from '../../TxEntityLayout'

type Props = {
  entity: ContractResEntity
}

export function ContractResEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const list: ValueItemProps[] = [
      {
        label: 'Total transacted',
        sc: getTotalTransacted(entity).sc,
      },
      {
        label: 'Status',
        value: getContractStatus(entity),
      },
      {
        label: 'Contract ID',
        entityType: 'contract',
        entityValue: data[1].ContractId,
      },
    ]
    return list
  }, [entity, data])

  const inputs = useMemo(() => {
    const list: EntityListItem[] = [
      {
        // label: 'File Contract ID',
        hash: data[1].ContractId,
        type: 'contract',
        sc: -BigInt(
          data[1].Output0Value + data[1].Output1Value + data[1].Output2Value
        ),
      },
    ]
    return list
  }, [data])

  const outputs = useMemo(() => {
    const list: EntityListItem[] = []
    if (data[1].Result == 'fail') {
      list.push({
        label: 'Renter address: returned allowance',
        hash: data[1].Output0Address,
        type: 'address',
        sc: BigInt(data[1].Output0Value),
      })
      list.push({
        label: 'Host address: unused collateral',
        hash: data[1].Output1Address,
        type: 'address',
        sc: BigInt(data[1].Output1Value),
      })
    } else {
      list.push({
        label: 'Renter address: unused allowance',
        hash: data[1].Output0Address,
        type: 'address',
        sc: BigInt(data[1].Output0Value),
      })
      list.push({
        label: 'Host address: payout + collateral back',
        hash: data[1].Output1Address,
        type: 'address',
        sc: BigInt(data[1].Output1Value),
      })
    }
    if (data[1].Result == 'fail') {
      list.push({
        label: 'Burning address: lost collateral',
        hash: data[1].Output2Address,
        type: 'address',
        sc: BigInt(data[1].Output2Value),
      })
    }
    return list
  }, [data])

  return (
    <TxEntityLayout
      entity={entity}
      values={values}
      inputs={inputs}
      outputs={outputs}
    />
  )
}
