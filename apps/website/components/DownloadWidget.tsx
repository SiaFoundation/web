import {
  webLinks,
  Link,
  LogoGithub16,
  Book20,
} from '@siafoundation/design-system'
import { DownloadWidgetSelect } from './DownloadWidgetSelect'

type Daemon = 'renterd' | 'hostd' | 'walletd'
type Props = {
  daemon: Daemon
  version: string
}

export function DownloadWidget({ daemon, version }: Props) {
  return (
    <div className="flex items-center gap-x-4 gap-y-3">
      <DownloadWidgetSelect daemon={daemon} version={version} />
      <div className="flex-1" />
      <div className="flex items-center gap-x-4 gap-y-3">
        <Link
          weight="bold"
          href={webLinks.github[daemon]}
          target="_blank"
          size="14"
          underline="hover"
          className="flex items-center gap-1"
        >
          <LogoGithub16 />
        </Link>
        <Link
          weight="bold"
          href={webLinks.apiDocs[daemon]}
          target="_blank"
          size="14"
          underline="hover"
          className="flex items-center gap-1"
        >
          <Book20 />
        </Link>
      </div>
    </div>
  )
}
