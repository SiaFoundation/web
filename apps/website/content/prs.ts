import { getGitHubClosedPRs } from '@siafoundation/data-sources'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

const maxAge = getMinutesInSeconds(5)

export async function getPrs() {
  return getCacheValue(
    'prs',
    async () => {
      const prsData = await getGitHubClosedPRs()
      const prs = await Promise.all(
        prsData.map(async (pr) => {
          let source: MDXRemoteSerializeResult = null
          try {
            // as md, dont need the mdx components and allows <img> style tags, vs <img />
            source = await serialize(pr.body, {
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            })
          } catch (e) {
            console.log(e)
          }
          return {
            source,
            title: pr.title,
            number: pr.number,
            closed_at: pr.closed_at,
            url: pr.html_url,
            repoUrl: pr.base.repo.html_url,
            repoFullName: pr.base.repo.full_name,
          }
        }),
      )
      return prs
    },
    maxAge,
  )
}
