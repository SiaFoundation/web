import {
  webLinks,
  Link,
  Text,
  LogoGithub24,
  Book24,
} from '@siafoundation/design-system'
import { DownloadWidgetSelect } from './DownloadWidgetSelect'

type Daemon = 'renterd' | 'hostd' | 'walletd'
type Props = {
  daemon: Daemon
  version: string
}

export function DownloadWidgetLarge({ daemon, version }: Props) {
  const githubUrl = webLinks.github[daemon]
  const docsUrl = webLinks.apiDocs[daemon]

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <div className="flex items-center gap-x-4 gap-y-3">
        {githubUrl && (
          <Link
            weight="bold"
            href={githubUrl}
            target="_blank"
            size="14"
            underline="hover"
            className="flex items-center gap-1"
          >
            <LogoGithub24 />
            <span>Source code</span>
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
          >
            <Book24 />
            <span>API Docs</span>
          </Link>
        )}
      </div>
      <div className="flex-1" />
      {version ? (
        <>
          <Text className="hidden md:block" size="14" weight="bold">
            Downloads
          </Text>
          <DownloadWidgetSelect daemon={daemon} version={version} />
        </>
      ) : null}
    </div>
  )
}
