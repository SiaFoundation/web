import { useMemo } from 'react'
import { getContractStatus, getTotalTransacted } from '../../../lib/transaction'
import { NvgContractResEntity } from '../../../config/navigatorTypes'
import { DatumProps } from '../../Datum'
import { TxEntityLayout } from '../../TxEntityLayout'
import { EntityListItemProps } from '@siafoundation/design-system'
import { getNvgEntityItemProps } from '../../../lib/utils'
import BigNumber from 'bignumber.js'

type Props = {
  entity: NvgContractResEntity
}

export function ContractResEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const list: DatumProps[] = [
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
    const list: EntityListItemProps[] = [
      getNvgEntityItemProps('contract', {
        // label: 'File Contract ID',
        hash: data[1].ContractId,
        sc: new BigNumber(
          -(data[1].Output0Value + data[1].Output1Value + data[1].Output2Value)
        ),
      }),
    ]
    return list
  }, [data])

  const outputs = useMemo(() => {
    const list: EntityListItemProps[] = []
    if (data[1].Result == 'fail') {
      list.push(
        getNvgEntityItemProps('address', {
          label: 'Renter address: returned allowance',
          hash: data[1].Output0Address,
          sc: new BigNumber(data[1].Output0Value),
        })
      )
      list.push(
        getNvgEntityItemProps('address', {
          label: 'Host address: unused collateral',
          hash: data[1].Output1Address,
          sc: new BigNumber(data[1].Output1Value),
        })
      )
    } else {
      list.push(
        getNvgEntityItemProps('address', {
          label: 'Renter address: unused allowance',
          hash: data[1].Output0Address,
          sc: new BigNumber(data[1].Output0Value),
        })
      )
      list.push(
        getNvgEntityItemProps('address', {
          label: 'Host address: payout + collateral back',
          hash: data[1].Output1Address,
          sc: new BigNumber(data[1].Output1Value),
        })
      )
    }
    if (data[1].Result == 'fail') {
      list.push(
        getNvgEntityItemProps('address', {
          label: 'Burning address: lost collateral',
          hash: data[1].Output2Address,
          sc: new BigNumber(data[1].Output2Value),
        })
      )
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
