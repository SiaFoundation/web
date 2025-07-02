import { Host } from '@siafoundation/renterd-types'

export function getHostAddress(host?: Host) {
  if (!host) {
    return ''
  }
  return host.v2SiamuxAddresses?.length
    ? host.v2SiamuxAddresses[0]
    : host.netAddress
}
