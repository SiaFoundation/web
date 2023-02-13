import BigNumber from 'bignumber.js'
import { format } from 'date-fns'

export function humanSpeed(bps: number): string {
  if (!bps) return '0 bps'
  else if (bps < 1000) return `${bps} bps`

  const units = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps', 'Pbps', 'Ebps'],
    digits = Math.floor(Math.log10(bps) / Math.log10(1000)),
    d = Math.floor((bps / Math.pow(1000, digits)) * 100) / 100

  return d + ' ' + units[digits]
}

export function humanHashrate(hps: number): string {
  if (!hps) return '0 H/s'
  else if (hps < 1000) return `${hps} H/s`

  const units = ['H', 'KH', 'MH', 'GH', 'TH', 'PH', 'EH'],
    digits = Math.floor(Math.log10(hps) / Math.log10(1000)),
    d = Math.floor((hps / Math.pow(1000, digits)) * 100) / 100

  return d + ' ' + units[digits] + '/s'
}

export function humanDifficulty(hash: number): string {
  if (!hash) return '0 H'
  else if (hash < 1000) return `${hash} H`

  const units = ['H', 'KH', 'MH', 'GH', 'TH', 'PH', 'EH'],
    digits = Math.floor(Math.log10(hash) / Math.log10(1000)),
    d = Math.floor((hash / Math.pow(1000, digits)) * 100) / 100

  return d + ' ' + units[digits]
}

export function humanBytes(b: number): string {
  if (!b) return '0 B'
  else if (b < 1000) return `${b} B`

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'],
    digits = Math.floor(Math.log10(b) / Math.log10(1000)),
    d = b / Math.pow(1000, digits)

  return d.toFixed(2) + ' ' + units[digits]
}

export function humanTime(ns: number): string {
  if (ns === 0) return '0ms'

  ns /= Math.pow(1000, 2)
  if (ns < 1000) return ` ${Math.floor(ns * 100) / 100}ms`

  ns /= 1000
  if (ns < 60) return `${Math.floor(ns * 100) / 100}s`

  return `${Math.floor((ns / 60) * 100) / 100}m`
}

type HumanNumberOptions = {
  fixed?: number
  abbreviated?: boolean
  units?: string
}

export function humanNumber(
  numb: BigNumber | string | number | undefined,
  options?: HumanNumberOptions
) {
  const { fixed = 0, units = '', abbreviated = false } = options || {}
  const num = new BigNumber(numb || 0)

  if (abbreviated) {
    const n = num.toNumber()
    if (n < 1000) return num.toString()

    const numberUnits = ['', 'K', 'M', 'B', 't', 'q', 'Q'],
      digits = Math.floor(Math.log10(n) / Math.log10(1000)),
      d = n / Math.pow(1000, digits)

    return `${d.toFixed(fixed)}${
      numberUnits[digits] ? ` ${numberUnits[digits]}` : ''
    }${units ? ` ${units}` : ''}`
  }

  return `${num.toFormat(fixed)}${units ? ` ${units}` : ''}`
}

export function humanDate(
  date: string | number | Date,
  options: { time: boolean } = { time: false }
) {
  return date ? format(new Date(date), options.time ? 'Pp' : 'PP') : ''
}
