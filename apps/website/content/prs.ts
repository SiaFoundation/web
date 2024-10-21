import { getGitHubClosedPRs } from '@siafoundation/data-sources'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { getCacheValue } from '../lib/cache'
import { minutesInSeconds } from '@siafoundation/units'
import remarkGfm from 'remark-gfm'

const maxAge = minutesInSeconds(5)

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
            // Occasionally there is an edge-case error such as:
            // "Could not parse expression with acorn: Unexpected token"
            // Simply procceed with source=null in these cases.
            // We can revisit this next when we do the next website refactor.
            // Updating all the mdx packages might even do the trick.
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
        })
      )
      return prs
    },
    maxAge
  )
}
