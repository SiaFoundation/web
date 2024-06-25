import { GitHubRelease, GitHubReleaseAsset } from '@siafoundation/data-sources'

type DownloadOption = { title: string; link: string; tags: DownloadTag[] }

export function getDownloadLinksDaemon(daemon: string, release: GitHubRelease) {
  if (!release) {
    return []
  }
  return release.assets.map((asset) => {
    return {
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
      tags: getTags(asset),
    }
  })
}

export function getDownloadLinksDesktop(
  daemon: string,
  release: GitHubRelease
): DownloadOption[] {
  if (!release) {
    return []
  }

  // Desktop releases include assets for multiple daemons, so we need to filter.
  const assets = release.assets.filter((asset) => asset.name.includes(daemon))

  const final = []

  const macArm64 = assets.find(
    (asset) => asset.name.includes('darwin') && asset.name.includes('arm64')
  )
  if (macArm64) {
    final.push({
      title: 'MacOS ARM64',
      link: macArm64.browser_download_url,
      tags: getTags(macArm64),
    })
  }

  const windows = assets.find((asset) => asset.name.includes('.exe'))
  if (windows) {
    final.push({
      title: 'Windows AMD64',
      link: windows.browser_download_url,
      tags: getTags(windows),
    })
  }

  const deb = assets.find(
    (asset) => asset.name.includes('.deb') && asset.name.includes('amd64')
  )
  if (deb) {
    final.push({
      title: 'Debian AMD64',
      link: deb.browser_download_url,
      tags: getTags(deb),
    })
  }

  const rpm = assets.find(
    (asset) => asset.name.includes('.rpm') && asset.name.includes('x86_64')
  )
  if (rpm) {
    final.push({
      title: 'Red Hat AMD64',
      link: rpm.browser_download_url,
      tags: getTags(rpm),
    })
  }

  return final
}

type DownloadTag = 'zen' | 'windows' | 'macos' | 'linux' | 'amd64' | 'arm64'

function getTags(asset: GitHubReleaseAsset): DownloadTag[] {
  const tags: DownloadTag[] = []
  if (asset.name.includes('testnet') || asset.name.includes('zen')) {
    tags.push('zen')
  }
  if (asset.name.includes('windows')) {
    tags.push('windows')
  }
  if (asset.name.includes('darwin')) {
    tags.push('macos')
  }
  if (asset.name.includes('linux')) {
    tags.push('linux')
  }
  if (asset.name.includes('amd64') || asset.name.includes('x86_64')) {
    tags.push('amd64')
  }
  if (asset.name.includes('arm64')) {
    tags.push('arm64')
  }
  return tags
}

export function findUserDefaultDownload(downloads: DownloadOption[]) {
  let d = null
  if (navigator.userAgent.includes('Macintosh')) {
    d = downloads.find(
      (i) =>
        i.tags.includes('macos') &&
        i.tags.includes('arm64') &&
        !i.tags.includes('zen')
    )
  } else if (navigator.userAgent.includes('Windows')) {
    d = downloads.find(
      (i) =>
        i.tags.includes('windows') &&
        i.tags.includes('amd64') &&
        !i.tags.includes('zen')
    )
  } else if (navigator.userAgent.includes('Linux')) {
    d = downloads.find(
      (i) =>
        i.tags.includes('linux') &&
        i.tags.includes('amd64') &&
        !i.tags.includes('zen')
    )
  }
  return d
}
