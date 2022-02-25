export function humanSpeed(bps: number): string {
  if (!bps) return '0 bps'
  else if (bps < 1000) return `${bps} bps`

  const units = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps', 'Pbps'],
    digits = Math.floor(Math.log10(bps) / Math.log10(1000)),
    d = Math.floor((bps / Math.pow(1000, digits)) * 100) / 100

  return d + ' ' + units[digits]
}

export function humanBytes(b: number): string {
  if (!b) return '0 B'
  else if (b < 1000) return `${b} B`

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'],
    digits = Math.floor(Math.log10(b) / Math.log10(1000)),
    d = Math.floor((b / Math.pow(1000, digits)) * 100) / 100

  return d + ' ' + units[digits]
}

export function humanTime(ns: number): string {
  if (ns === 0) return '0ms'

  ns /= Math.pow(1000, 2)
  if (ns < 1000) return ` ${Math.floor(ns * 100) / 100}ms`

  ns /= 1000
  if (ns < 60) return `${Math.floor(ns * 100) / 100}s`

  return `${Math.floor((ns / 60) * 100) / 100}m`
}
