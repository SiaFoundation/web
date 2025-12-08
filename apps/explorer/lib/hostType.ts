import { ExplorerHost } from '@siafoundation/explored-types'

export function getHostNetAddress(host: ExplorerHost): string {
  // v2
  if (host.v2) {
    // Prefer siamux.
    const siamux = host.v2NetAddresses.find(
      (addr) => addr.protocol === 'siamux',
    )?.address

    if (siamux) {
      return siamux
    }

    // Fallback to quic.
    const quic = host.v2NetAddresses.find(
      (addr) => addr.protocol === 'quic',
    )?.address

    if (quic) {
      console.warn('Falling back to quic address for v2 host (no siamux)', {
        publicKey: host.publicKey,
        v2NetAddresses: host.v2NetAddresses,
      })
      return quic
    }

    // Log if we can't find either one, which should be unlikely.
    console.warn('Missing siamux/quic address for v2 host', {
      publicKey: host.publicKey,
      v2NetAddresses: host.v2NetAddresses,
    })

    return 'unknown'
  }

  // v1
  if (host.netAddress) {
    return host.netAddress
  }

  // Log if we can't find netAddress on a v1 host, but this should be highly unlikely.
  console.warn('Missing netAddress for v1 host', {
    publicKey: host.publicKey,
    netAddress: host.netAddress,
    settings: host.settings,
  })

  return 'unknown'
}
