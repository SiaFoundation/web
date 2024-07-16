import {
  useAutopilotConfigEvaluate,
  useBusState,
} from '@siafoundation/renterd-react'
import type { GougingSettings } from '@siafoundation/renterd-types'
import { humanNumber, humanSiacoin, toHastings } from '@siafoundation/units'
import { lowerFirst } from '@technically/lodash'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { type Fields, getFields } from './fields'
import { type Resources, checkIfAllResourcesLoaded } from './resources'
import { transformDownGouging } from './transformDown'
import { transformUp } from './transformUp'
import {
  type GougingData,
  type RecommendationItem,
  type SettingsData,
  getAdvancedDefaults,
} from './types'

export function useAutopilotEvaluations({
  form,
  resources,
  isAutopilotEnabled,
  estimatedSpendingPerMonth,
}: {
  form: UseFormReturn<SettingsData>
  resources: Resources
  isAutopilotEnabled: boolean
  estimatedSpendingPerMonth?: BigNumber
}) {
  const values = form.watch()
  const renterdState = useBusState()

  const hasDataToEvaluate = useMemo(() => {
    if (!isAutopilotEnabled) {
      return false
    }
    if (!checkIfAllResourcesLoaded(resources)) {
      return false
    }
    if (!form.formState.isValid) {
      return false
    }
    if (!renterdState.data) {
      return false
    }
    return true
  }, [isAutopilotEnabled, form.formState.isValid, resources, renterdState.data])

  // We need to pass valid settings data into transformUp to get the payloads.
  // The form can be invalid or have empty fields depending on the mode, so we
  // need to merge in default data to make sure numbers are not undefined in
  // the transformUp calculations that assume all data is valid and present.
  const currentValuesWithDefaults = useMemo(
    () =>
      mergeValuesWithDefaultsOrZeroValues(
        values,
        resources.autopilotState.data?.network!,
      ),
    [values, resources.autopilotState.data?.network],
  )

  const payloads = useMemo(() => {
    if (!hasDataToEvaluate) {
      return
    }

    const { payloads } = transformUp({
      resources,
      renterdState: renterdState.data!,
      isAutopilotEnabled,
      estimatedSpendingPerMonth: estimatedSpendingPerMonth!,
      values: currentValuesWithDefaults,
    })
    return payloads
  }, [
    currentValuesWithDefaults,
    resources,
    renterdState,
    isAutopilotEnabled,
    estimatedSpendingPerMonth,
    hasDataToEvaluate,
  ])

  const userContractCountTarget = payloads?.autopilot!.contracts.amount || 0

  // Find settings where the usable host count is at least 50% more than the
  // amount of contracts the user wants. If that is not possible, try 10% more.
  const hostMargin50 = 0.5
  const hostMargin10 = 0.1
  const hostTarget50 = Math.round(userContractCountTarget * (1 + hostMargin50))
  const hostTarget10 = Math.round(userContractCountTarget * (1 + hostMargin10))

  // Get the current usable host count.
  const eval0Enabled = !!payloads
  const eval0 = useAutopilotConfigEvaluate({
    disabled: !eval0Enabled,
    payload: {
      gougingSettings: payloads?.gouging!,
      redundancySettings: payloads?.redundancy!,
      autopilotConfig: payloads?.autopilot!,
    },
    config: {
      swr: {
        keepPreviousData: eval0Enabled,
      },
    },
  })
  const recommendedGougingSettings0 =
    eval0.data?.recommendation?.gougingSettings
  const usableHostsCurrent = eval0.data?.usable || 0
  const needsRecommendations = eval0.data && usableHostsCurrent < hostTarget50

  // Get the recommended gouging settings for matching the ideal number
  // of usable host count: 50% more than necessary.
  const eval50Enabled = !!payloads
  const eval50 = useAutopilotConfigEvaluate({
    disabled: !eval50Enabled,
    payload: {
      gougingSettings: payloads?.gouging!,
      redundancySettings: payloads?.redundancy!,
      autopilotConfig: {
        ...payloads?.autopilot!,
        contracts: {
          ...payloads?.autopilot!.contracts!,
          amount: hostTarget50,
        },
      },
    },
    config: {
      swr: {
        keepPreviousData: eval50Enabled,
      },
    },
  })
  const recommendedGougingSettings50 =
    eval50.data?.recommendation?.gougingSettings

  // If the ideal target does not provide a recommendation,
  // try a smaller margin: 10% more than necessary.
  const eval10Enabled = !!(payloads && !recommendedGougingSettings50)
  const eval10 = useAutopilotConfigEvaluate({
    disabled: !eval10Enabled,
    payload: {
      gougingSettings: payloads?.gouging!,
      redundancySettings: payloads?.redundancy!,
      autopilotConfig: {
        ...payloads?.autopilot!,
        contracts: {
          ...payloads?.autopilot!.contracts!,
          amount: hostTarget10,
        },
      },
    },
    config: {
      swr: {
        keepPreviousData: eval10Enabled,
      },
    },
  })
  const recommendedGougingSettings10 =
    eval10.data?.recommendation?.gougingSettings

  const recommendedGougingSettings =
    recommendedGougingSettings50 ||
    recommendedGougingSettings10 ||
    recommendedGougingSettings0

  const recommendationMargin = recommendedGougingSettings50
    ? '50%'
    : recommendedGougingSettings10
      ? '10%'
      : recommendedGougingSettings0
        ? '0%'
        : 'N/A'

  // Get the number of usable hosts we would have after applying the recommended settings.
  const usableAfterRecsEvalEnabled = !!(payloads && recommendedGougingSettings)
  const usableAfterRecsEval = useAutopilotConfigEvaluate({
    disabled: !usableAfterRecsEvalEnabled,
    payload: {
      gougingSettings: recommendedGougingSettings!,
      redundancySettings: payloads?.redundancy!,
      autopilotConfig: payloads?.autopilot!,
    },
    config: {
      swr: {
        keepPreviousData: usableAfterRecsEvalEnabled,
      },
    },
  })
  const usableHostsAfterRecommendation = usableAfterRecsEval.data?.usable || 0

  const recommendations: RecommendationItem[] = useMemo(() => {
    if (!payloads || !recommendedGougingSettings) {
      return []
    }

    const recommendationDown = transformDownGouging({
      gouging: recommendedGougingSettings,
      averages: resources.averages.data,
      hasBeenConfigured: true,
    })

    // Generate recommendation metadata for each value that differs from current settings.
    const recs: RecommendationItem[] = []
    const gougingKeys = Object.keys(
      recommendedGougingSettings,
    ) as (keyof GougingSettings)[]
    gougingKeys.forEach((key) => {
      if (recommendedGougingSettings[key] !== payloads.gouging![key]) {
        const rec = getRecommendationItem({
          key: remoteToLocalFields[key],
          recommendationDown,
          values: currentValuesWithDefaults,
        })
        if (rec) {
          recs.push(rec)
        }
      }
    })
    return recs
  }, [
    recommendedGougingSettings,
    resources,
    payloads,
    currentValuesWithDefaults,
  ])
  const foundRecommendation = !!recommendations.length

  return {
    hostMargin50,
    hostMargin10,
    hostTarget50,
    hostTarget10,
    usableHostsCurrent,
    userContractCountTarget,
    usableHostsAfterRecommendation,
    hasDataToEvaluate,
    needsRecommendations,
    foundRecommendation,
    recommendations,
    recommendationMargin,
  }
}

function getRecommendationItem({
  key,
  recommendationDown,
  values,
}: {
  key: keyof Fields
  recommendationDown: ReturnType<typeof transformDownGouging>
  values: SettingsData
}): RecommendationItem | null {
  const keyGouging = key as keyof GougingData
  if (fields[key].type === 'siacoin') {
    const currentValue = values[key] as BigNumber
    const targetValue = recommendationDown[keyGouging]
    const direction = currentValue.lt(targetValue!) ? 'up' : 'down'
    return {
      key: keyGouging,
      title: lowerFirst(fields[key].title),
      currentLabel: `${humanSiacoin(toHastings(currentValue), {
        fixed: 1,
      })}${fields[key].units?.replace('SC/', '/')}`,
      targetLabel: `${humanSiacoin(
        toHastings(recommendationDown[keyGouging]!),
        {
          fixed: 1,
        },
      )}${fields[key].units?.replace('SC/', '/')}`,
      currentValue,
      targetValue: recommendationDown[keyGouging]!,
      direction,
    }
  }
  if (fields[key].type === 'number') {
    const currentValue = values[key] as BigNumber
    const targetValue = recommendationDown[keyGouging]
    const direction = currentValue.lt(targetValue!) ? 'up' : 'down'
    return {
      key: keyGouging,
      title: lowerFirst(fields[key].title),
      currentLabel: `${humanNumber(currentValue)} ${fields[key].units}`,
      targetLabel: `${humanNumber(recommendationDown[keyGouging])} ${
        fields[key].units
      }`,
      currentValue: currentValue,
      targetValue: recommendationDown[keyGouging]!,
      direction,
    }
  }
  return null
}

// We just need some of the static metadata so pass in dummy values.
const fields = getFields({
  validationContext: {
    isAutopilotEnabled: true,
    configViewMode: 'basic',
  },
  isAutopilotEnabled: true,
  configViewMode: 'basic',
  maxStoragePriceTBMonth: new BigNumber(0),
  maxUploadPriceTB: new BigNumber(0),
  minShards: new BigNumber(0),
  totalShards: new BigNumber(0),
  redundancyMultiplier: new BigNumber(0),
  allowanceDerivedPricing: false,
  setAllowanceDerivedPricing: () => null,
  recommendations: {},
})

const remoteToLocalFields: Record<keyof GougingSettings, keyof Fields> = {
  maxStoragePrice: 'maxStoragePriceTBMonth',
  maxDownloadPrice: 'maxDownloadPriceTB',
  maxUploadPrice: 'maxUploadPriceTB',
  maxContractPrice: 'maxContractPrice',
  maxRPCPrice: 'maxRpcPriceMillion',
  hostBlockHeightLeeway: 'hostBlockHeightLeeway',
  minPriceTableValidity: 'minPriceTableValidityMinutes',
  minAccountExpiry: 'minAccountExpiryDays',
  minMaxEphemeralAccountBalance: 'minMaxEphemeralAccountBalance',
  migrationSurchargeMultiplier: 'migrationSurchargeMultiplier',
}

export const valuesZeroDefaults: SettingsData = {
  autopilotContractSet: '',
  amountHosts: new BigNumber(0),
  allowanceMonth: new BigNumber(0),
  periodWeeks: new BigNumber(0),
  renewWindowWeeks: new BigNumber(0),
  downloadTBMonth: new BigNumber(0),
  uploadTBMonth: new BigNumber(0),
  storageTB: new BigNumber(0),
  prune: false,
  allowRedundantIPs: false,
  maxDowntimeHours: new BigNumber(0),
  minRecentScanFailures: new BigNumber(0),
  minProtocolVersion: '',
  defaultContractSet: '',
  uploadPackingEnabled: true,
  maxRpcPriceMillion: new BigNumber(0),
  maxStoragePriceTBMonth: new BigNumber(0),
  maxContractPrice: new BigNumber(0),
  maxDownloadPriceTB: new BigNumber(0),
  maxUploadPriceTB: new BigNumber(0),
  hostBlockHeightLeeway: new BigNumber(0),
  minPriceTableValidityMinutes: new BigNumber(0),
  minAccountExpiryDays: new BigNumber(0),
  minMaxEphemeralAccountBalance: new BigNumber(0),
  migrationSurchargeMultiplier: new BigNumber(0),
  minShards: new BigNumber(0),
  totalShards: new BigNumber(0),
}

// current value, otherwise advanced default if there is one, otherwise zero value.
export function mergeValuesWithDefaultsOrZeroValues(
  values: SettingsData,
  network: 'Mainnet' | 'Zen Testnet',
) {
  const merged: SettingsData = getAdvancedDefaults(network)
  // defaults include undefined values, for keys without defaults.
  // Set these to zero values.
  Object.entries(valuesZeroDefaults).forEach(([key, value]) => {
    if (merged[key as keyof SettingsData] === undefined) {
      // @ts-ignore
      merged[key] = value
    }
  })
  // Apply any non-zero user values.
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined) {
      // @ts-ignore
      merged[key] = value
    }
  })
  return merged
}
