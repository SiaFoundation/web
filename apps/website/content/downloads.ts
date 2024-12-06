import { GitHubRelease } from '@siafoundation/data-sources'

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
  release: GitHubRelease
): DownloadOption[] {
  if (!release) {
    return []
  }

  const { assets } = release

  const final = []

  const macArm = assets.find(
    (asset) => asset.name.includes('arm64') && asset.name.includes('dmg')
  )
  if (macArm) {
    final.push({
      title: 'MacOS ARM64',
      link: macArm.browser_download_url,
      tags: getTags(macArm),
    })
  }

  const macAmd = assets.find(
    (asset) => asset.name.includes('x64') && asset.name.includes('dmg')
  )
  if (macAmd) {
    final.push({
      title: 'MacOS AMD64',
      link: macAmd.browser_download_url,
      tags: getTags(macAmd),
    })
  }

  const windowsAmd = assets.find((asset) => asset.name.includes('.exe'))
  if (windowsAmd) {
    final.push({
      title: 'Windows AMD64',
      link: windowsAmd.browser_download_url,
      tags: getTags(windowsAmd),
    })
  }

  const debArm = assets.find(
    (asset) => asset.name.includes('.deb') && asset.name.includes('arm64')
  )
  if (debArm) {
    final.push({
      title: 'Debian ARM64',
      link: debArm.browser_download_url,
      tags: getTags(debArm),
    })
  }

  const debAmd = assets.find(
    (asset) => asset.name.includes('.deb') && asset.name.includes('amd64')
  )
  if (debAmd) {
    final.push({
      title: 'Debian AMD64',
      link: debAmd.browser_download_url,
      tags: getTags(debAmd),
    })
  }

  const rpmArm = assets.find(
    (asset) => asset.name.includes('.rpm') && asset.name.includes('arm64')
  )
  if (rpmArm) {
    final.push({
      title: 'RPM ARM64',
      link: rpmArm.browser_download_url,
      tags: getTags(rpmArm),
    })
  }

  const rpmAmd = assets.find(
    (asset) => asset.name.includes('.rpm') && asset.name.includes('x86_64')
  )
  if (rpmAmd) {
    final.push({
      title: 'RPM AMD64',
      link: rpmAmd.browser_download_url,
      tags: getTags(rpmAmd),
    })
  }

  return final
}

type DownloadTag = 'zen' | 'windows' | 'macos' | 'linux' | 'amd64' | 'arm64'

export function getTags(asset: { name: string }): DownloadTag[] {
  const tags: DownloadTag[] = []
  if (asset.name.includes('testnet') || asset.name.includes('zen')) {
    tags.push('zen')
  }
  if (asset.name.includes('windows')) {
    tags.push('windows')
  }
  if (asset.name.includes('Setup.exe')) {
    // For now assume amd64 for Windows exe.
    tags.push('windows')
    tags.push('amd64')
  }
  if (asset.name.includes('darwin') || asset.name.includes('.dmg')) {
    tags.push('macos')
  }
  if (
    asset.name.includes('linux') ||
    asset.name.includes('.deb') ||
    asset.name.includes('.rpm')
  ) {
    tags.push('linux')
  }
  if (
    asset.name.includes('amd64') ||
    asset.name.includes('x86_64') ||
    asset.name.includes('x64')
  ) {
    tags.push('amd64')
  }
  if (asset.name.includes('arm64')) {
    tags.push('arm64')
  }
  return tags
}

export function findUserDefaultDownload(
  downloads: DownloadOption[] = []
): DownloadOption | null {
  let d = null
  if (navigator.userAgent.includes('Macintosh')) {
    // We do not try to detect the architecture for MacOS
    // because browsers return an Intel user-agent even on ARM Macs.
    d = downloads.find(
      (i) =>
        i.tags.includes('macos') &&
        i.tags.includes('arm64') &&
        !i.tags.includes('zen')
    )
  } else if (navigator.userAgent.includes('Windows')) {
    // We currently do not provide ARM64 builds for Windows
    // but if we do in the future, we could try:
    // navigator.userAgent.includes('ARM64')
    d = downloads.find(
      (i) =>
        i.tags.includes('windows') &&
        i.tags.includes('amd64') &&
        !i.tags.includes('zen')
    )
  } else if (navigator.userAgent.includes('Linux')) {
    if (
      navigator.userAgent.includes('aarch64') ||
      navigator.userAgent.includes('arm64')
    ) {
      d = downloads.find(
        (i) =>
          i.tags.includes('linux') &&
          i.tags.includes('arm64') &&
          !i.tags.includes('zen')
      )
    } else {
      d = downloads.find(
        (i) =>
          i.tags.includes('linux') &&
          i.tags.includes('amd64') &&
          !i.tags.includes('zen')
      )
    }
  }
  return d
}
