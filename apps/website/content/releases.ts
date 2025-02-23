import {
  getGitHubHostdLatestRelease,
  getGitHubRenterdLatestRelease,
} from '@siafoundation/data-sources'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

const maxAge = getMinutesInSeconds(5)

export async function getCacheRenterdLatestRelease() {
  return getCacheValue(
    'releases/renterd',
    () => {
      return getGitHubRenterdLatestRelease()
    },
    maxAge
  )
}

export async function getCacheHostdLatestRelease() {
  return getCacheValue(
    'releases/hostd',
    () => {
      return getGitHubHostdLatestRelease()
    },
    maxAge
  )
}
