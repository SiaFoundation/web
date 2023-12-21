import { Obj, SlabSlice } from '@siafoundation/react-renterd'
import { min } from '@technically/lodash'
import { ContractData } from '../contracts/types'

export function getObjectHealth(
  obj: Obj,
  contracts: ContractData[]
): {
  slabs: SlabHealthStats[]
  health: number
} {
  const slabHealths = []
  obj.slabs?.forEach((sl, index) => {
    slabHealths.push(getSlabHealthStats(sl, contracts, String(index)))
  })
  const health = min(slabHealths.map((s) => s.health))
  return {
    health,
    slabs: slabHealths,
  }
}

type SlabHealthStats = {
  index: string
  health: number
  contractShards: number
  totalShards: number
  minShards: number
}

function getSlabHealthStats(
  slabSlice: SlabSlice,
  contracts: ContractData[],
  index: string
): SlabHealthStats {
  const slab = slabSlice.slab
  let shardsWithContracts = 0
  slab.shards?.forEach((sh) => {
    if (contracts.find((c) => c.hostKey === sh.host)) {
      shardsWithContracts++
    }
  })
  const minShards = slab.minShards
  const totalShards = slab.shards?.length || 0
  return {
    index,
    health: computeSlabHealth(totalShards, minShards, shardsWithContracts),
    minShards: slab.minShards,
    totalShards: slab.shards?.length || 0,
    contractShards: shardsWithContracts,
  }
}

export function computeSlabHealth(
  totalShards: number,
  minShards: number,
  contractShards: number
) {
  if (contractShards >= totalShards) {
    return 1
  }

  const adjustedShards = contractShards - minShards
  const adjustedTotalShards = totalShards - minShards

  return adjustedShards / adjustedTotalShards
}

// calculate the number of contract set shards for a slab using the health percent
// and the slabs total and min shards
export function computeSlabContractSetShards({
  totalShards,
  minShards,
  health,
}: {
  totalShards: number
  minShards: number
  health: number
}) {
  const adjustedTotalShards = totalShards - minShards
  const adjustedShards = Math.ceil(health * adjustedTotalShards)
  const contractSetShards = adjustedShards + minShards
  if (contractSetShards <= 0) {
    return 0
  }
  if (contractSetShards > totalShards) {
    return totalShards
  }
  return contractSetShards
}
