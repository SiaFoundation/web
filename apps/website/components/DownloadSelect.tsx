import {
  Select,
  Option,
  ControlGroup,
  Button,
  LinkButton,
} from '@siafoundation/design-system'
import { Download16 } from '@siafoundation/react-icons'
import { useState } from 'react'
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

  return (
    <ControlGroup>
      <Button state="waiting" className="hidden @sm:flex">
        {release.tag_name}
      </Button>
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
