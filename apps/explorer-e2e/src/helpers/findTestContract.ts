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
  const {
    data: { height },
  } = await cluster.daemons.explored.api.consensusTip()

  const foundContracts: ExplorerV2FileContract[] = []

  for (let i = height; i >= height - 10; i--) {
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

export async function findV1TestContractWithResolutionType(
  cluster: Cluster,
  resolutionType: 'complete' | 'failed' | 'in progress' | 'invalid'
) {
  const {
    data: { height },
  } = await cluster.daemons.explored.api.consensusTip()

  const foundContracts: ExplorerFileContract[] = []

  for (let i = height; i >= height - 50; i--) {
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

  switch (resolutionType) {
    case 'complete':
      return foundContracts.find(
        (contract) => contract.valid && contract.resolved
      )
    case 'failed':
      return foundContracts.find(
        (contract) => !contract.valid && contract.resolved
      )
    case 'in progress':
      return foundContracts.find((contract) => !contract.resolved)
  }
}
