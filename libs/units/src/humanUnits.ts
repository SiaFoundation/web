import BigNumber from 'bignumber.js'

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

type HumanBytesOptions = {
  fixed?: number
}

export function humanBytes(
  bytes: number | BigNumber | string,
  options?: HumanBytesOptions
): string {
  const b =
    typeof bytes === 'number'
      ? bytes
      : bytes instanceof BigNumber
      ? bytes.toNumber()
      : Number(bytes)
  const { fixed = 2 } = options || {}
  if (!b) return '0 B'
  else if (b < 1000) return `${b} B`

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'],
    digits = Math.floor(Math.log10(b) / Math.log10(1000)),
    d = b / Math.pow(1000, digits)

  return d.toFixed(fixed) + ' ' + units[digits]
}

type UnitOptions = 'long' | 'abbreviated'

type HumanTimeOptions = {
  format?: UnitOptions
}

export function humanTime(ms: number, options?: HumanTimeOptions): string {
  const { format = 'abbreviated' } = options || {}
  const abbreviate = format === 'abbreviated'

  if (ms < 1000) {
    return `${ms.toFixed(0)}${abbreviate ? 'ms' : ' milliseconds'}`
  }

  const seconds = ms / 1000
  if (seconds < 60)
    return `${seconds.toFixed(0)}${abbreviate ? 's' : ' seconds'}`

  const minutes = seconds / 60
  if (minutes < 60)
    return `${minutes.toFixed(0)}${abbreviate ? 'm' : ' minutes'}`

  const hours = minutes / 60
  if (hours < 24) return `${hours.toFixed(0)}${abbreviate ? 'h' : ' hours'}`

  const days = hours / 24
  return `${days.toFixed(0)}${abbreviate ? 'd' : ' days'}`
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

    const numberUnits = [
        '',
        'K',
        'M',
        'B',
        't',
        'q',
        'Q',
        's',
        'S',
        'o',
        'n',
        'd',
        'U',
        'D',
      ],
      digits = Math.floor(Math.log10(n) / Math.log10(1000)),
      d = n / Math.pow(1000, digits)

    return `${d.toFixed(fixed)}${
      numberUnits[digits] ? ` ${numberUnits[digits]}` : ''
    }${units ? ` ${units}` : ''}`
  }

  return `${num.toFormat(fixed)}${units ? ` ${units}` : ''}`
}

export function humanDate(
  t: Date | string | number,
  options?: Intl.DateTimeFormatOptions
) {
  let language: string | undefined = undefined
  if (typeof window !== 'undefined') {
    language = navigator.language
  }
  return new Intl.DateTimeFormat(language, {
    dateStyle: 'short',
    ...options,
  }).format(new Date(t))
}
