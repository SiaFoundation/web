import {
  Text,
  Button,
  triggerSuccessToast,
  triggerErrorToast,
  Reset16,
  Save16,
  ConfigurationPanel,
  TBToBytes,
  monthsToBlocks,
  useOnInvalid,
} from '@siafoundation/design-system'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../../components/RenterdAuthedLayout'
import {
  ContractSetSettings,
  GougingSettings,
  RedundancySettings,
  useSettingUpdate,
} from '@siafoundation/react-renterd'
import { defaultValues, getFields } from './fields'
import {
  transformDown,
  transformUpContractSet,
  transformUpGouging,
  transformUpRedundancy,
} from './transform'
import { useForm } from 'react-hook-form'
import { useSiaCentralHostsNetworkAverages } from '@siafoundation/react-core'
import { toSiacoins } from '@siafoundation/sia-js'
import { useContractSetSettings } from '../../hooks/useContractSetSettings'
import { useGougingSettings } from '../../hooks/useGougingSettings'
import { useRedundancySettings } from '../../hooks/useRedundancySettings'

export function Config() {
  const { openDialog } = useDialog()
  const contractSet = useContractSetSettings({
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
      },
    },
  })
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
      contractSetData: ContractSetSettings,
      gougingData: GougingSettings,
      redundancyData: RedundancySettings
    ) => {
      form.reset(transformDown(contractSetData, gougingData, redundancyData))
    },
    [form]
  )

  // init - when new config is fetched, set the form
  const [hasInit, setHasInit] = useState(false)
  useEffect(() => {
    if (contractSet.data && gouging.data && redundancy.data && !hasInit) {
      resetFormData(contractSet.data, gouging.data, redundancy.data)
      setHasInit(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gouging.data, redundancy.data])

  const reset = useCallback(async () => {
    const contractSetData = await contractSet.mutate()
    const gougingData = await gouging.mutate()
    const redundancyData = await redundancy.mutate()
    if (!gougingData || !redundancyData) {
      triggerErrorToast('Error fetching settings.')
    } else {
      resetFormData(contractSetData, gougingData, redundancyData)
    }
  }, [contractSet, gouging, redundancy, resetFormData])

  const minShards = form.watch('minShards')
  const totalShards = form.watch('totalShards')

  const fields = useMemo(() => {
    if (
      averages.data &&
      minShards &&
      totalShards &&
      !minShards.isZero() &&
      !totalShards.isZero() &&
      totalShards.gte(minShards)
    ) {
      const redundancy = totalShards.div(minShards)
      return getFields({
        storageAverage: toSiacoins(averages.data.settings.storage_price) // bytes/block
          .times(monthsToBlocks(1)) // bytes/month
          .times(TBToBytes(1)) // TB/month
          .times(redundancy), // adjust for redundancy
        downloadAverage: toSiacoins(averages.data.settings.download_price) // bytes
          .times(TBToBytes(1)) // TB
          .times(redundancy), // adjust for redundancy
        uploadAverage: toSiacoins(averages.data.settings.upload_price) // bytes
          .times(TBToBytes(1)) // TB
          .times(redundancy), // adjust for redundancy
        contractAverage: toSiacoins(averages.data.settings.contract_price),
      })
    }
    return getFields({})
  }, [averages.data, minShards, totalShards])

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
        if (contractSetResponse.error) {
          throw Error(contractSetResponse.error)
        }
        if (gougingResponse.error) {
          throw Error(gougingResponse.error)
        }
        if (redundancyResponse.error) {
          throw Error(redundancyResponse.error)
        }
        triggerSuccessToast('Configuration has been saved.')
        reset()
      } catch (e) {
        triggerErrorToast((e as Error).message)
        console.log(e)
      }
    },
    [settingUpdate, contractSet, redundancy, gouging, reset]
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
