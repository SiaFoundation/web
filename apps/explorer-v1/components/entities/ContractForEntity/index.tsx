/* eslint-disable react/no-unescaped-entities */
import { EntityListItemProps, Text } from '@siafoundation/design-system'
import { humanBytes, humanNumber } from '@siafoundation/sia-js'
import { useMemo } from 'react'
import { DatumProps } from '../../NvgDatum'
import { getContractStatus } from '../../../lib/transaction'
import { NvgContractEntity } from '../../../config/navigatorTypes'
import { TxEntityLayout } from '../../TxEntityLayout'
import { ContractConditionsSection } from '../../ContractConditionsSection'
import { getNvgEntityItemProps } from '../../../lib/utils'
import BigNumber from 'bignumber.js'

type Props = {
  entity: NvgContractEntity
}

export function ContractForEntity({ entity }: Props) {
  const { data } = entity

  const incompleteData = !Object.keys(data[1]).length

  const values = useMemo(() => {
    if (incompleteData) return []
    const sfFees = new BigNumber(data[1].SfFees)
    const feesPercentage = sfFees
      .dividedBy(
        new BigNumber(
          data[1].ValidProof1Value +
            data[1].ValidProof2Value +
            data[1].Fees -
            data[1].HostValue
        ).plus(sfFees)
      )
      .multipliedBy(100)
      .toFixed(2) // This avoid some errors on contracts formed by `us`

    const list: DatumProps[] = [
      {
        label: 'Status',
        value: getContractStatus(entity),
      },
      {
        label: 'New / Renewal',
        value: data[1].Renew ? 'renewal' : 'new',
      },
      {
        label: 'File size at contract formation',
        value: humanBytes(data[1].OriginalFileSize),
      },
      {
        label: 'File size at last revision',
        value: humanBytes(data[1].CurrentFileSize),
      },
      {
        label: 'Last revision number',
        value: humanNumber(data[1].RevisionNum),
      },
      {
        label: 'Window for proof of storage',
        value:
          humanNumber(data[1].WindowStart) +
          ' - ' +
          humanNumber(data[1].WindowEnd),
      },
      {
        label: 'Total SC',
        sc: new BigNumber(data[1].RenterValue + data[1].HostValue),
      },
      {
        label: 'Fees paid to miners',
        sc: new BigNumber(data[1].Fees),
      },
      {
        label: 'Fees paid to SFs',
        sc: new BigNumber(data[1].SfFees),
        comment: `${feesPercentage}% of the renter's allowance`,
      },
    ]

    console.log(data)
    if (data[6]?.Height >= 0) {
      list.push({
        label: 'Renewed into Contract ID',
        entityType: 'contract',
        entityValue: data[6].ContractId,
      })
    }

    return list
  }, [entity, data, incompleteData])

  const details = useMemo(() => {
    if (incompleteData) {
      return (
        <div className="flex justify-center mb-2">
          <Text color="subtle" size="18">
            Error, the explorer ran into an issue collecting data about this
            contract.
          </Text>
        </div>
      )
    }
    return <ContractConditionsSection entity={entity} />
  }, [entity, incompleteData])

  const inputs = useMemo(() => {
    if (incompleteData) return []
    const list: EntityListItemProps[] = [
      getNvgEntityItemProps('allowancePost', {
        // label: 'Renter: allowance posting hash',
        hash: data[1].AllowancePosting,
        sc: new BigNumber(-data[1].RenterValue),
      }),
    ]

    if (data[1].Renter2Value > 0) {
      // Tri-input contracts
      list.push(
        getNvgEntityItemProps('allowancePost', {
          // label: 'Renter: allowance posting hash',
          hash: data[1].Allowance2Posting,
          sc: new BigNumber(-data[1].Renter2Value),
        })
      )
    }

    if (data[1].Renter3Value > 0) {
      // Quad-input contracts
      list.push(
        getNvgEntityItemProps('allowancePost', {
          // label: 'Renter: allowance posting hash',
          hash: data[1].Allowance3Posting,
          sc: new BigNumber(-data[1].Renter3Value),
        })
      )
    }

    list.push(
      getNvgEntityItemProps('collateralPost', {
        // label: 'Host: collateral posting hash',
        hash: data[1].CollateralPosting,
        sc: new BigNumber(-data[1].HostValue),
      })
    )

    return list
  }, [data, incompleteData])

  const outputs = useMemo(() => {
    if (incompleteData) {
      return []
    }
    const list: EntityListItemProps[] = [
      getNvgEntityItemProps('contract', {
        label: 'Formed contract ID',
        hash: data[1].ContractId,
        sc: new BigNumber(data[1].ValidProof1Value + data[1].ValidProof2Value),
      }),
    ]

    // Exceptional contracts where some amount returns to the renter address in the contract formation
    if (data[5]?.transactions.length > 0) {
      for (let i = 0; i < data[5].transactions.length; i++) {
        list.push(
          getNvgEntityItemProps('address', {
            label: 'Renter address',
            hash: data[5].transactions[i].Address,
            sc: new BigNumber(data[5].transactions[i].ScChange),
          })
        )
      }
    }

    // SiaFund fees
    list.push({
      label: 'Fees paid to SFs',
      sc: new BigNumber(data[1].SfFees),
    })

    // Miner fees
    list.push({
      label: 'Fees paid to miners',
      sc: new BigNumber(data[1].Fees),
    })

    return list
  }, [data, incompleteData])

  const operations = useMemo(() => {
    if (incompleteData) {
      return []
    }
    const list: EntityListItemProps[] = []
    if (data[2]?.Height >= 0) {
      // Only if there is a Revision
      list.push(
        getNvgEntityItemProps('revision', {
          hash: data[2].MasterHash,
          height: data[2].Height,
          timestamp: data[2].Timestamp * 1000,
        })
      )
    }
    if (data[4]?.Height >= 0) {
      // Only if there is an Storage Proof
      list.push(
        getNvgEntityItemProps('storageproof', {
          hash: data[4].MasterHash,
          height: data[4].Height,
          timestamp: data[4].Timestamp * 1000,
        })
      )
    }
    if (data[6]?.Height >= 0) {
      // Only if there is an atomic renewal
      list.push(
        getNvgEntityItemProps('contractrenewal', {
          hash: data[6].ContractId,
          height: data[6].Height,
          timestamp: data[6].Timestamp * 1000,
        })
      )
    }
    if (data[3]?.Height >= 0) {
      // Only if there is a Resolution
      list.push(
        getNvgEntityItemProps('contractresol', {
          hash: data[3].MasterHash,
          height: data[3].Height,
          timestamp: data[3].Timestamp * 1000,
        })
      )
    }
    return list
  }, [data, incompleteData])

  return (
    <TxEntityLayout
      entity={entity}
      values={values}
      details={details}
      inputs={inputs}
      outputs={outputs}
      relatedOperations={operations}
    />
  )
}
