import { EntityListItemProps } from '@siafoundation/design-system'
import {
  NvgContractEntity,
  Entity,
  NvgEntityTxns2Index,
  NvgEntityType,
  NvgRevisionEntity,
  getNvgEntityTypeInitials,
  getNvgEntityTypeLabel,
} from '../config/navigatorTypes'
import { getHrefForType } from './utils'
import BigNumber from 'bignumber.js'

// Adapted from https://github.com/hakkane84/navigator-sia/blob/3f6ae63a48426c8810f0bd11de55a4b69b736200/web/nav_assets/navigator_web.js#L1571
// commented out unreachable cases
export function getContractStatus(tx: Entity): string {
  if (!['contractresol', 'contract'].includes(tx.type)) {
    return 'err'
  }
  if (tx.type === 'contract') {
    const { data } = tx
    // if (data[1].Result === 'fail' || data[1].Status === 'complete-fail') {
    if (data[1].Status === 'complete-fail') {
      // if (data[1].MissedProof3Value === 0 || data[1].Output2Value === '0') {
      if (data[1].MissedProof3Value === 0) {
        return 'Unused'
      } else {
        return 'Failed'
      }
    } else if (
      // data[1].Result === 'success' ||
      data[1].Status === 'complete-succ'
    ) {
      if (
        // data[1].MissedProof2Value === data[1].ValidProof2Value || data[0].Type === 'contractresol'
        data[1].MissedProof2Value === data[1].ValidProof2Value
      ) {
        return 'Unused'
      } else {
        return 'Successful'
      }
    } else if (data[1].Status === 'ongoing') {
      return 'Ongoing'
    }
  } else if (tx.type === 'contractresol') {
    const { data } = tx
    // Contract resolutions
    if (data[1].Result === 'success') {
      return 'Successful'
    } else {
      return 'Failed'
    }
  } else {
    return 'err'
  }
}

export function getTotalTransacted(entity: NvgEntityTxns2Index) {
  const { data } = entity
  let sc = new BigNumber(0)
  let sf = 0
  for (let n = 0; n < data[2].transactions.length; n++) {
    if (data[2].transactions[n].ScChange > 0) {
      sc = sc.plus(data[2].transactions[n].ScChange)
    } else if (data[2].transactions[n].SfChange > 0) {
      sf = sf + data[2].transactions[n].SfChange
    }
  }
  if (data[1].Fees) {
    sc = sc.plus(data[1].Fees)
  }
  return {
    sc,
    sf,
  }
}

export function getContractConditions({
  data,
}: NvgContractEntity | NvgRevisionEntity) {
  return {
    // Conditions upon success
    success: {
      returnedAllowance: data[1].ValidProof1Value,
      payoutCollateral: data[1].ValidProof2Value,
    },
    // Conditions upon fail
    fail: {
      returnedAllowance: data[1].MissedProof1Value,
      returnedCollateral: data[1].MissedProof2Value,
      burntCollateral: data[1].MissedProof3Value,
    },
  }
}

export function getEntityTxInputs({ type, data }: NvgEntityTxns2Index) {
  const inputs: EntityListItemProps[] = []

  for (let n = 0; n < data[2].transactions.length; n++) {
    const hash = data[2].transactions[n].Address

    // Identifying senders
    if (
      data[2].transactions[n].ScChange < 0 ||
      data[2].transactions[n].SfChange < 0
    ) {
      let sc = new BigNumber(0)
      let sf = 0
      let label = getNvgEntityTypeLabel('address')

      if (data[2].transactions[n].ScChange < 0) {
        sc = new BigNumber(data[2].transactions[n].ScChange) // Push the change in SC
      } else if (data[2].transactions[n].SfChange < 0) {
        sf = data[2].transactions[n].SfChange // Push the change in SF
      }

      // Naming the sending object
      if (type == 'ScTx' || type == 'SfTx') {
        label = 'sender address'
      } else if (type == 'host ann') {
        label = 'host address'
      } else if (type == 'allowancePost') {
        label = 'renter address'
      } else if (type == 'collateralPost' || type == 'storageproof') {
        label = 'host address'
      } else if (type == 'revision') {
        label = 'address'
      }

      inputs.push({
        label,
        initials: getNvgEntityTypeInitials('address'),
        href: getHrefForType('address', hash),
        sc,
        sf,
        hash,
      })
    }
  }

  return inputs
}

export function getEntityTxOutputs({
  type: entityType,
  data,
}: NvgEntityTxns2Index) {
  const outputs: EntityListItemProps[] = []

  for (let n = 0; n < data[2].transactions.length; n++) {
    let hash = data[2].transactions[n].Address

    // In contracts, instead of the destination address I show the final contract ID
    if (
      (entityType == 'allowancePost' || entityType == 'collateralPost') &&
      data[2].transactions[n].TxType == 'contractform'
    ) {
      hash = data[1].HashSynonyms
    }

    // Identifying receivers
    if (
      data[2].transactions[n].ScChange > 0 ||
      data[2].transactions[n].SfChange > 0
    ) {
      let label = getNvgEntityTypeLabel('address')
      let type = 'address' as NvgEntityType
      let sc = new BigNumber(0)
      let sf = 0
      if (data[2].transactions[n].ScChange > 0) {
        sc = new BigNumber(data[2].transactions[n].ScChange) // Push the change in SC
      } else if (data[2].transactions[n].SfChange > 0) {
        sf = data[2].transactions[n].SfChange // Push the change in SF
      }

      if (entityType == 'ScTx') {
        label = 'receiver address'
        type = 'address'
      } else if (
        entityType == 'SfTx' &&
        data[2].transactions[n].TxType != 'SfClaim' &&
        data[2].transactions[n].SfChange > 0
      ) {
        label = 'receiver address'
        type = 'address'
      } else if (
        entityType == 'SfTx' &&
        data[2].transactions[n].TxType != 'SfClaim' &&
        data[2].transactions[n].ScChange > 0
      ) {
        label = 'sender wallet return (unspent output)'
        type = 'address'
      } else if (
        entityType == 'SfTx' &&
        data[2].transactions[n].TxType == 'SfClaim'
      ) {
        type = 'address'
        label = 'SiaFund dividend claim address (sender)'
      } else if (entityType == 'host ann') {
        label = 'host address'
        type = 'address'
      } else if (
        entityType == 'allowancePost' &&
        data[2].transactions[n].TxType != 'contractform'
      ) {
        type = 'address'
        label = 'renter address'
      } else if (
        entityType == 'allowancePost' &&
        data[2].transactions[n].TxType == 'contractform'
      ) {
        type = 'contract'
        label = 'allowance for contract ID'
      } else if (
        entityType == 'collateralPost' &&
        data[2].transactions[n].TxType != 'contractform'
      ) {
        type = 'address'
        label = 'host address'
      } else if (
        entityType == 'collateralPost' &&
        data[2].transactions[n].TxType == 'contractform'
      ) {
        type = 'contract'
        label = 'collateral for contract ID'
      } else if (entityType == 'storageproof') {
        type = 'address'
        label = 'host address'
      } else if (
        entityType == 'blockreward' &&
        data[2].transactions[n].TxType == 'blockreward'
      ) {
        type = 'address'
        label = 'miner payout address'
      } else if (
        entityType == 'blockreward' &&
        data[2].transactions[n].TxType == 'foundationsub'
      ) {
        type = 'address'
        label = 'Sia Foundation address'
      } else if (entityType == 'revision') {
        type = 'address'
        label = 'address (same wallet)'
      }

      outputs.push({
        label,
        initials: getNvgEntityTypeInitials(type),
        href: getHrefForType(type, hash),
        sc,
        sf,
        hash,
      })
    }
  }

  if (data[1].Fees) {
    outputs.push({
      label: 'miner fees',
      sc: new BigNumber(data[1].Fees),
    })
  }

  return outputs
}
