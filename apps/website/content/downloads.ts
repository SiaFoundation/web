import { webLinks } from '@siafoundation/design-system'

export function getRenterdDownloadLinks(version: string) {
  if (!version) {
    return []
  }
  return [
    {
      title: 'Windows AMD64',
      link: `${webLinks.github.index}/renterd/releases/download/${version}/renterd_mainnet_windows_amd64.zip`,
      group: 'mainnet',
    },
    {
      title: 'MacOS AMD64',
      link: `${webLinks.github.index}/renterd/releases/download/${version}/renterd_mainnet_darwin_amd64.zip`,
      group: 'mainnet',
    },
    {
      title: 'MacOS ARM64',
      link: `${webLinks.github.index}/renterd/releases/download/${version}/renterd_mainnet_darwin_arm64.zip`,
      group: 'mainnet',
    },
    {
      title: 'Linux AMD64',
      link: `${webLinks.github.index}/renterd/releases/download/${version}/renterd_mainnet_linux_amd64.zip`,
      group: 'mainnet',
    },
    {
      title: 'Linux ARM64',
      link: `${webLinks.github.index}/renterd/releases/download/${version}/renterd_mainnet_linux_arm64.zip`,
      group: 'mainnet',
    },
    {
      title: 'testnet - Windows AMD64',
      link: `${webLinks.github.index}/renterd/releases/download/${version}/renterd_testnet_windows_amd64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - MacOS AMD64',
      link: `${webLinks.github.index}/renterd/releases/download/${version}/renterd_testnet_darwin_amd64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - MacOS ARM64',
      link: `${webLinks.github.index}/renterd/releases/download/${version}/renterd_testnet_darwin_arm64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - Linux AMD64',
      link: `${webLinks.github.index}/renterd/releases/download/${version}/renterd_testnet_linux_amd64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - Linux ARM64',
      link: `${webLinks.github.index}/renterd/releases/download/${version}/renterd_testnet_linux_arm64.zip`,
      group: 'testnet',
    },
  ]
}

export function getHostdDownloadLinks(version: string) {
  if (!version) {
    return []
  }
  return [
    {
      title: 'Windows AMD64',
      link: `${webLinks.github.index}/hostd/releases/download/${version}/hostd_windows_amd64.zip`,
      group: 'mainnet',
    },
    {
      title: 'MacOS AMD64',
      link: `${webLinks.github.index}/hostd/releases/download/${version}/hostd_darwin_amd64.zip`,
      group: 'mainnet',
    },
    {
      title: 'MacOS ARM64',
      link: `${webLinks.github.index}/hostd/releases/download/${version}/hostd_darwin_arm64.zip`,
      group: 'mainnet',
    },
    {
      title: 'Linux AMD64',
      link: `${webLinks.github.index}/hostd/releases/download/${version}/hostd_linux_amd64.zip`,
      group: 'mainnet',
    },
    {
      title: 'Linux ARM64',
      link: `${webLinks.github.index}/hostd/releases/download/${version}/hostd_linux_arm64.zip`,
      group: 'mainnet',
    },
    {
      title: 'testnet - Windows AMD64',
      link: `${webLinks.github.index}/hostd/releases/download/${version}/hostd_zen_windows_amd64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - MacOS AMD64',
      link: `${webLinks.github.index}/hostd/releases/download/${version}/hostd_zen_darwin_amd64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - MacOS ARM64',
      link: `${webLinks.github.index}/hostd/releases/download/${version}/hostd_zen_darwin_arm64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - Linux AMD64',
      link: `${webLinks.github.index}/hostd/releases/download/${version}/hostd_zen_linux_amd64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - Linux ARM64',
      link: `${webLinks.github.index}/hostd/releases/download/${version}/hostd_zen_linux_arm64.zip`,
      group: 'testnet',
    },
  ]
}

export function getWalletDownloadLinks(version: string) {
  if (!version) {
    return []
  }
  return [
    {
      title: 'Windows AMD64',
      link: `${webLinks.github.index}/walletd/releases/download/${version}/walletd_windows_amd64.zip`,
      group: 'combined',
    },
    {
      title: 'MacOS AMD64',
      link: `${webLinks.github.index}/walletd/releases/download/${version}/walletd_darwin_amd64.zip`,
      group: 'combined',
    },
    {
      title: 'MacOS ARM64',
      link: `${webLinks.github.index}/walletd/releases/download/${version}/walletd_darwin_arm64.zip`,
      group: 'combined',
    },
    {
      title: 'Linux AMD64',
      link: `${webLinks.github.index}/walletd/releases/download/${version}/walletd_linux_amd64.zip`,
      group: 'combined',
    },
    {
      title: 'Linux ARM64',
      link: `${webLinks.github.index}/walletd/releases/download/${version}/walletd_linux_arm64.zip`,
      group: 'combined',
    },
  ]
}
