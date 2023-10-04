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
}

export function DownloadSelect({ daemon, release }: Props) {
  const downloadLinks = getDownloadLinks(daemon, release)

  const [download, setDownload] = useState(downloadLinks[0])

  return (
    <ControlGroup>
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
            {i.title}
          </Option>
        ))}
      </Select>
      <LinkButton href={download.link} tip="Download binary" icon="contrast">
        <Download16 />
      </LinkButton>
    </ControlGroup>
  )
}
