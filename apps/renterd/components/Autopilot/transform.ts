import {
  blocksToWeeks,
  bytesToTB,
  TBToBytes,
  weeksToBlocks,
} from '@siafoundation/design-system'
import { AutopilotConfig } from '@siafoundation/react-renterd'
import { toHastings, toSiacoins } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { scDecimalPlaces, SettingsData } from './fields'

export function transformUp(
  values: SettingsData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  existingValues?: any
): AutopilotConfig {
  return {
    ...existingValues,
    contracts: {
      ...existingValues?.contracts,
      set: values.set,
      amount: Math.round(values.amount.toNumber()),
      allowance: toHastings(values.allowance).toString(),
      period: Math.round(weeksToBlocks(values.period.toNumber())),
      renewWindow: Math.round(weeksToBlocks(values.renewWindow.toNumber())),
      download: TBToBytes(values.download).toNumber(),
      upload: TBToBytes(values.upload).toNumber(),
      storage: TBToBytes(values.storage).toNumber(),
    },
    hosts: {
      ...existingValues?.hosts,
      maxDowntimeHours: values.maxDowntimeHours.toNumber(),
      allowRedundantIPs: values.allowRedundantIPs,
      scoreOverrides: existingValues?.hosts.scoreOverrides || null,
    },
    wallet: {
      ...existingValues?.wallet,
      defragThreshold: values.defragThreshold.toNumber(),
    },
  }
}

export function transformDown(config: AutopilotConfig): SettingsData {
  const set = config.contracts.set
  const allowance = toSiacoins(config.contracts.allowance, scDecimalPlaces)
  const amount = new BigNumber(config.contracts.amount)
  const period = new BigNumber(blocksToWeeks(config.contracts.period))
  const renewWindow = new BigNumber(blocksToWeeks(config.contracts.renewWindow))
  const download = bytesToTB(new BigNumber(config.contracts.download))
  const upload = bytesToTB(new BigNumber(config.contracts.upload))
  const storage = bytesToTB(new BigNumber(config.contracts.storage))

  return {
    // contracts
    set,
    allowance,
    amount,
    period,
    renewWindow,
    download,
    upload,
    storage,
    // hosts
    allowRedundantIPs: config.hosts.allowRedundantIPs,
    maxDowntimeHours: new BigNumber(config.hosts.maxDowntimeHours),
    // wallet
    defragThreshold: new BigNumber(config.wallet.defragThreshold),
  }
}
