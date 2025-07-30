import { Cluster } from '../fixtures/cluster'

export async function exploredStabilization(
  api: Cluster,
  maxRetries = 20,
  delayMs = 500,
  stabilizationMs = 5000,
) {
  for (let i = 0; i < maxRetries; i++) {
    const tip = await api.daemons.explored.api.explorerTip()
    const tipHeight = tip.data.height

    console.log(
      `observed explored tip height: ${tipHeight} — entering stabilization window`,
    )

    const start = Date.now()
    let isStable = true

    while (Date.now() - start < stabilizationMs) {
      const newTip = await api.daemons.explored.api.explorerTip()
      const observedHeight = newTip.data.height

      if (observedHeight !== tipHeight) {
        console.log(
          `explored height changed during stabilization — expected ${tipHeight}, got ${observedHeight}`,
        )
        isStable = false
        break
      }

      await new Promise((res) => setTimeout(res, 200))
    }

    if (isStable) {
      console.log(`explored height stabilized at ${tipHeight}`)
      return
    }

    console.log(`explored height did not stabilize — retrying...`)
    await new Promise((res) => setTimeout(res, delayMs))
  }

  throw new Error(
    `explored failed to stabilize height within ${maxRetries} retries`,
  )
}
