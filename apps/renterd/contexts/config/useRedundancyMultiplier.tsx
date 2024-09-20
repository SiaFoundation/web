import { useMemo } from 'react'
import { getRedundancyMultiplier } from '@siafoundation/units'
import BigNumber from 'bignumber.js'

export function useRedundancyMultiplier({
  minShards,
  totalShards,
}: {
  minShards?: BigNumber
  totalShards?: BigNumber
}) {
  return useMemo(
    () => getRedundancyMultiplier(minShards, totalShards),
    [minShards, totalShards]
  )
}
