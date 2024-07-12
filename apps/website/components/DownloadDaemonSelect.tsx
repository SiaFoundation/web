import {
  Select,
  Option,
  Button,
  LinkButton,
  triggerToast,
} from '@siafoundation/design-system'
import { Download16 } from '@siafoundation/react-icons'
import { useEffect, useState } from 'react'
import {
  findUserDefaultDownload,
  getDownloadLinksDaemon,
} from '../content/downloads'
import { GitHubRelease } from '@siafoundation/data-sources'
import { useTermsOfService } from '../hooks/useTermsOfService'

type Props = {
  daemon: 'renterd' | 'hostd' | 'walletd'
  release: GitHubRelease
  testnetOnly?: boolean
}

export function DownloadDaemonSelect({ daemon, release, testnetOnly }: Props) {
  const downloadLinks = getDownloadLinksDaemon(daemon, release)
  const { accepted } = useTermsOfService()

  const [download, setDownload] = useState(downloadLinks[0])

  useEffect(() => {
    const d = findUserDefaultDownload(downloadLinks)
    if (d) {
      setDownload(d)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex items-center gap-1">
      <Button state="waiting">{release.tag_name}</Button>
      <Select
        className="flex-1"
        value={download.link}
        onChange={(e) =>
          setDownload(
            downloadLinks.find((i) => i.link === e.currentTarget.value)
          )
        }
      >
        {downloadLinks.map((i) => (
          <Option key={i.link} value={i.link}>
            {testnetOnly ? `Testnet only: ${i.title}` : i.title}
          </Option>
        ))}
      </Select>
      <div className="flex border-3 border-green-500 dark:border-green-300 rounded-md">
        {accepted ? (
          <LinkButton
            href={accepted ? download.link : undefined}
            tip="Download binary"
            icon="contrast"
          >
            <Download16 />
            Download
          </LinkButton>
        ) : (
          <Button
            onClick={() =>
              triggerToast({
                title: 'Please accept the Terms of Service',
                body: 'You must accept the Terms of Service to download the software.',
              })
            }
            tip="Download binary"
            icon="contrast"
          >
            <Download16 />
            Download
          </Button>
        )}
      </div>
    </div>
  )
}
