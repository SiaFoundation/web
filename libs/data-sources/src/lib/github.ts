import { getGitHubToken } from '@siafoundation/env'
import Axios from 'axios'
import { orderBy } from 'lodash'
import { buildErrorResponse500 } from './error'
import { AsyncDataSourceResponse } from './types'

const githubToken = getGitHubToken()

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

// NOTE: Currently not in use, copied from previous website code for reference.
// function getUIReleases() {
//   // TODO: Needs to be updated, historic count from a Gitlab API?
//   return axios.get(
//     'https://api.github.com/repos/NebulousLabs/Sia-UI/releases?per_page=100'
//   )
//   // TODO: Add next gen UI repo
// }

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
