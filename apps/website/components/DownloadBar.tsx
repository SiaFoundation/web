import { webLinks, Link, Text } from '@siafoundation/design-system'
import { LogoGithub24, Book24, Code24 } from '@siafoundation/react-icons'
import { DownloadSelect } from './DownloadSelect'
import { GitHubRelease } from '@siafoundation/data-sources'

type Daemon = 'renterd' | 'hostd' | 'walletd'
type Props = {
  daemon: Daemon
  release: GitHubRelease
  testnetOnly?: boolean
}

export function DownloadBar({ daemon, release, testnetOnly }: Props) {
  const guideUrl = webLinks.docs[daemon]
  const docsUrl = webLinks.apiDocs[daemon]
  const githubUrl = webLinks.github[daemon]

  return (
    <div className="py-14 flex flex-col gap-3 justify-center items-center">
      <Text size="24" weight="semibold" className="">
        Download {daemon} software
      </Text>
      <DownloadSelect
        daemon={daemon}
        release={release}
        testnetOnly={testnetOnly}
      />
      <div className="flex items-center gap-x-4 gap-y-3">
        {guideUrl && (
          <Link
            weight="bold"
            href={guideUrl}
            target="_blank"
            size="14"
            underline="hover"
            className="flex items-center gap-1"
            ellipsis
          >
            <Book24 />
            <span>Setup guide</span>
          </Link>
        )}
        {docsUrl && (
          <Link
            weight="bold"
            href={docsUrl}
            target="_blank"
            size="14"
            underline="hover"
            className="flex items-center gap-1"
            ellipsis
          >
            <Code24 />
            <span>API Docs</span>
          </Link>
        )}
        {githubUrl && (
          <Link
            weight="bold"
            href={githubUrl}
            target="_blank"
            size="14"
            underline="hover"
            className="flex items-center gap-1"
            ellipsis
          >
            <LogoGithub24 />
            <span>Source code</span>
          </Link>
        )}
      </div>
    </div>
  )
}
