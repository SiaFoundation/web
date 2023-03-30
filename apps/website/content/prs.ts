import { getGitHubClosedPRs } from '@siafoundation/data-sources'
import { serialize } from 'next-mdx-remote/serialize'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

const maxAge = getMinutesInSeconds(5)

export async function getCachePrs() {
  return getCacheValue(
    'prs',
    async () => {
      const prsData = await getGitHubClosedPRs()
      const prs = await Promise.all(
        prsData.map(async (pr) => {
          let source = null
          try {
            source = await serialize(pr.body)
          } catch (e) {
            console.log(e)
          }
          return {
            source,
            ...pr,
          }
        })
      )
      return prs
    },
    maxAge
  )
}
