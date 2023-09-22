import {
  Text,
  Button,
  triggerSuccessToast,
  TBToBytes,
  ValueSc,
  useSiacoinFiat,
  ValueNum,
  ConfigurationPanel,
  triggerErrorToast,
  useOnInvalid,
  Switch,
  ControlGroup,
  Popover,
  Label,
  Paragraph,
} from '@siafoundation/design-system'
import { Reset16, Save16, Settings16 } from '@siafoundation/react-icons'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import {
  AutopilotConfig,
  autopilotHostsKey,
  useAutopilotConfig,
  useAutopilotConfigUpdate,
} from '@siafoundation/react-renterd'
import { humanBytes, toHastings, toScale } from '@siafoundation/sia-js'
import { defaultValues, fields } from './fields'
import { transformDown, transformUp } from './transform'
import { useForm } from 'react-hook-form'
import { useSyncContractSet } from './useSyncContractSet'
import { delay, useMutate } from '@siafoundation/react-core'

export function Autopilot() {
  const { openDialog } = useDialog()
  const configUpdate = useAutopilotConfigUpdate()
  const config = useAutopilotConfig({
    // Do not automatically refetch
    config: {
      swr: {
        revalidateOnFocus: false,
        errorRetryCount: 0,
      },
    },
  })
  const {
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    syncDefaultContractSet,
  } = useSyncContractSet()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const resetFormData = useCallback(
    (data: AutopilotConfig) => {
      form.reset(transformDown(data))
    },
    [form]
  )

  // init - when new config is fetched, set the form
  const [hasInit, setHasInit] = useState(false)
  useEffect(() => {
    if (config.data && !hasInit) {
      resetFormData(config.data)
      setHasInit(true)
      return
    }
    if (config.error?.status === 404 && !hasInit) {
      form.reset(defaultValues)
      setHasInit(true)
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.data, config.error])

  const reset = useCallback(async () => {
    const data = await config.mutate()
    if (!data) {
      triggerErrorToast('Error fetching config.')
    } else {
      resetFormData(data)
    }
  }, [config, resetFormData])

  const mutate = useMutate()
  const onValid = useCallback(
    async (values: typeof defaultValues) => {
      try {
        const firstTimeSettingConfig = !config.data
        await configUpdate.put({
          payload: transformUp(values, config.data),
        })
        triggerSuccessToast('Configuration has been saved.')
        syncDefaultContractSet(values.set)

        // if autopilot is being configured for the first time,
        // revalidate the empty hosts list.
        if (firstTimeSettingConfig) {
          const refreshHostsAfterDelay = async () => {
            await delay(5_000)
            mutate((key) => key.startsWith(autopilotHostsKey))
            await delay(5_000)
            mutate((key) => key.startsWith(autopilotHostsKey))
          }
          refreshHostsAfterDelay()
        }

        reset()
      } catch (e) {
        triggerErrorToast((e as Error).message)
        console.log(e)
      }
    },
    [config.data, configUpdate, reset, syncDefaultContractSet, mutate]
  )

  const onInvalid = useOnInvalid(fields)

  const onSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  const storage = form.watch('storage')
  const period = form.watch('period')
  const allowance = form.watch('allowance')

  const canEstimate = useMemo(() => {
    return !(
      !storage ||
      !period ||
      !allowance ||
      storage.isZero() ||
      period.isZero() ||
      allowance.isZero()
    )
  }, [storage, period, allowance])

  const estimatedSpending = useMemo(() => {
    if (!canEstimate) {
      return new BigNumber(0)
    }
    const estimatePerPeriod = allowance
    const estimatePerWeek = estimatePerPeriod.div(period)
    const estimatePerMonth = estimatePerWeek.div(7).times(30)
    return toScale(estimatePerMonth, 0)
  }, [canEstimate, period, allowance])

  const changeCount = Object.entries(form.formState.dirtyFields).filter(
    ([_, val]) => !!val
  ).length

  const { fiat, currency } = useSiacoinFiat({ sc: estimatedSpending })

  return (
    <RenterdAuthedLayout
      title="Autopilot"
      routes={routes}
      sidenav={<RenterdSidenav />}
      stats={
        !canEstimate ? (
          <Text size="12" font="mono" weight="medium">
            Enter expected storage, period, and allowance values to estimate
            monthly spending.
          </Text>
        ) : (
          <div className="flex gap-3">
            <Text size="12" font="mono" weight="medium">
              Estimate:
            </Text>
            <div className="flex gap-1">
              <ValueSc
                size="12"
                value={toHastings(estimatedSpending)}
                dynamicUnits={false}
                fixed={0}
                variant="value"
              />
              {fiat && (
                <div className="flex">
                  <ValueNum
                    size="12"
                    weight="medium"
                    value={fiat}
                    color="subtle"
                    variant="value"
                    format={(v) =>
                      `(${currency.prefix}${v.toFixed(currency.fixed)})`
                    }
                  />
                </div>
              )}
              <Text size="12" font="mono" weight="medium">
                per month to store {humanBytes(TBToBytes(storage).toNumber())}
              </Text>
            </div>
          </div>
        )
      }
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
          <ControlGroup>
            <Button
              tip="Save all changes"
              variant="accent"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
              onClick={onSubmit}
            >
              <Save16 />
              Save changes
            </Button>
            <Popover
              contentProps={{
                align: 'end',
              }}
              trigger={
                <Button variant="accent" icon="hover">
                  <Settings16 />
                </Button>
              }
            >
              <div className="px-1">
                <Label>Options</Label>
                <div>
                  <Switch
                    checked={shouldSyncDefaultContractSet}
                    onCheckedChange={(val) =>
                      setShouldSyncDefaultContractSet(val)
                    }
                  >
                    sync default contract set
                  </Switch>
                  <Paragraph size="12">
                    Automatically update the default contract set to be the same
                    as the autopilot contract set when changes are saved.
                  </Paragraph>
                </div>
              </div>
            </Popover>
          </ControlGroup>
        </div>
      }
      openSettings={() => openDialog('settings')}
    >
      <div className="px-5 py-6 flex flex-col gap-16 max-w-screen-xl">
        <ConfigurationPanel
          title="Contracts"
          category="contracts"
          fields={fields}
          form={form}
        />
        <ConfigurationPanel
          title="Hosts"
          category="hosts"
          fields={fields}
          form={form}
        />
        <ConfigurationPanel
          title="Wallet"
          category="wallet"
          fields={fields}
          form={form}
        />
      </div>
    </RenterdAuthedLayout>
  )
}
