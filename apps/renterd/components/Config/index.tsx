import {
  Text,
  Button,
  triggerSuccessToast,
  triggerErrorToast,
  ConfigurationPanel,
  TBToBytes,
  monthsToBlocks,
  useOnInvalid,
} from '@siafoundation/design-system'
import { Reset16, Save16 } from '@siafoundation/react-icons'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../../components/RenterdAuthedLayout'
import {
  ContractSetSettings,
  GougingSettings,
  RedundancySettings,
  UploadPackingSettings,
  useSettingUpdate,
} from '@siafoundation/react-renterd'
import { defaultValues, getFields } from './fields'
import {
  getRedundancyMultiplier,
  getRedundancyMultiplierIfIncluded,
  transformDown,
  transformUpConfigApp,
  transformUpContractSet,
  transformUpGouging,
  transformUpRedundancy,
  transformUpUploadPacking,
} from './transform'
import { useForm } from 'react-hook-form'
import { toSiacoins } from '@siafoundation/sia-js'
import { useContractSetSettings } from '../../hooks/useContractSetSettings'
import { useGougingSettings } from '../../hooks/useGougingSettings'
import { useRedundancySettings } from '../../hooks/useRedundancySettings'
import {
  ConfigDisplayOptions,
  configDisplayOptionsKey,
  useConfigDisplayOptions,
} from '../../hooks/useConfigDisplayOptions'
import { useUploadPackingSettings } from '../../hooks/useUploadPackingSettings'
import { useSiaCentralHostsNetworkAverages } from '@siafoundation/react-sia-central'

export function Config() {
  const { openDialog } = useDialog()
  // settings that 404 when empty
  const contractSet = useContractSetSettings({
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
        errorRetryCount: 0,
      },
    },
  })
  const configApp = useConfigDisplayOptions({
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
        errorRetryCount: 0,
      },
    },
  })
  // settings with initial defaults
  const gouging = useGougingSettings({
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
      },
    },
  })
  const redundancy = useRedundancySettings({
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
      },
    },
  })
  const uploadPacking = useUploadPackingSettings({
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
      },
    },
  })

  const settingUpdate = useSettingUpdate()

  const averages = useSiaCentralHostsNetworkAverages({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const resetFormData = useCallback(
    (
      contractSetData: ContractSetSettings | undefined,
      uploadPackingData: UploadPackingSettings,
      gougingData: GougingSettings,
      redundancyData: RedundancySettings,
      configAppData: ConfigDisplayOptions | undefined
    ) => {
      form.reset(
        transformDown(
          contractSetData,
          uploadPackingData,
          gougingData,
          redundancyData,
          configAppData
        )
      )
    },
    [form]
  )

  // init - when new config is fetched, set the form
  const [hasInit, setHasInit] = useState(false)
  useEffect(() => {
    if (
      gouging.data &&
      redundancy.data &&
      uploadPacking.data &&
      (contractSet.data || contractSet.error) &&
      (configApp.data || configApp.error) &&
      !hasInit
    ) {
      resetFormData(
        contractSet.data,
        uploadPacking.data,
        gouging.data,
        redundancy.data,
        configApp.data
      )
      setHasInit(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    contractSet.data,
    contractSet.error,
    uploadPacking.data,
    gouging.data,
    redundancy.data,
    configApp.data,
    configApp.error,
  ])

  const reset = useCallback(async () => {
    const contractSetData = await contractSet.mutate()
    const gougingData = await gouging.mutate()
    const redundancyData = await redundancy.mutate()
    const uploadPackingData = await uploadPacking.mutate()
    const configAppData = await configApp.mutate()
    if (!gougingData || !redundancyData) {
      triggerErrorToast('Error fetching settings.')
    } else {
      resetFormData(
        contractSetData,
        uploadPackingData,
        gougingData,
        redundancyData,
        configAppData
      )
    }
  }, [
    contractSet,
    gouging,
    uploadPacking,
    redundancy,
    configApp,
    resetFormData,
  ])

  const minShards = form.watch('minShards')
  const totalShards = form.watch('totalShards')
  const includeRedundancyMaxStoragePrice = form.watch(
    'includeRedundancyMaxStoragePrice'
  )
  const includeRedundancyMaxUploadPrice = form.watch(
    'includeRedundancyMaxUploadPrice'
  )

  const fields = useMemo(() => {
    const redundancyMultiplier = getRedundancyMultiplier(minShards, totalShards)
    if (averages.data) {
      return getFields({
        redundancyMultiplier,
        includeRedundancyMaxStoragePrice,
        includeRedundancyMaxUploadPrice,
        storageAverage: toSiacoins(averages.data.settings.storage_price) // bytes/block
          .times(monthsToBlocks(1)) // bytes/month
          .times(TBToBytes(1)) // TB/month
          .times(
            getRedundancyMultiplierIfIncluded(
              minShards,
              totalShards,
              includeRedundancyMaxStoragePrice
            )
          ), // redundancy
        uploadAverage: toSiacoins(averages.data.settings.upload_price) // bytes
          .times(TBToBytes(1)) // TB
          .times(
            getRedundancyMultiplierIfIncluded(
              minShards,
              totalShards,
              includeRedundancyMaxUploadPrice
            )
          ), // redundancy
        downloadAverage: toSiacoins(averages.data.settings.download_price) // bytes
          .times(TBToBytes(1)), // TB
        contractAverage: toSiacoins(averages.data.settings.contract_price),
      })
    }
    return getFields({
      redundancyMultiplier,
      includeRedundancyMaxStoragePrice,
      includeRedundancyMaxUploadPrice,
    })
  }, [
    averages.data,
    minShards,
    totalShards,
    includeRedundancyMaxStoragePrice,
    includeRedundancyMaxUploadPrice,
  ])

  const onValid = useCallback(
    async (values: typeof defaultValues) => {
      if (!gouging.data || !redundancy.data) {
        return
      }
      try {
        const contractSetResponse = await settingUpdate.put({
          params: {
            key: 'contractset',
          },
          payload: transformUpContractSet(
            values,
            contractSet.data as Record<string, unknown>
          ),
        })
        const uploadPackingResponse = await settingUpdate.put({
          params: {
            key: 'uploadpacking',
          },
          payload: transformUpUploadPacking(
            values,
            uploadPacking.data as Record<string, unknown>
          ),
        })
        const gougingResponse = await settingUpdate.put({
          params: {
            key: 'gouging',
          },
          payload: transformUpGouging(
            values,
            gouging.data as Record<string, unknown>
          ),
        })
        const redundancyResponse = await settingUpdate.put({
          params: {
            key: 'redundancy',
          },
          payload: transformUpRedundancy(
            values,
            redundancy.data as Record<string, unknown>
          ),
        })
        const configAppResponse = await settingUpdate.put({
          params: {
            key: configDisplayOptionsKey,
          },
          payload: transformUpConfigApp(
            values,
            configApp.data as Record<string, unknown>
          ),
        })
        if (contractSetResponse.error) {
          throw Error(contractSetResponse.error)
        }
        if (uploadPackingResponse.error) {
          throw Error(uploadPackingResponse.error)
        }
        if (gougingResponse.error) {
          throw Error(gougingResponse.error)
        }
        if (redundancyResponse.error) {
          throw Error(redundancyResponse.error)
        }
        if (configAppResponse.error) {
          throw Error(configAppResponse.error)
        }
        triggerSuccessToast('Configuration has been saved.')
        reset()
      } catch (e) {
        triggerErrorToast((e as Error).message)
        console.log(e)
      }
    },
    [
      settingUpdate,
      contractSet,
      uploadPacking,
      redundancy,
      gouging,
      configApp,
      reset,
    ]
  )

  const onInvalid = useOnInvalid(fields)

  const onSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  const changeCount = Object.entries(form.formState.dirtyFields).filter(
    ([_, val]) => !!val
  ).length

  return (
    <RenterdAuthedLayout
      title="Configuration"
      routes={routes}
      sidenav={<RenterdSidenav />}
      actions={
        <div className="flex items-center gap-2">
          {!!changeCount && (
            <Text size="12" color="subtle">
              {changeCount === 1 ? '1 change' : `${changeCount} changes`}
            </Text>
          )}
          <Button
            tip="Reset all changes"
            icon="contrast"
            disabled={!changeCount}
            onClick={reset}
          >
            <Reset16 />
          </Button>
          <Button
            tip="Save all changes"
            variant="accent"
            disabled={!form.formState.isDirty || form.formState.isSubmitting}
            onClick={onSubmit}
          >
            <Save16 />
            Save changes
          </Button>
        </div>
      }
      openSettings={() => openDialog('settings')}
    >
      <div className="p-6 flex flex-col gap-16 max-w-screen-xl">
        <ConfigurationPanel
          title="Contracts"
          category="contractset"
          fields={fields}
          form={form}
        />
        <ConfigurationPanel
          title="Uploads"
          category="uploadpacking"
          fields={fields}
          form={form}
        />
        <ConfigurationPanel
          title="Gouging"
          category="gouging"
          fields={fields}
          form={form}
        />
        <ConfigurationPanel
          title="Redundancy"
          category="redundancy"
          fields={fields}
          form={form}
        />
      </div>
    </RenterdAuthedLayout>
  )
}
