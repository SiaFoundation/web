import {
  webLinks,
  Link,
  Text,
  LogoGithub24,
  Book24,
  Select,
  ControlGroup,
  Download16,
  LinkButton,
  Button,
  Option,
} from '@siafoundation/design-system'
import { useState } from 'react'
import { getLinks, getLinksRuntimeNetwork } from '../content/downloads'

type Daemon = 'renterd' | 'hostd' | 'walletd'
type Props = {
  daemon: Daemon
  version: string
}

export function DownloadWidgetLarge({ daemon, version }: Props) {
  const downloadLinks =
    daemon === 'walletd'
      ? getLinksRuntimeNetwork(daemon, version)
      : getLinks(daemon, version)
  const [download, setDownload] = useState(downloadLinks[0])
  const githubUrl = webLinks.github[daemon]
  const docsUrl = webLinks.apiDocs[daemon]

  const combined = downloadLinks.filter((i) => i.group === 'combined')
  const mainnet = downloadLinks.filter((i) => i.group === 'mainnet')
  const testnet = downloadLinks.filter((i) => i.group === 'testnet')
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
            <LinkButton
              href={download.link}
              tip="Download binary"
              icon="contrast"
            >
              <Download16 />
            </LinkButton>
          </ControlGroup>
        </>
      ) : null}
    </div>
  )
}
