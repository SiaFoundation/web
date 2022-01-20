import axios from 'axios'
import { errorResponse500 } from './error'

async function getCommitCount() {
  const contributors = await axios.get(
    'https://api.github.com/repos/SiaFoundation/siad/commits?per_page=1'
  )
  const link = contributors.headers.link

  // Get commit count by parsing last page number from `link` header
  const regex = /rel="next", .*&page=(\d+)>;/g
  const res = regex.exec(link)
  const commitCount = Number(res[1])

  return commitCount
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

export async function getGithub() {
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
    return errorResponse500
  }
}
