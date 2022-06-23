/* eslint-disable react/no-unescaped-entities */
import { humanBytes, humanNumber, toSiacoins } from '@siafoundation/sia-js'
import { useMemo } from 'react'
import { ValueItemProps } from '../../Datum'
import { getContractStatus } from '../../../lib/transaction'
import { ContractEntity } from '../../../config/types'
import { EntityListItem } from '../../EntityList'
import { TxEntityLayout } from '../../TxEntityLayout'
import { ContractConditionsSection } from '../../ContractConditionsSection'

type Props = {
  entity: ContractEntity
}

export function ContractForEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const sfFees = toSiacoins(data[1].SfFees)
    const feesPercentage = sfFees
      .dividedBy(
        toSiacoins(
          data[1].ValidProof1Value +
            data[1].ValidProof2Value +
            data[1].Fees -
            data[1].HostValue
        ).plus(sfFees)
      )
      .multipliedBy(100)
      .toFixed(2) // This avoid some errors on contracts formed by `us`

    const list: ValueItemProps[] = [
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
        sc: BigInt(data[1].RenterValue + data[1].HostValue),
      },
      {
        label: 'Fees paid to miners',
        sc: BigInt(data[1].Fees),
      },
      {
        label: 'Fees paid to SFs',
        sc: BigInt(data[1].SfFees),
        comment: `${feesPercentage}% of the renter's allowance`,
      },
    ]

    if (data[6].Height >= 0) {
      list.push({
        label: 'Renewed into Contract ID',
        entityType: 'contract',
        entityValue: data[6].ContractId,
      })
    }

    return list
  }, [entity, data])

  const details = useMemo(() => {
    return <ContractConditionsSection entity={entity} />
  }, [entity])

  const inputs = useMemo(() => {
    const list: EntityListItem[] = [
      {
        // label: 'Renter: allowance posting hash',
        hash: data[1].AllowancePosting,
        type: 'allowancePost',
        sc: -BigInt(data[1].RenterValue),
      },
    ]

    if (data[1].Renter2Value > 0) {
      // Tri-input contracts
      list.push({
        // label: 'Renter: allowance posting hash',
        hash: data[1].Allowance2Posting,
        type: 'allowancePost',
        sc: -BigInt(data[1].Renter2Value),
      })
    }

    if (data[1].Renter3Value > 0) {
      // Quad-input contracts
      list.push({
        // label: 'Renter: allowance posting hash',
        hash: data[1].Allowance3Posting,
        type: 'allowancePost',
        sc: -BigInt(data[1].Renter3Value),
      })
    }

    list.push({
      // label: 'Host: collateral posting hash',
      hash: data[1].CollateralPosting,
      type: 'collateralPost',
      sc: -BigInt(data[1].HostValue),
    })

    return list
  }, [data])

  const outputs = useMemo(() => {
    const list: EntityListItem[] = [
      {
        label: 'Formed contract ID',
        hash: data[1].ContractId,
        type: 'contract',
        sc: BigInt(data[1].ValidProof1Value + data[1].ValidProof2Value),
      },
    ]

    // Exceptional contracts where some amount returns to the renter address in the contract formation
    if (data[5].transactions.length > 0) {
      for (let i = 0; i < data[5].transactions.length; i++) {
        list.push({
          label: 'Renter address',
          hash: data[5].transactions[i].Address,
          type: 'address',
          sc: BigInt(data[5].transactions[i].ScChange),
        })
      }
    }

    // SiaFund fees
    list.push({
      label: 'Fees paid to SFs',
      sc: BigInt(data[1].SfFees),
    })

    // Miner fees
    list.push({
      label: 'Fees paid to miners',
      sc: BigInt(data[1].Fees),
    })

    return list
  }, [data])

  const operations = useMemo(() => {
    const list: EntityListItem[] = []
    if (data[2].Height >= 0) {
      // Only if there is a Revision
      list.push({
        type: 'revision',
        hash: data[2].MasterHash,
        height: data[2].Height,
        timestamp: data[2].Timestamp,
      })
    }
    if (data[4].Height >= 0) {
      // Only if there is an Storage Proof
      list.push({
        type: 'storageproof',
        hash: data[4].MasterHash,
        height: data[4].Height,
        timestamp: data[4].Timestamp,
      })
    }
    if (data[6].Height >= 0) {
      // Only if there is an atomic renewal
      list.push({
        type: 'contractrenewal',
        hash: data[6].ContractId,
        height: data[6].Height,
        timestamp: data[6].Timestamp,
      })
    }
    if (data[3].Height >= 0) {
      // Only if there is a Resolution
      list.push({
        type: 'contractresol',
        hash: data[3].MasterHash,
        height: data[3].Height,
        timestamp: data[3].Timestamp,
      })
    }
    return list
  }, [data])

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
