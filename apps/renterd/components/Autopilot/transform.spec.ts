import BigNumber from 'bignumber.js'
import { transformDown, transformUp } from './transform'

describe('data transforms', () => {
  it('down', () => {
    expect(
      transformDown({
        wallet: {
          defragThreshold: 1000,
        },
        hosts: {
          allowRedundantIPs: false,
          maxDowntimeHours: 1440,
          scoreOverrides: null,
        },
        contracts: {
          set: 'autopilot',
          amount: 51,
          allowance: '6006000000000000000000000000',
          period: 6048,
          renewWindow: 2248,
          download: 1099511627776,
          upload: 1100000000000,
          storage: 1000000000000,
        },
      })
    ).toEqual({
      set: 'autopilot',
      allowance: new BigNumber('6006'),
      amount: new BigNumber('51'),
      period: new BigNumber('6'),
      renewWindow: new BigNumber('2.2301587301587302'),
      download: new BigNumber('1.099511627776'),
      upload: new BigNumber('1.1'),
      storage: new BigNumber('1'),
      allowRedundantIPs: false,
      maxDowntimeHours: new BigNumber('1440'),
      defragThreshold: new BigNumber('1000'),
    })
  })

  it('up', () => {
    expect(
      transformUp({
        set: 'autopilot',
        allowance: new BigNumber('6006'),
        amount: new BigNumber('51'),
        period: new BigNumber('6'),
        renewWindow: new BigNumber('2.2301587301587302'),
        download: new BigNumber('1.099511627776'),
        upload: new BigNumber('1.1'),
        storage: new BigNumber('1'),
        allowRedundantIPs: false,
        maxDowntimeHours: new BigNumber('1440'),
        defragThreshold: new BigNumber('1000'),
      })
    ).toEqual({
      wallet: {
        defragThreshold: 1000,
      },
      hosts: {
        allowRedundantIPs: false,
        maxDowntimeHours: 1440,
        scoreOverrides: null,
      },
      contracts: {
        set: 'autopilot',
        amount: 51,
        allowance: '6006000000000000000000000000',
        period: 6048,
        renewWindow: 2248,
        download: 1099511627776,
        upload: 1100000000000,
        storage: 1000000000000,
      },
    })
  })

  it('accepts unknown values', () => {
    expect(
      transformUp(
        {
          set: 'autopilot',
          allowance: new BigNumber('6006'),
          amount: new BigNumber('51'),
          period: new BigNumber('6'),
          renewWindow: new BigNumber('2.2301587301587302'),
          download: new BigNumber('1.099511627776'),
          upload: new BigNumber('1.1'),
          storage: new BigNumber('1'),
          allowRedundantIPs: false,
          maxDowntimeHours: new BigNumber('1440'),
          defragThreshold: new BigNumber('1000'),
        },
        {
          foobar1: 'value',
          wallet: {
            foobar: 'value',
          },
          contracts: {
            foobar: 'value',
            period: 7777,
          },
          hosts: {
            foobar: 'value',
          },
        }
      )
    ).toEqual({
      foobar1: 'value',
      wallet: {
        foobar: 'value',
        defragThreshold: 1000,
      },
      hosts: {
        foobar: 'value',
        allowRedundantIPs: false,
        maxDowntimeHours: 1440,
        scoreOverrides: null,
      },
      contracts: {
        foobar: 'value',
        set: 'autopilot',
        amount: 51,
        allowance: '6006000000000000000000000000',
        period: 6048,
        renewWindow: 2248,
        download: 1099511627776,
        upload: 1100000000000,
        storage: 1000000000000,
      },
    })
  })
})
