import { type OS, getOs } from '../lib/getOs'

type Separator = '\\' | '/'

export function useOS(): { os: OS; separator: Separator } {
  const os = getOs()
  const separator: Separator = os === 'windows' ? '\\' : '/'
  return {
    os,
    separator,
  }
}
