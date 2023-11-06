import {
  Select,
  Option,
  ControlGroup,
  Button,
  LinkButton,
} from '@siafoundation/design-system'
import { Download16 } from '@siafoundation/react-icons'
import { useEffect, useState } from 'react'
import { getDownloadLinks } from '../content/downloads'
import { GitHubRelease } from '@siafoundation/data-sources'

type Props = {
  daemon: 'renterd' | 'hostd' | 'walletd'
  release: GitHubRelease
  testnetOnly?: boolean
}

export function DownloadSelect({ daemon, release, testnetOnly }: Props) {
  const downloadLinks = getDownloadLinks(daemon, release)

  const [download, setDownload] = useState(downloadLinks[0])

  useEffect(() => {
    let d = null
    if (navigator.userAgent.includes('Macintosh')) {
      d = downloadLinks.find(
        (i) =>
          i.link.includes('darwin') &&
          i.link.includes('arm64') &&
          !i.link.includes('zen') &&
          !i.link.includes('testnet')
      )
    } else if (navigator.userAgent.includes('Windows')) {
      d = downloadLinks.find(
        (i) =>
          i.link.includes('windows') &&
          i.link.includes('amd64') &&
          !i.link.includes('zen') &&
          !i.link.includes('testnet')
      )
    } else if (navigator.userAgent.includes('Linux')) {
      d = downloadLinks.find(
        (i) =>
          i.link.includes('linux') &&
          i.link.includes('amd64') &&
          !i.link.includes('zen') &&
          !i.link.includes('testnet')
      )
    }
    if (d) {
      setDownload(d)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ControlGroup className="border-3 border-green-500 dark:border-green-300 rounded-md">
      <Button state="waiting">{release.tag_name}</Button>
      <Select
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
      <LinkButton href={download.link} tip="Download binary" icon="contrast">
        <Download16 />
      </LinkButton>
    </ControlGroup>
  )
}
