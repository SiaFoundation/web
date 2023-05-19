import { webLinks } from '@siafoundation/design-system'

export function getLinks(daemon: 'renterd' | 'hostd', version: string) {
  if (!daemon || !version) {
    return []
  }
  return [
    {
      title: 'Windows AMD64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_windows_amd64.zip`,
      group: 'mainnet',
    },
    {
      title: 'MacOS AMD64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_darwin_amd64.zip`,
      group: 'mainnet',
    },
    {
      title: 'MacOS ARM64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_darwin_arm64.zip`,
      group: 'mainnet',
    },
    {
      title: 'Linux AMD64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_linux_amd64.zip`,
      group: 'mainnet',
    },
    {
      title: 'Linux ARM64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_linux_arm64.zip`,
      group: 'mainnet',
    },
    {
      title: 'testnet - Windows AMD64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_zen_windows_amd64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - MacOS AMD64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_zen_darwin_amd64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - MacOS ARM64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_zen_darwin_arm64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - Linux AMD64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_zen_linux_amd64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - Linux ARM64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_zen_linux_arm64.zip`,
      group: 'testnet',
    },
  ]
}

export function getLinksRuntimeNetwork(daemon: 'walletd', version: string) {
  if (!daemon || !version) {
    return []
  }
  return [
    {
      title: 'Windows AMD64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_windows_amd64.zip`,
      group: 'combined',
    },
    {
      title: 'MacOS AMD64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_darwin_amd64.zip`,
      group: 'combined',
    },
    {
      title: 'MacOS ARM64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_darwin_arm64.zip`,
      group: 'combined',
    },
    {
      title: 'Linux AMD64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_linux_amd64.zip`,
      group: 'combined',
    },
    {
      title: 'Linux ARM64',
      link: `${webLinks.github.index}/${daemon}/releases/download/${version}/${daemon}_linux_arm64.zip`,
      group: 'combined',
    },
  ]
}
