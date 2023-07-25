import {
  Text,
  Link,
  Separator,
  LogoGithub16,
  ScrollArea,
} from '@siafoundation/design-system'
import { format } from 'date-fns'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { components } from '../config/mdx'

type Pr = {
  url: string
  title: string
  number: number
  closed_at: string
  repoUrl: string
  repoFullName: string
  source: MDXRemoteSerializeResult
}

type Props = {
  prs: Pr[]
}

export function GitHubActivity({ prs }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {prs.map((pr, i) => (
        <div key={pr.title + pr.number}>
          <div className="flex flex-col gap-3 py-3 overflow-hidden">
            <Text size="14" color="verySubtle">
              {format(new Date(pr.closed_at), 'PP')}
            </Text>
            <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-center">
                <Link
                  href={pr.repoUrl}
                  target="_blank"
                  size="14"
                  color="subtle"
                  weight="semibold"
                  underline="hover"
                >
                  <LogoGithub16 />
                </Link>
                <Link
                  href={pr.repoUrl}
                  target="_blank"
                  size="14"
                  color="subtle"
                  weight="semibold"
                  underline="hover"
                >
                  {pr.repoFullName}
                </Link>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <Link
                href={pr.url}
                target="_blank"
                size="20"
                color="contrast"
                weight="semibold"
                underline="hover"
              >
                #{pr.number} {pr.title}
              </Link>
            </div>
            {pr.source ? (
              <ScrollArea>
                <MDXRemote {...pr.source} components={components} />
              </ScrollArea>
            ) : null}
          </div>
          {i !== prs.length - 1 ? (
            <Separator color="verySubtle" className="my-8" />
          ) : null}
        </div>
      ))}
    </div>
  )
}
