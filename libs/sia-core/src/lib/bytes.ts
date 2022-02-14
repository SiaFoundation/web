import BigNumber from 'bignumber.js'

// a JS clone of the parseFilesize method implemented in parse.go of Sia. Made
// for consistency.
export function parseFilesize(strSize: string): string {
  const units: Record<string, BigNumber.Value> = {
    kb: 1e3,
    mb: 1e6,
    gb: 1e9,
    tb: 1e12,
    kib: 1 << 10, // tslint:disable-line
    mib: 1 << 20, // tslint:disable-line
    gib: 1 << 30, // tslint:disable-line
    tib: 1 << 40, // tslint:disable-line
    b: 1,
  }
  const s = strSize.toLowerCase()
  for (const k in units) {
    if (s.endsWith(k)) {
      const n = s.substr(0, s.length - k.length)
      const initial = new BigNumber(n)
      const bytes = initial.multipliedBy(units[k])
      return bytes.toFixed(0, 1)
    }
  }
  throw new Error('could not parse filesize string')
}
