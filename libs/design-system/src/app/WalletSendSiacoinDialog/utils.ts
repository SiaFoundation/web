'use client'

import BigNumber from 'bignumber.js'

export function getTotalTransactionCost({
  hastings,
  includeFee,
  fee,
}: {
  hastings: BigNumber
  includeFee: boolean
  fee: BigNumber
}) {
  return includeFee ? hastings : hastings.plus(fee)
}

export function getAmountUserWillReceive({
  hastings,
  includeFee,
  fee,
}: {
  hastings: BigNumber
  includeFee: boolean
  fee: BigNumber
}) {
  return includeFee ? hastings.minus(fee) : hastings
}
