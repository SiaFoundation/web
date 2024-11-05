import { objectEntries } from '@siafoundation/design-system'
import { currencyOptions } from '@siafoundation/react-core'
import {
  useAutopilotConfigEvaluate,
  useAutopilotState,
  useBusState,
} from '@siafoundation/renterd-react'
import {
  humanNumber,
  humanSiacoin,
  siacoinToFiat,
  toHastings,
} from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { useCallback, useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { getFields } from './fields'
import {
  ResourcesMaybeLoaded,
  ResourcesRequiredLoaded,
  checkIfAllResourcesLoaded,
} from './useResources'
import { transformDownGouging } from './transformDown'
import { transformUp } from './transformUp'
import {
  InputValuesGouging,
  RecommendationItem,
  InputValues,
  getAdvancedDefaults,
  Values,
} from './types'
import { useEnabledPricingValuesInSiacoin } from './useEnabledPricingValuesInSiacoin'
import { useFormExchangeRate } from './useFormExchangeRate'
import { AutopilotConfigEvaluatePayload } from '@siafoundation/renterd-types'

export function useAutopilotEvaluations({
  form,
  resources,
  isAutopilotEnabled,
}: {
  form: UseFormReturn<InputValues>
  resources: ResourcesMaybeLoaded
  isAutopilotEnabled: boolean
}) {
  const values = form.watch()
  const renterdState = useBusState()
  const autopilotState = useAutopilotState()

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
    if (!autopilotState.data?.configured) {
      return false
    }
    return true
  }, [
    isAutopilotEnabled,
    form.formState.isValid,
    resources,
    renterdState.data,
    autopilotState.data,
  ])

  // Convert any pinned fields over to siacoin values.
  const pricing = useEnabledPricingValuesInSiacoin({
    form,
  })

  const currentValuesWithPinnedOverridesAndDefaults = useMemo(() => {
    // Any pinned values are converted to siacoin and merged into the
    // corresponding non-pinned fields.
    const valuesWithPinnedOverrides = {
      ...values,
      ...pricing,
    }
    // We need to pass valid settings data into transformUp to get the payloads.
    // The form can be invalid or have empty fields depending on the mode, so we
    // need to merge in default data to make sure numbers are not undefined in
    // the transformUp calculations that assume all data is valid and present.
    return mergeValuesWithDefaultsOrZeroValues(
      valuesWithPinnedOverrides,
      resources.autopilotInfo.data?.state?.network
    )
  }, [values, pricing, resources.autopilotInfo.data?.state?.network])

  const payloads = useMemo(() => {
    if (!hasDataToEvaluate || !renterdState.data) {
      return
    }

    const { payloads } = transformUp({
      resources: resources as ResourcesRequiredLoaded,
      renterdState: renterdState.data,
      isAutopilotEnabled,
      values: currentValuesWithPinnedOverridesAndDefaults,
    })
    return payloads
  }, [
    currentValuesWithPinnedOverridesAndDefaults,
    resources,
    renterdState,
    isAutopilotEnabled,
    hasDataToEvaluate,
  ])

  const userContractCountTarget = payloads?.autopilot?.contracts.amount || 0

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
      gougingSettings: payloads?.gouging,
      redundancySettings: payloads?.upload.redundancy,
      autopilotConfig: payloads?.autopilot,
    } as AutopilotConfigEvaluatePayload,
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
      gougingSettings: payloads?.gouging,
      redundancySettings: payloads?.upload.redundancy,
      autopilotConfig: {
        ...payloads?.autopilot,
        contracts: {
          ...payloads?.autopilot?.contracts,
          amount: hostTarget50,
        },
      },
    } as AutopilotConfigEvaluatePayload,
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
      gougingSettings: payloads?.gouging,
      redundancySettings: payloads?.upload.redundancy,
      autopilotConfig: {
        ...payloads?.autopilot,
        contracts: {
          ...payloads?.autopilot?.contracts,
          amount: hostTarget10,
        },
      },
    } as AutopilotConfigEvaluatePayload,
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
      gougingSettings: recommendedGougingSettings,
      redundancySettings: payloads?.upload.redundancy,
      autopilotConfig: payloads?.autopilot,
    } as AutopilotConfigEvaluatePayload,
    config: {
      swr: {
        keepPreviousData: usableAfterRecsEvalEnabled,
      },
    },
  })
  const usableHostsAfterRecommendation = usableAfterRecsEval.data?.usable || 0

  const shouldPinMaxStoragePrice = form.watch('shouldPinMaxStoragePrice')
  const shouldPinMaxUploadPrice = form.watch('shouldPinMaxUploadPrice')
  const shouldPinMaxDownloadPrice = form.watch('shouldPinMaxDownloadPrice')

  const getIsFieldEnabled = useCallback(
    (key: string) => {
      const map: Record<string, boolean> = {
        maxStoragePriceTBMonth: !shouldPinMaxStoragePrice,
        maxUploadPriceTB: !shouldPinMaxUploadPrice,
        maxDownloadPriceTB: !shouldPinMaxDownloadPrice,
        maxStoragePriceTBMonthPinned: shouldPinMaxStoragePrice,
        maxUploadPriceTBPinned: shouldPinMaxUploadPrice,
        maxDownloadPriceTBPinned: shouldPinMaxDownloadPrice,
      }
      if (map[key] !== undefined) {
        return map[key]
      }
      return true
    },
    [
      shouldPinMaxStoragePrice,
      shouldPinMaxUploadPrice,
      shouldPinMaxDownloadPrice,
    ]
  )

  const { pinnedCurrency, rate } = useFormExchangeRate(form)

  const recommendations = useMemo(() => {
    if (!payloads || !recommendedGougingSettings) {
      return []
    }

    const recommendationsImprovement =
      usableHostsAfterRecommendation - usableHostsCurrent

    if (recommendationsImprovement <= 0) {
      return []
    }

    const recommended = transformDownGouging({
      gouging: recommendedGougingSettings,
      averages: resources.averages.data,
      hasBeenConfigured: true,
    })
    const recommendedPinned = pricesToPinnedPrices({
      exchangeRate: rate,
      maxStoragePriceTBMonth: recommended.maxStoragePriceTBMonth,
      maxDownloadPriceTB: recommended.maxDownloadPriceTB,
      maxUploadPriceTB: recommended.maxUploadPriceTB,
    })

    const recommendedValues = {
      ...recommended,
      ...recommendedPinned,
    }

    // Generate recommendation metadata for each value that differs from current settings.
    const recs: RecommendationItem[] = []
    Object.entries(recommendedValues).forEach(([key, targetValue]) => {
      const isEnabled = getIsFieldEnabled(key)
      // Only show recommendations for enabled visible fields.
      if (!isEnabled) {
        return
      }
      // Only show recommendations if the difference is greater than 1%.
      const currentValue = currentValuesWithPinnedOverridesAndDefaults[
        key as keyof Values
      ] as BigNumber
      const percentDifference = targetValue
        .minus(currentValue)
        .div(currentValue)
        .times(100)
      if (percentDifference.lte(1)) {
        return
      }
      const rec = getRecommendationItem({
        key: key as keyof RecommendableFields,
        currentValue,
        targetValue,
        currencyId: pinnedCurrency,
      })
      if (rec) {
        recs.push(rec)
      }
    })
    return recs
  }, [
    recommendedGougingSettings,
    resources,
    payloads,
    currentValuesWithPinnedOverridesAndDefaults,
    getIsFieldEnabled,
    pinnedCurrency,
    usableHostsCurrent,
    usableHostsAfterRecommendation,
    rate,
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
  currentValue,
  targetValue,
  currencyId,
}: {
  key: keyof RecommendableFields
  currentValue: BigNumber
  targetValue: BigNumber
  currencyId: string
}): RecommendationItem {
  const direction = currentValue.lt(targetValue) ? 'up' : 'down'
  const rec: RecommendationItem = {
    key,
    hrefId: fieldToHrefId[key],
    title: fieldToLabel[key],
    currentValue,
    targetValue,
    direction,
    currentLabel: '',
    targetLabel: '',
  }
  if (fields[key].type === 'siacoin') {
    const format = (val: BigNumber) =>
      `${humanSiacoin(toHastings(val), {
        fixed: 1,
      })}${fields[key].units?.replace('SC/', '/') || ''}`
    rec.currentLabel = format(currentValue)
    rec.targetLabel = format(targetValue)
  }
  if (fields[key].type === 'number') {
    const format = (val: BigNumber) =>
      `${humanNumber(val)} ${fields[key].units}`
    rec.currentLabel = format(currentValue)
    rec.targetLabel = format(targetValue)
  }
  if (fields[key].type === 'fiat') {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const currency = currencyOptions.find((c) => c.id === currencyId)!
    const format = (val: BigNumber) =>
      `${currency?.prefix}${humanNumber(val, {
        fixed: currency.fixed,
      })} ${currency?.label}${fields[key].units}`
    rec.currentLabel = format(currentValue)
    rec.targetLabel = format(targetValue)
  }
  return rec
}

function pricesToPinnedPrices({
  exchangeRate,
  maxStoragePriceTBMonth,
  maxDownloadPriceTB,
  maxUploadPriceTB,
}: {
  exchangeRate?: BigNumber
  maxStoragePriceTBMonth: BigNumber
  maxDownloadPriceTB: BigNumber
  maxUploadPriceTB: BigNumber
}) {
  if (!exchangeRate) {
    return undefined
  }
  return {
    maxStoragePriceTBMonthPinned: siacoinToFiat(
      maxStoragePriceTBMonth,
      exchangeRate
    ),
    maxDownloadPriceTBPinned: siacoinToFiat(maxDownloadPriceTB, exchangeRate),
    maxUploadPriceTBPinned: siacoinToFiat(maxUploadPriceTB, exchangeRate),
  }
}

// We just need some of the static metadata so pass in dummy values.
const fields = getFields({
  validationContext: {
    isAutopilotEnabled: true,
    configViewMode: 'basic',
  },
  isAutopilotEnabled: true,
  configViewMode: 'basic',
  recommendations: {},
})

type PinnablePrices = {
  maxStoragePriceTBMonthPinned: BigNumber
  maxUploadPriceTBPinned: BigNumber
  maxDownloadPriceTBPinned: BigNumber
}

type RecommendableFields = InputValuesGouging & PinnablePrices

const fieldToHrefId: Record<keyof RecommendableFields, string> = {
  maxStoragePriceTBMonth: 'maxStoragePriceTBMonthGroup',
  maxDownloadPriceTB: 'maxDownloadPriceTBGroup',
  maxUploadPriceTB: 'maxUploadPriceTBGroup',
  maxRPCPriceMillion: 'maxRPCPriceMillionGroup',
  maxStoragePriceTBMonthPinned: 'maxStoragePriceTBMonthGroup',
  maxUploadPriceTBPinned: 'maxUploadPriceTBGroup',
  maxDownloadPriceTBPinned: 'maxDownloadPriceTBGroup',
  maxContractPrice: 'maxContractPrice',
  hostBlockHeightLeeway: 'hostBlockHeightLeeway',
  minPriceTableValidityMinutes: 'minPriceTableValidityMinutes',
  minAccountExpiryDays: 'minAccountExpiryDays',
  minMaxEphemeralAccountBalance: 'minMaxEphemeralAccountBalance',
  migrationSurchargeMultiplier: 'migrationSurchargeMultiplier',
}

const fieldToLabel: Record<keyof RecommendableFields, string> = {
  maxStoragePriceTBMonth: 'max storage price',
  maxDownloadPriceTB: 'max download price',
  maxUploadPriceTB: 'max upload price',
  maxRPCPriceMillion: 'max RPC price',
  maxStoragePriceTBMonthPinned: 'max storage price',
  maxUploadPriceTBPinned: 'max upload price',
  maxDownloadPriceTBPinned: 'max download price',
  maxContractPrice: 'max contract price',
  hostBlockHeightLeeway: 'host block height leeway',
  minPriceTableValidityMinutes: 'min price table validity',
  minAccountExpiryDays: 'min account expiry',
  minMaxEphemeralAccountBalance: 'min max ephemeral account balance',
  migrationSurchargeMultiplier: 'migration surcharge multiplier',
}

export const valuesZeroDefaults: Values = {
  autopilotContractSet: '',
  amountHosts: new BigNumber(0),
  periodWeeks: new BigNumber(0),
  renewWindowWeeks: new BigNumber(0),
  downloadTBMonth: new BigNumber(0),
  uploadTBMonth: new BigNumber(0),
  storageTB: new BigNumber(0),
  prune: false,
  allowRedundantIPs: false,
  maxDowntimeHours: new BigNumber(0),
  maxConsecutiveScanFailures: new BigNumber(0),
  minProtocolVersion: '',
  defaultContractSet: '',
  uploadPackingEnabled: true,
  maxRPCPriceMillion: new BigNumber(0),
  shouldPinMaxStoragePrice: false,
  maxStoragePriceTBMonth: new BigNumber(0),
  maxStoragePriceTBMonthPinned: new BigNumber(0),
  maxContractPrice: new BigNumber(0),
  shouldPinMaxDownloadPrice: false,
  maxDownloadPriceTB: new BigNumber(0),
  maxDownloadPriceTBPinned: new BigNumber(0),
  shouldPinMaxUploadPrice: false,
  maxUploadPriceTB: new BigNumber(0),
  maxUploadPriceTBPinned: new BigNumber(0),
  hostBlockHeightLeeway: new BigNumber(0),
  minPriceTableValidityMinutes: new BigNumber(0),
  minAccountExpiryDays: new BigNumber(0),
  minMaxEphemeralAccountBalance: new BigNumber(0),
  migrationSurchargeMultiplier: new BigNumber(0),
  minShards: new BigNumber(0),
  totalShards: new BigNumber(0),
  pinnedCurrency: 'usd',
  pinnedThreshold: new BigNumber(0),
}

// Current value, otherwise advanced default if there is one, otherwise zero value.
export function mergeValuesWithDefaultsOrZeroValues(
  values: InputValues,
  network: 'mainnet' | 'zen' | 'anagami' = 'mainnet'
) {
  const defaults = getAdvancedDefaults(network)
  const merged = {
    ...valuesZeroDefaults,
    ...defaults,
  }
  // Apply any non-zero user values.
  objectEntries(values).forEach(([key, value]) => {
    if (value !== undefined) {
      // @ts-expect-error Silence type error.
      merged[key] = value
    }
  })
  return merged
}
