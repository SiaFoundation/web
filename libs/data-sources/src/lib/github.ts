import Axios from 'axios'
import { orderBy } from '@technically/lodash'
import { buildErrorResponse500 } from './error'
import { AsyncDataSourceResponse } from './types'

const githubToken = process.env['GITHUB_TOKEN']

const axios = Axios.create({
  headers: {
    authorization: githubToken ? `Bearer ${githubToken}` : '',
  },
})

async function getCommitCount() {
  const contributors = await axios.get(
    'https://api.github.com/repos/SiaFoundation/siad/commits?per_page=1'
  )
  const link = contributors.headers['link']

  // Get commit count by parsing last page number from `link` header
  const regex = /rel="next", .*&page=(\d+)>;/g
  const res = regex.exec(link)
  const commitCount = Number(res ? res[1] : 0)

  return commitCount
}

export type GitHubPR = {
  html_url: string
  number: number
  title: string
  body: string
  closed_at: string
  base: {
    repo: {
      html_url: string
      full_name: string
    }
  }
}

export async function getGitHubClosedPRs(): Promise<GitHubPR[]> {
  let prs = []
  try {
    const response = await axios.get(
      'https://api.github.com/repos/SiaFoundation/renterd/pulls?state=closed&per_page=30'
    )
    prs.push(...response.data)
  } catch (e) {
    console.log(e)
  }
  try {
    const response = await axios.get(
      'https://api.github.com/repos/SiaFoundation/walletd/pulls?state=closed&per_page=30'
    )
    prs.push(...response.data)
  } catch (e) {
    console.log(e)
  }
  try {
    const response = await axios.get(
      'https://api.github.com/repos/SiaFoundation/hostd/pulls?state=closed&per_page=30'
    )
    prs.push(...response.data)
  } catch (e) {
    console.log(e)
  }
  try {
    const response = await axios.get(
      'https://api.github.com/repos/SiaFoundation/core/pulls?state=closed&per_page=30'
    )
    prs.push(...response.data)
  } catch (e) {
    console.log(e)
  }
  try {
    const response = await axios.get(
      'https://api.github.com/repos/SiaFoundation/web/pulls?state=closed&per_page=30'
    )
    prs.push(
      ...response.data.filter((d: GitHubPR) => d.title !== 'Version Packages')
    )
  } catch (e) {
    console.log(e)
  }

  prs = orderBy(prs, ['closed_at'], ['desc'])
  return prs
}

async function getContributorCount() {
  const contributors = await axios.get(
    'https://api.github.com/repos/SiaFoundation/siad/contributors?per_page=100'
  )

  return contributors.data.length
}

async function getForkCount() {
  const historic = await axios.get(
    'https://api.github.com/search/repositories?q=user%3ANebulousLabs+repo%3ASia'
  )
  const current = await axios.get(
    'https://api.github.com/search/repositories?q=user%3ASiaFoundation+repo%3Asiad'
  )

  return historic.data.items[0].forks_count + current.data.items[0].forks_count
}

async function getReleaseCount() {
  const historic = await axios.get(
    'https://api.github.com/repos/NebulousLabs/Sia/releases?per_page=100'
  )
  const current = await axios.get(
    'https://api.github.com/repos/SiaFoundation/siad/releases?per_page=100'
  )

  return historic.data.length + current.data.length
}

type GitHub = {
  commits: number
  contributors: number
  forks: number
  releases: number
}

export async function getGitHub(): AsyncDataSourceResponse<GitHub> {
  try {
    let result = {
      commits: 20_905,
      forks: 471,
      releases: 41,
      contributors: 69,
    }

    const [commitCount, contributorCount, forkCount, releaseCount] =
      await Promise.all([
        getCommitCount(),
        getContributorCount(),
        getForkCount(),
        getReleaseCount(),
      ])

    result = {
      commits: commitCount,
      contributors: contributorCount,
      forks: forkCount,
      releases: releaseCount,
    }

    return {
      status: 200,
      data: result,
    }
  } catch (e) {
    console.log(e)
    return buildErrorResponse500()
  }
}

export type GitHubReleaseAsset = {
  url: string
  id: number
  node_id: string
  name: string
  label?: string
  content_type: string
  state: string
  size: number
  download_count: number
  created_at: string
  updated_at: string
  browser_download_url: string
}

export type GitHubRelease = {
  name: string
  tag_name: string
  assets: GitHubReleaseAsset[]
}

export async function getGitHubRenterdLatestDaemonRelease(): Promise<GitHubRelease | null> {
  try {
    const response = await axios.get(
      'https://api.github.com/repos/SiaFoundation/renterd/releases/latest'
    )
    if (response.data) {
      return response.data
    } else {
      return null
    }
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getGitHubHostdLatestDaemonRelease(): Promise<GitHubRelease | null> {
  try {
    const response = await axios.get(
      'https://api.github.com/repos/SiaFoundation/hostd/releases/latest'
    )
    if (response.data) {
      return response.data
    } else {
      return null
    }
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getGitHubWalletdLatestDaemonRelease(): Promise<GitHubRelease | null> {
  try {
    const response = await axios.get(
      'https://api.github.com/repos/SiaFoundation/walletd/releases/latest'
    )
    if (response.data) {
      return response.data
    } else {
      return null
    }
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getGitHubRenterdLatestDesktopRelease(): Promise<GitHubRelease | null> {
  return getGitHubDesktopRelease('renterd')
}

export async function getGitHubHostdLatestDesktopRelease(): Promise<GitHubRelease | null> {
  return getGitHubDesktopRelease('hostd')
}

export async function getGitHubWalletdLatestDesktopRelease(): Promise<GitHubRelease | null> {
  return getGitHubDesktopRelease('walletd')
}

async function getGitHubDesktopRelease(
  daemon: string
): Promise<GitHubRelease | null> {
  let found: GitHubRelease | null = null
  let page = 1
  while (!found) {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/SiaFoundation/desktop/releases?per_page=100&page=${page}`
      )
      if (!response.data.length) {
        break
      }
      const release = sortReleasesByTag(response.data).find(
        (d: GitHubRelease) => d.tag_name.startsWith(daemon)
      )
      if (release) {
        found = release
        break
      }
      page++
    } catch (e) {
      console.log(e)
      return null
    }
  }
  return found
}

function compareTags(r1: GitHubRelease, r2: GitHubRelease) {
  const parseTag = (tag: string) => {
    if (!tag.includes('@')) {
      return [0, 0, 0]
    }
    const parts = tag.split('@')[1]
    return parts.split('.').map(Number)
  }

  const [major1, minor1, patch1] = parseTag(r1.tag_name)
  const [major2, minor2, patch2] = parseTag(r2.tag_name)

  if (major1 !== major2) {
    return major2 - major1
  } else if (minor1 !== minor2) {
    return minor2 - minor1
  } else {
    return patch2 - patch1
  }
}

function sortReleasesByTag(releases: GitHubRelease[]) {
  return releases.sort((a, b) => compareTags(a, b))
}
