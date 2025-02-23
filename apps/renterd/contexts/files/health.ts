import { Obj, SlabSlice } from '@siafoundation/react-renterd'
import { min } from 'lodash'
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
  slab: SlabSlice,
  contracts: ContractData[],
  index: string
): SlabHealthStats {
  const shardContractStatus = []
  slab.shards?.forEach((sh) => {
    shardContractStatus.push(!!contracts.find((c) => c.hostKey === sh.host))
  })
  const shardsWithContracts = shardContractStatus.filter((s) => s).length
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
