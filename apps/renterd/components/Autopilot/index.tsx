import {
  Text,
  Button,
  triggerSuccessToast,
  Reset16,
  TBToBytes,
  ValueSc,
  useSiacoinFiat,
  ValueNum,
  Save16,
  ConfigurationPanel,
  triggerErrorToast,
  useOnInvalid,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo } from 'react'
import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import {
  useAutopilotConfig,
  useAutopilotConfigUpdate,
} from '@siafoundation/react-renterd'
import { humanBytes, toHastings, toScale } from '@siafoundation/sia-js'
import { initialValues, fields } from './fields'
import { transformDown, transformUp } from './transform'
import { useForm } from 'react-hook-form'

export function Autopilot() {
  const { openDialog } = useDialog()
  const configUpdate = useAutopilotConfigUpdate()
  const config = useAutopilotConfig({
    // Do not automatically refetch
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  const form = useForm({
    mode: 'all',
    defaultValues: initialValues,
  })

  const onValid = useCallback(
    async (values: typeof initialValues) => {
      if (!config.data) {
        return
      }
      try {
        await configUpdate.put({
          payload: transformUp(values, config.data),
        })
        triggerSuccessToast('Configuration has been saved.')
      } catch (e) {
        triggerErrorToast((e as Error).message)
        console.log(e)
      }
    },
    [config.data, configUpdate]
  )

  const onInvalid = useOnInvalid(fields)

  const onSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  const resetFormData = useCallback(() => {
    if (!config.data) {
      return
    }
    form.reset(transformDown(config.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, config])

  const revalidateAndResetFormData = useCallback(async () => {
    await config.mutate()
    // Theoretically mutate should trigger the init effect,
    // but for some reason it does not (maybe when the response is cached?)
    // therefore we manually call form.reset.
    resetFormData()
  }, [resetFormData, config])

  // init - when new config is fetched, reset the form with the values
  useEffect(() => {
    resetFormData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.data])

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
            onClick={() => revalidateAndResetFormData()}
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
