import {
  ExplorerFileContract,
  ExplorerV2FileContract,
  ExplorerV2FileContractResolutionType,
} from '@siafoundation/explored-types'
import { Cluster } from '../fixtures/cluster'

export async function findV2TestContractWithResolutionType(
  cluster: Cluster,
  resolutionType: ExplorerV2FileContractResolutionType
) {
  const foundContracts: ExplorerV2FileContract[] = []

  for (let i = 10; i <= 20; i++) {
    // Get the block ID.
    const {
      data: { id: blockID },
    } = await cluster.daemons.explored.api.consensusTipByHeight({
      params: { height: i },
    })

    // Get the block.
    const { data: currentBlock } = await cluster.daemons.explored.api.blockByID(
      { params: { id: blockID } }
    )

    // Push all fileConctracts onto foundContracts.
    if (currentBlock.v2?.transactions.length) {
      currentBlock.v2.transactions.forEach((tx) => {
        if (tx.fileContracts) {
          foundContracts.push(...tx.fileContracts)
        }
      })
    }
  }

  // Return our target contract or undefined.
  return foundContracts.find(
    (contract) => contract.resolutionType === resolutionType
  )
}

export async function findV1TestContractWithStatus(
  cluster: Cluster,
  status: 'complete' | 'failed' | 'active' | 'invalid'
) {
  const foundContracts: ExplorerFileContract[] = []

  for (let i = 10; i <= 20; i++) {
    // Get the block ID.
    const {
      data: { id: blockID },
    } = await cluster.daemons.explored.api.consensusTipByHeight({
      params: { height: i },
    })

    // Get the block.
    const { data: currentBlock } = await cluster.daemons.explored.api.blockByID(
      { params: { id: blockID } }
    )

    // Push all fileConctracts onto foundContracts.
    if (currentBlock.transactions?.length) {
      currentBlock.transactions.forEach((tx) => {
        if (tx.fileContracts) {
          foundContracts.push(...tx.fileContracts)
        }
      })
    }
  }

  switch (status) {
    case 'complete':
      return foundContracts.find(
        (contract) => contract.valid && contract.resolved
      )
    case 'failed':
      return foundContracts.find(
        (contract) => !contract.valid && contract.resolved
      )
    case 'active':
      return foundContracts.find((contract) => !contract.resolved)
  }
}
