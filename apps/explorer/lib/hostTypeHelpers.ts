import { ExplorerHost } from '@siafoundation/explored-types'

export function getHostSettings(host: ExplorerHost) {
  return host.v2 ? host.rhpV4Settings : host.settings
}

export function getHostNetAddress(host: ExplorerHost) {
  let netAddress: string | undefined

  if (host.v2) {
    netAddress = host.v2NetAddresses.find(
      (address) => address.protocol === 'siamux'
    )?.address
  } else {
    netAddress = host.settings.netaddress
  }

  if (!netAddress) throw new Error('netAddress undefined in getHostNetAddress')
  return netAddress
}
