import { GitHubRelease } from '@siafoundation/data-sources'

export function getDownloadLinks(daemon: string, release: GitHubRelease) {
  if (!release) {
    return []
  }
  return release.assets.map((asset) => ({
    title: asset.name
      .replace(daemon, '')
      .replace('.zip', '')
      .replace('windows', 'Windows')
      .replace('darwin', 'MacOS')
      .replace('linux', 'Linux')
      .replace('amd64', 'AMD64')
      .replace('arm64', 'ARM64')
      .replace('zen', 'Zen Testnet -')
      .replace(/_/g, ' '),
    link: asset.browser_download_url,
  }))
}
