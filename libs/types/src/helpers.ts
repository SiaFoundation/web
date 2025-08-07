import { V2HostSettings } from './core'

export function getV2HostSettingsProtcolVersion(
  settings: V2HostSettings,
): `v${number}.${number}.${number}` {
  if (typeof settings.protocolVersion === 'string') {
    return settings.protocolVersion.slice(1) as `v${number}.${number}.${number}`
  }
  return `v${settings.protocolVersion[0]}.${settings.protocolVersion[1]}.${settings.protocolVersion[2]}`
}
