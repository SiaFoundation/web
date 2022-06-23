import { EntityListItem } from '../components/EntityList'
import {
  ContractEntity,
  Entity,
  EntityTxns2Index,
  EntityType,
  RevisionEntity,
} from '../config/types'

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

export function getTotalTransacted(entity: EntityTxns2Index) {
  const { data } = entity
  let sc = BigInt(0)
  let sf = 0
  for (let n = 0; n < data[2].transactions.length; n++) {
    if (data[2].transactions[n].ScChange > 0) {
      sc = sc + BigInt(data[2].transactions[n].ScChange)
    } else if (data[2].transactions[n].SfChange > 0) {
      sf = sf + data[2].transactions[n].SfChange
    }
  }
  if (data[1].Fees) {
    sc = sc + BigInt(data[1].Fees)
  }
  return {
    sc,
    sf,
  }
}

export function getContractConditions({
  data,
}: ContractEntity | RevisionEntity) {
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

export function getEntityTxInputs({ type, data }: EntityTxns2Index) {
  const inputs: EntityListItem[] = []

  for (let n = 0; n < data[2].transactions.length; n++) {
    const hash = data[2].transactions[n].Address

    // Identifying senders
    if (
      data[2].transactions[n].ScChange < 0 ||
      data[2].transactions[n].SfChange < 0
    ) {
      let sc = BigInt(0)
      let sf = 0
      let label = undefined

      if (data[2].transactions[n].ScChange < 0) {
        sc = BigInt(data[2].transactions[n].ScChange) // Push the change in SC
      } else if (data[2].transactions[n].SfChange < 0) {
        sf = data[2].transactions[n].SfChange // Push the change in SF
      }

      // Naming the sending object
      if (type == 'ScTx' || type == 'SfTx') {
        label = 'Sender address'
      } else if (type == 'host ann') {
        label = 'Host address'
      } else if (type == 'allowancePost') {
        label = 'Renter address'
      } else if (type == 'collateralPost' || type == 'storageproof') {
        label = 'Host address'
      } else if (type == 'revision') {
        label = 'Address'
      }

      inputs.push({
        label,
        type: 'address',
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
}: EntityTxns2Index) {
  const outputs: EntityListItem[] = []

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
      let label = undefined
      let type = 'address' as EntityType
      let sc = BigInt(0)
      let sf = 0
      if (data[2].transactions[n].ScChange > 0) {
        sc = BigInt(data[2].transactions[n].ScChange) // Push the change in SC
      } else if (data[2].transactions[n].SfChange > 0) {
        sf = data[2].transactions[n].SfChange // Push the change in SF
      }

      if (entityType == 'ScTx') {
        label = 'Receiver address'
        type = 'address'
      } else if (
        entityType == 'SfTx' &&
        data[2].transactions[n].TxType != 'SfClaim' &&
        data[2].transactions[n].SfChange > 0
      ) {
        label = 'Receiver address'
        type = 'address'
      } else if (
        entityType == 'SfTx' &&
        data[2].transactions[n].TxType != 'SfClaim' &&
        data[2].transactions[n].ScChange > 0
      ) {
        label = 'Sender wallet return (unspent output)'
        type = 'address'
      } else if (
        entityType == 'SfTx' &&
        data[2].transactions[n].TxType == 'SfClaim'
      ) {
        type = 'address'
        label = 'SiaFund dividend claim address (sender)'
      } else if (entityType == 'host ann') {
        label = 'Host address'
        type = 'address'
      } else if (
        entityType == 'allowancePost' &&
        data[2].transactions[n].TxType != 'contractform'
      ) {
        type = 'address'
        label = 'Renter address'
      } else if (
        entityType == 'allowancePost' &&
        data[2].transactions[n].TxType == 'contractform'
      ) {
        type = 'contract'
        label = 'Allowance for Contract ID'
      } else if (
        entityType == 'collateralPost' &&
        data[2].transactions[n].TxType != 'contractform'
      ) {
        type = 'address'
        label = 'Host address'
      } else if (
        entityType == 'collateralPost' &&
        data[2].transactions[n].TxType == 'contractform'
      ) {
        type = 'contract'
        label = 'Collateral for Contract ID'
      } else if (entityType == 'storageproof') {
        type = 'address'
        label = 'Host address'
      } else if (
        entityType == 'blockreward' &&
        data[2].transactions[n].TxType == 'blockreward'
      ) {
        type = 'address'
        label = 'Miner payout address'
      } else if (
        entityType == 'blockreward' &&
        data[2].transactions[n].TxType == 'foundationsub'
      ) {
        type = 'address'
        label = 'Sia Foundation address'
      } else if (entityType == 'revision') {
        type = 'address'
        label = 'Address (same wallet)'
      }

      outputs.push({
        label,
        type,
        sc,
        sf,
        hash,
      })
    }
  }

  if (data[1].Fees) {
    outputs.push({
      label: 'miner fees',
      sc: BigInt(data[1].Fees),
    })
  }

  return outputs
}
