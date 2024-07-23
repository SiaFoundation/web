import { webLinks, Link, Text } from '@siafoundation/design-system'
import { LogoGithub24, Book24, Code24 } from '@siafoundation/react-icons'
import { DownloadDaemonSelect } from './DownloadDaemonSelect'
import { GitHubRelease } from '@siafoundation/data-sources'
import { DownloadDesktopSelect } from './DownloadDesktopSelect'
import { backgrounds } from '../content/assets'
import { DownloadCard } from './DownloadCard'

const systemRequirements = {
  renterd: 'quad-core processor, 8GB RAM, 256GB SSD for consensus data',
  hostd:
    'quad-core processor, 8GB RAM, 256GB SSD for consensus data, 4TB HDD for stored data',
  walletd: 'quad-core processor, 8GB RAM, 256GB SSD for consensus data',
}

type Daemon = 'renterd' | 'hostd' | 'walletd'
type Props = {
  daemon: Daemon
  releaseDaemon: GitHubRelease
  releaseDesktop: GitHubRelease
  statusDaemon?: string
  statusDesktop?: string
}

export function DownloadSection({
  daemon,
  releaseDaemon,
  releaseDesktop,
  statusDaemon,
  statusDesktop,
}: Props) {
  const guideUrl = webLinks.docs[daemon]
  const docsUrl = webLinks.apiDocs[daemon]
  const githubUrl = webLinks.github[daemon]

  return (
    <div className="py-14 flex flex-col gap-3 justify-center items-center">
      <Text size="24" weight="semibold" className="">
        Download {daemon} software
      </Text>
      <Text color="subtle" size="14">
        System requirements: {systemRequirements[daemon]}
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-center items-center">
        <DownloadCard
          background={backgrounds.bamboo}
          status={statusDesktop}
          title="Desktop application"
          description="Download the full-featured desktop app for Windows, macOS, or Linux."
          downloadSelect={
            <DownloadDesktopSelect daemon={daemon} release={releaseDesktop} />
          }
        />
        <DownloadCard
          background={backgrounds.ocean}
          status={statusDaemon}
          title="Terminal application"
          description="Download the powerful CLI-based daemon for Windows, macOS, or Linux."
          downloadSelect={
            <DownloadDaemonSelect daemon={daemon} release={releaseDaemon} />
          }
        />
      </div>
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
