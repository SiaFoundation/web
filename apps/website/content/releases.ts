import {
  getGitHubHostdLatestDaemonRelease,
  getGitHubHostdLatestDesktopRelease,
  getGitHubRenterdLatestDaemonRelease,
  getGitHubRenterdLatestDesktopRelease,
  getGitHubWalletdLatestDaemonRelease,
  getGitHubWalletdLatestDesktopRelease,
} from '@siafoundation/data-sources'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

const maxAge = getMinutesInSeconds(5)

export async function getRenterdLatestDaemonRelease() {
  return getCacheValue(
    'releases/renterd/daemon',
    () => {
      return getGitHubRenterdLatestDaemonRelease()
    },
    maxAge
  )
}

export async function getHostdLatestDaemonRelease() {
  return getCacheValue(
    'releases/hostd/daemon',
    () => {
      return getGitHubHostdLatestDaemonRelease()
    },
    maxAge
  )
}

export async function getWalletdLatestDaemonRelease() {
  return getCacheValue(
    'releases/walletd/daemon',
    () => {
      return getGitHubWalletdLatestDaemonRelease()
    },
    maxAge
  )
}

export async function getRenterdLatestDesktopRelease() {
  return getCacheValue(
    'releases/renterd/desktop',
    () => {
      return getGitHubRenterdLatestDesktopRelease()
    },
    maxAge
  )
}

export async function getHostdLatestDesktopRelease() {
  return getCacheValue(
    'releases/hostd/desktop',
    () => {
      return getGitHubHostdLatestDesktopRelease()
    },
    maxAge
  )
}

export async function getWalletdLatestDesktopRelease() {
  return getCacheValue(
    'releases/walletd/desktop',
    () => {
      return getGitHubWalletdLatestDesktopRelease()
    },
    maxAge
  )
}
