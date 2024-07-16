import type { GitHubRelease } from '@siafoundation/data-sources'
import {
  Button,
  LinkButton,
  Option,
  Select,
  triggerToast,
} from '@siafoundation/design-system'
import { Download16 } from '@siafoundation/react-icons'
import { useEffect, useState } from 'react'
import {
  findUserDefaultDownload,
  getDownloadLinksDesktop,
} from '../content/downloads'
import { useTermsOfService } from '../hooks/useTermsOfService'

type Props = {
  daemon: 'renterd' | 'hostd' | 'walletd'
  release: GitHubRelease
  testnetOnly?: boolean
}

export function DownloadDesktopSelect({ daemon, release, testnetOnly }: Props) {
  const downloadLinks = getDownloadLinksDesktop(daemon, release)
  const { accepted } = useTermsOfService()

  const [download, setDownload] = useState(downloadLinks[0])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const d = findUserDefaultDownload(downloadLinks)
    if (d) {
      setDownload(d)
    }
  }, [])

  if (!release || !download) {
    return null
  }

  return (
    <div className="flex items-center gap-1">
      <Button state="waiting">
        {release.tag_name.replace(`${daemon}@`, 'v')}
      </Button>
      <Select
        className="flex-1"
        value={download.link}
        onChange={(e) =>
          setDownload(
            downloadLinks.find((i) => i.link === e.currentTarget.value),
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
            tip="Download installer"
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
            tip="Download installer"
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
