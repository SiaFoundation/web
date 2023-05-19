/* eslint-disable react/no-unescaped-entities */
import {
  webLinks,
  Select,
  ControlGroup,
  Download16,
  LinkButton,
  Button,
  Option,
  Link,
  LogoGithub16,
  Book20,
} from '@siafoundation/design-system'
import { useState } from 'react'
import { getLinks } from '../content/downloads'

type Daemon = 'renterd' | 'hostd' | 'walletd'
type Props = {
  daemon: Daemon
  version: string
}

export function DownloadWidget({ daemon, version }: Props) {
  const downloadLinks = getLinks(daemon, version)
  const [download, setDownload] = useState(downloadLinks[0])
  return (
    <div className="flex items-center gap-x-4 gap-y-3">
      <ControlGroup>
        <Button state="waiting">{version}</Button>
        <Select
          value={download.link}
          onChange={(e) =>
            setDownload(
              downloadLinks.find((i) => i.link === e.currentTarget.value)
            )
          }
        >
          <optgroup label="mainnet">
            {getLinks(daemon, version)
              .filter((i) => i.group === 'mainnet')
              .map((i) => (
                <Option key={i.link} value={i.link}>
                  {i.title}
                </Option>
              ))}
          </optgroup>
          <optgroup label="testnet">
            {getLinks(daemon, version)
              .filter((i) => i.group === 'testnet')
              .map((i) => (
                <Option key={i.link} value={i.link}>
                  {i.title}
                </Option>
              ))}
          </optgroup>
        </Select>
        <LinkButton href={download.link} tip="Download binary" icon="contrast">
          <Download16 />
        </LinkButton>
      </ControlGroup>
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
