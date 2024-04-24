import {
  useAutopilotConfigEvaluate,
  useBusState,
} from '@siafoundation/renterd-react'
import { transformUp } from './transformUp'
import { Resources, checkIfAllResourcesLoaded } from './resources'
import BigNumber from 'bignumber.js'
import { RecommendationItem, SettingsData } from './types'
import { UseFormReturn } from 'react-hook-form'
import { useMemo } from 'react'
import { transformDownGouging } from './transformDown'
import { Fields, getFields } from './fields'
import { humanNumber, humanSiacoin, toHastings } from '@siafoundation/units'
import { lowerFirst } from '@technically/lodash'
import { GougingSettings } from '@siafoundation/renterd-types'

export function useAutopilotEvaluations({
  form,
  resources,
  isAutopilotEnabled,
  showAdvanced,
  estimatedSpendingPerMonth,
}: {
  form: UseFormReturn<SettingsData>
  resources: Resources
  isAutopilotEnabled: boolean
  showAdvanced: boolean
  estimatedSpendingPerMonth: BigNumber
}) {
  const values = form.watch()
  const renterdState = useBusState()
  const payloads = useMemo(() => {
    if (!checkIfAllResourcesLoaded(resources)) {
      return
    }
    if (!form.formState.isValid) {
      return
    }
    if (!renterdState.data) {
      return
    }

    const { payloads } = transformUp({
      resources,
      renterdState: renterdState.data,
      isAutopilotEnabled,
      showAdvanced,
      estimatedSpendingPerMonth,
      values,
    })
    return payloads
  }, [
    form,
    values,
    resources,
    renterdState,
    isAutopilotEnabled,
    showAdvanced,
    estimatedSpendingPerMonth,
  ])

  const userContractCountTarget = payloads?.autopilot.contracts.amount || 0

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
      redundancySettings: payloads?.redundancy,
      autopilotConfig: payloads?.autopilot,
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
      gougingSettings: payloads?.gouging,
      redundancySettings: payloads?.redundancy,
      autopilotConfig: {
        ...payloads?.autopilot,
        contracts: {
          ...payloads?.autopilot.contracts,
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
      gougingSettings: payloads?.gouging,
      redundancySettings: payloads?.redundancy,
      autopilotConfig: {
        ...payloads?.autopilot,
        contracts: {
          ...payloads?.autopilot.contracts,
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
      gougingSettings: recommendedGougingSettings,
      redundancySettings: payloads?.redundancy,
      autopilotConfig: payloads?.autopilot,
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
    const recs = []
    const gougingKeys = Object.keys(recommendedGougingSettings)
    gougingKeys.forEach((key) => {
      if (recommendedGougingSettings[key] !== payloads.gouging[key]) {
        const rec = getRecommendationItem({
          key: remoteToLocalFields[key],
          recommendationDown,
          values,
        })
        if (rec) {
          recs.push(rec)
        }
      }
    })
    return recs
  }, [recommendedGougingSettings, resources, payloads, values])
  const foundRecommendation = !!recommendations.length

  return {
    hostMargin50,
    hostMargin10,
    hostTarget50,
    hostTarget10,
    usableHostsCurrent,
    userContractCountTarget,
    usableHostsAfterRecommendation,
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
}): RecommendationItem {
  if (fields[key].type === 'siacoin') {
    const currentValue = values[key] as BigNumber
    const targetValue = recommendationDown[key]
    const direction = currentValue.lt(targetValue) ? 'up' : 'down'
    return {
      key,
      title: lowerFirst(fields[key].title),
      currentLabel: `${humanSiacoin(toHastings(currentValue), {
        fixed: 1,
      })}${fields[key].units?.replace('SC/', '/')}`,
      targetLabel: `${humanSiacoin(toHastings(recommendationDown[key]), {
        fixed: 1,
      })}${fields[key].units?.replace('SC/', '/')}`,
      currentValue,
      targetValue: recommendationDown[key],
      direction,
    }
  }
  if (fields[key].type === 'number') {
    const currentValue = values[key] as BigNumber
    const targetValue = recommendationDown[key]
    const direction = currentValue.lt(targetValue) ? 'up' : 'down'
    return {
      key,
      title: lowerFirst(fields[key].title),
      currentLabel: `${humanNumber(currentValue)} ${fields[key].units}`,
      targetLabel: `${humanNumber(recommendationDown[key])} ${
        fields[key].units
      }`,
      currentValue: currentValue,
      targetValue: recommendationDown[key],
      direction,
    }
  }
  return null
}

// We just need some of the static metadata so pass in dummy values.
const fields = getFields({
  isAutopilotEnabled: true,
  showAdvanced: true,
  maxStoragePriceTBMonth: new BigNumber(0),
  maxUploadPriceTB: new BigNumber(0),
  minShards: new BigNumber(0),
  totalShards: new BigNumber(0),
  redundancyMultiplier: new BigNumber(0),
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
