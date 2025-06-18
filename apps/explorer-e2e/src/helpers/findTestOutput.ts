import { ExplorerSiacoinOutput } from '@siafoundation/explored-types'
import { Cluster } from '../fixtures/cluster'

export async function findTestOutput(cluster: Cluster, version: 'v1' | 'v2') {
  let foundOutput: ExplorerSiacoinOutput | undefined
  const tip = await cluster.daemons.explored.api.consensusTip()
  let currentHeight = tip.data.height

  // Hopefully, 50 blocks should be enough. We stop on find.
  for (let i = 0; i < 50; i++) {
    const { data: blockIndex } =
      await cluster.daemons.explored.api.consensusTipByHeight({
        params: { height: currentHeight },
      })

    const { data: block } = await cluster.daemons.explored.api.blockByID({
      params: { id: blockIndex.id },
    })

    if (version === 'v2') {
      block.v2?.transactions?.forEach((tx) =>
        tx.siacoinOutputs?.forEach((output) => {
          if (!foundOutput) {
            foundOutput = output
          }
        })
      )
    }

    if (version === 'v1') {
      block.transactions?.forEach((tx) =>
        tx.siacoinOutputs?.forEach((output) => {
          if (!foundOutput) {
            foundOutput = output
          }
        })
      )
    }

    if (foundOutput) break
    currentHeight--
  }

  if (!foundOutput) {
    throw new Error('Output ID not found in 50 blocks')
  }

  return foundOutput
}
