import {
  Separator,
  Text,
  ConfigurationSiacoin,
  ConfigurationNumber,
  Button,
  triggerSuccessToast,
  weeksToBlocks,
  blocksToWeeks,
  ConfigurationText,
  Code,
  useFormChanged,
  Reset16,
  TBToBytes,
  ConfigurationSwitch,
  ValueSc,
  useSiacoinFiat,
  ValueNum,
  bytesToTB,
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
import { useFormik } from 'formik'
import { Setting } from '../Setting'
import { MenuSection } from '../MenuSection'
import {
  humanBytes,
  toHastings,
  toScale,
  toSiacoins,
} from '@siafoundation/sia-js'
import * as Yup from 'yup'

const scDecimalPlaces = 6

const validationSchema = Yup.object().shape({
  // targetPrice: Yup.mixed().optional(),
  // contracts
  set: Yup.string().required('required'),
  amount: Yup.mixed().required('required'),
  allowance: Yup.mixed().required('required'),
  period: Yup.mixed().required('required'),
  renewWindow: Yup.mixed().required('required'),
  download: Yup.mixed().required('required'),
  upload: Yup.mixed().required('required'),
  storage: Yup.number().required('required'),
  // hosts
  allowRedundantIPs: Yup.bool().required('required'),
  maxDowntimeHours: Yup.number().required('required'),
  // wallet
  defragThreshold: Yup.number().required('required'),
})

const initialValues = {
  // contracts
  set: '',
  amount: undefined as BigNumber | undefined,
  allowance: undefined as BigNumber | undefined,
  period: undefined as BigNumber | undefined,
  renewWindow: undefined as BigNumber | undefined,
  download: undefined as BigNumber | undefined,
  upload: undefined as BigNumber | undefined,
  storage: undefined as BigNumber | undefined,
  // hosts
  allowRedundantIPs: false,
  maxDowntimeHours: undefined as BigNumber | undefined,
  // wallet
  defragThreshold: undefined as BigNumber | undefined,
}

const doNotIncludeInChanges = ['targetPrice']

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

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!config.data) {
        return
      }
      try {
        await configUpdate.put({
          payload: {
            contracts: {
              set: values.set,
              amount: values.amount.toNumber(),
              allowance: toHastings(values.allowance).toString(),
              period: weeksToBlocks(values.period.toNumber()),
              renewWindow: weeksToBlocks(values.renewWindow.toNumber()),
              download: TBToBytes(values.download).toNumber(),
              upload: TBToBytes(values.upload).toNumber(),
              storage: TBToBytes(values.storage).toNumber(),
            },
            hosts: {
              maxDowntimeHours: values.maxDowntimeHours.toNumber(),
              allowRedundantIPs: values.allowRedundantIPs,
              scoreOverrides: config.data.hosts.scoreOverrides,
            },
            wallet: {
              defragThreshold: values.defragThreshold.toNumber(),
            },
          },
        })
        triggerSuccessToast('Configuration has been saved.')
      } catch (e) {
        form.setErrors(e)
      }
    },
  })

  const resetFormAndData = useCallback(() => {
    form.resetForm()
    config.mutate()
  }, [form, config])

  useEffect(() => {
    const func = async () => {
      if (!config.data) {
        return
      }
      const set = config.data?.contracts.set
      const allowance = toSiacoins(
        config.data?.contracts.allowance,
        scDecimalPlaces
      )
      const amount = new BigNumber(config.data?.contracts.amount)
      const period = new BigNumber(blocksToWeeks(config.data?.contracts.period))
      const renewWindow = new BigNumber(
        blocksToWeeks(config.data?.contracts.renewWindow)
      )
      const download = bytesToTB(new BigNumber(config.data?.contracts.download))
      const upload = bytesToTB(new BigNumber(config.data?.contracts.upload))
      const storage = bytesToTB(new BigNumber(config.data?.contracts.storage))

      try {
        // When new config is fetched, reset the form with the initial values
        await form.resetForm({
          values: {
            // targetPrice,
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
            allowRedundantIPs: config.data.hosts.allowRedundantIPs,
            maxDowntimeHours: new BigNumber(config.data.hosts.maxDowntimeHours),
            // wallet
            defragThreshold: new BigNumber(config.data.wallet.defragThreshold),
          },
        })
      } catch (e) {
        console.log(e)
      }
    }
    func()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.data])

  const canEstimate = useMemo(() => {
    return !(
      !form.values.storage ||
      !form.values.period ||
      !form.values.allowance ||
      form.values.storage.isZero() ||
      form.values.period.isZero() ||
      form.values.allowance.isZero()
    )
  }, [form.values.storage, form.values.period, form.values.allowance])

  const targetPrice = useMemo(() => {
    if (!canEstimate) {
      return new BigNumber(0)
    }
    const {
      period, // in weeks
      allowance, // per period
    } = form.values
    const estimatePerPeriod = allowance
    const estimatePerWeek = estimatePerPeriod.div(period)
    const estimatePerMonth = estimatePerWeek.div(7).times(30)
    return toScale(estimatePerMonth, 0)
  }, [canEstimate, form.values])

  const { changed, changeCount } = useFormChanged(form, doNotIncludeInChanges)

  const { fiat, currency } = useSiacoinFiat({ sc: targetPrice })

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
                value={toHastings(targetPrice)}
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
                per month to store{' '}
                {humanBytes(TBToBytes(form.values.storage).toNumber())}
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
            onClick={() => resetFormAndData()}
          >
            <Reset16 />
          </Button>
          <Button
            tip="Save all changes"
            variant="accent"
            disabled={!changeCount}
            onClick={() => form.submitForm()}
          >
            Save changes
          </Button>
        </div>
      }
      openSettings={() => openDialog('settings')}
    >
      <div className="px-5 py-6 flex flex-col gap-16 max-w-screen-xl">
        <MenuSection title="Contracts">
          <Setting
            title="Expected storage"
            description={
              <>The amount of storage you would like to rent in TB.</>
            }
            control={
              <ConfigurationNumber
                formik={form}
                changed={changed}
                name="storage"
                units="TB"
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Expected upload"
            description={
              <>
                The amount of upload bandwidth you plan to use each period in
                TB.
              </>
            }
            control={
              <ConfigurationNumber
                formik={form}
                changed={changed}
                name="upload"
                units="TB"
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Expected download"
            description={
              <>
                The amount of download bandwidth you plan to use each period in
                TB.
              </>
            }
            control={
              <ConfigurationNumber
                formik={form}
                changed={changed}
                name="download"
                units="TB"
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Allowance"
            description={
              <>The amount of Siacoin you would like to spend for the period.</>
            }
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                name="allowance"
                decimalsLimitSc={scDecimalPlaces}
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Period"
            description={<>The length of the storage contracts.</>}
            control={
              <ConfigurationNumber
                formik={form}
                changed={changed}
                name="period"
                units="weeks"
                suggestion={new BigNumber(6)}
                suggestionTip={'Typically 6 weeks.'}
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Renew window"
            description={
              <>
                The number of weeks prior to contract expiration that Sia will
                attempt to renew your contracts.
              </>
            }
            control={
              <ConfigurationNumber
                formik={form}
                changed={changed}
                name="renewWindow"
                units="weeks"
                suggestion={new BigNumber(2)}
                suggestionTip={'Typically 2 weeks.'}
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Hosts"
            description={<>The number of hosts to create contracts with.</>}
            control={
              <ConfigurationNumber
                formik={form}
                changed={changed}
                name="amount"
                units="hosts"
                suggestion={new BigNumber(50)}
                suggestionTip={'Typically 50 hosts.'}
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Contract set"
            description={<>The contract set that autopilot should use.</>}
            control={
              <ConfigurationText
                formik={form}
                changed={changed}
                name="set"
                placeholder="autopilot"
                suggestion="autopilot"
                suggestionTip={
                  <>
                    The default contract set is <Code>autopilot</Code>, only
                    change this if you understand the implications.
                  </>
                }
              />
            }
          />
        </MenuSection>
        <MenuSection title="Hosts">
          <Setting
            title="Redundant IPs"
            description={
              <>
                Whether or not to allow forming contracts with multiple hosts in
                the same IP subnet. The subnets used are /16 for IPv4, and /64
                for IPv6.
              </>
            }
            control={
              <ConfigurationSwitch
                formik={form}
                changed={changed}
                name="allowRedundantIPs"
                suggestion={false}
                suggestionTip={'Defaults to off.'}
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Max downtime"
            description={
              <>
                The maximum amount of host downtime that autopilot will tolerate
                in hours.
              </>
            }
            control={
              <ConfigurationNumber
                formik={form}
                changed={changed}
                name="maxDowntimeHours"
                units="hours"
                suggestion={new BigNumber(1440)}
                suggestionTip={'Defaults to 1,440 which is 60 days.'}
              />
            }
          />
        </MenuSection>
        <MenuSection title="Wallet">
          <Setting
            title="Defrag threshold"
            description={
              <>The threshold after which autopilot will defrag outputs.</>
            }
            control={
              <ConfigurationNumber
                formik={form}
                changed={changed}
                name="defragThreshold"
                units="outputs"
                suggestion={new BigNumber(1000)}
                suggestionTip={'Defaults to 1,000.'}
              />
            }
          />
        </MenuSection>
      </div>
    </RenterdAuthedLayout>
  )
}
