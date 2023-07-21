import {
  getGitHubHostdLatestRelease,
  getGitHubRenterdLatestRelease,
  getGitHubWalletdLatestRelease,
} from '@siafoundation/data-sources'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

const maxAge = getMinutesInSeconds(5)

export async function getRenterdLatestRelease() {
  return getCacheValue(
    'releases/renterd',
    () => {
      return getGitHubRenterdLatestRelease()
    },
    maxAge
  )
}

export async function getHostdLatestRelease() {
  return getCacheValue(
    'releases/hostd',
    () => {
      return getGitHubHostdLatestRelease()
    },
    maxAge
  )
}

export async function getWalletdLatestRelease() {
  return getCacheValue(
    'releases/walletd',
    () => {
      return getGitHubWalletdLatestRelease()
    },
    maxAge
  )
}
