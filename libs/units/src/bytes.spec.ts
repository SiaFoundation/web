import BigNumber from 'bignumber.js'
import {
  GBToBytes,
  GBToMB,
  GiBToBytes,
  MBToBytes,
  MBToGB,
  MiBToBytes,
  TBToBytes,
  TiBToBytes,
  bytesToGB,
  bytesToGiB,
  bytesToMB,
  bytesToMiB,
  bytesToTB,
  bytesToTiB,
} from './bytes'

describe('bytes', () => {
  it('bytesToTiB', () => {
    expect(bytesToTiB(1_099_511_627_776)).toEqual(new BigNumber(1))
  })

  it('bytesToGiB', () => {
    expect(bytesToGiB(1_073_741_824)).toEqual(new BigNumber(1))
  })

  it('bytesToMiB', () => {
    expect(bytesToMiB(1_073_741_824)).toEqual(new BigNumber(1024))
  })

  it('TiBToBytes', () => {
    expect(TiBToBytes(1)).toEqual(new BigNumber(1_099_511_627_776))
  })

  it('GiBToBytes', () => {
    expect(GiBToBytes(1)).toEqual(new BigNumber(1_073_741_824))
  })

  it('MiBToBytes', () => {
    expect(MiBToBytes(1)).toEqual(new BigNumber(1_048_576))
  })

  it('bytesToTB', () => {
    expect(bytesToTB(1e12)).toEqual(new BigNumber(1))
  })

  it('TBToBytes', () => {
    expect(TBToBytes(1)).toEqual(new BigNumber(1e12))
  })

  it('bytesToGB', () => {
    expect(bytesToGB(1e9)).toEqual(new BigNumber(1))
  })

  it('GBToBytes', () => {
    expect(GBToBytes(1)).toEqual(new BigNumber(1e9))
  })

  it('MBToGB', () => {
    expect(MBToGB(1)).toEqual(new BigNumber(1e-3))
  })

  it('GBToMB', () => {
    expect(GBToMB(1)).toEqual(new BigNumber(1_000))
  })

  it('bytesToMB', () => {
    expect(bytesToMB(1_000_000)).toEqual(new BigNumber(1))
  })

  it('MBToBytes', () => {
    expect(MBToBytes(1)).toEqual(new BigNumber(1_000_000))
  })
})
