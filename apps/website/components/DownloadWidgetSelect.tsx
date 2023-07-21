import {
  Select,
  Option,
  ControlGroup,
  Button,
  LinkButton,
  Download16,
} from '@siafoundation/design-system'
import { useState } from 'react'
import { getLinks, getLinksRuntimeNetwork } from '../content/downloads'

type Daemon = 'renterd' | 'hostd' | 'walletd'
type Props = {
  daemon: Daemon
  version: string
}

export function DownloadWidgetSelect({ daemon, version }: Props) {
  const downloadLinks =
    daemon === 'walletd'
      ? getLinksRuntimeNetwork(daemon, version)
      : getLinks(daemon, version)
  const [download, setDownload] = useState(downloadLinks[0])

  const combined = downloadLinks.filter((i) => i.group === 'combined')
  const mainnet = downloadLinks.filter((i) => i.group === 'mainnet')
  const testnet = downloadLinks.filter((i) => i.group === 'testnet')
  return (
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
        {!!combined.length &&
          combined.map((i) => (
            <Option key={i.link} value={i.link}>
              {i.title}
            </Option>
          ))}
        {!!mainnet.length && (
          <optgroup label="mainnet">
            {mainnet.map((i) => (
              <Option key={i.link} value={i.link}>
                {i.title}
              </Option>
            ))}
          </optgroup>
        )}
        {!!testnet.length && (
          <optgroup label="testnet">
            {testnet.map((i) => (
              <Option key={i.link} value={i.link}>
                {i.title}
              </Option>
            ))}
          </optgroup>
        )}
      </Select>
      <LinkButton href={download.link} tip="Download binary" icon="contrast">
        <Download16 />
      </LinkButton>
    </ControlGroup>
  )
}
