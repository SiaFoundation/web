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
  TiBToBytes,
  bytesToTiB,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { RenterSidenav } from '../RenterSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import {
  useAutopilotConfig,
  useAutopilotConfigUpdate,
} from '@siafoundation/react-core'
import { useFormik } from 'formik'
import { Setting } from '../Setting'
import { MenuSection } from '../MenuSection'
import { toHastings, toSiacoins } from '@siafoundation/sia-js'

const scDecimalPlaces = 6

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
    initialValues: {
      set: '',
      amount: new BigNumber(0),
      allowance: new BigNumber(0),
      period: new BigNumber(0),
      renewWindow: new BigNumber(0),
      download: new BigNumber(0),
      upload: new BigNumber(0),
      storage: new BigNumber(0),
    },
    onSubmit: async (values, actions) => {
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
              download: TiBToBytes(values.download).toNumber(),
              upload: TiBToBytes(values.upload).toNumber(),
              storage: TiBToBytes(values.storage).toNumber(),
            },
            hosts: config.data.hosts,
            wallet: config.data.wallet,
          },
        })
        triggerSuccessToast('Configuration has been saved.')
      } catch (e) {
        form.setErrors(e)
      }
    },
  })

  const [targetPrice, setTargetPrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )

  const [allowanceSuggestion, setAllowanceSuggestion] = useState<BigNumber>(
    new BigNumber(0)
  )

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
      const download = bytesToTiB(
        new BigNumber(config.data?.contracts.download)
      )
      const upload = bytesToTiB(new BigNumber(config.data?.contracts.upload))
      const storage = bytesToTiB(new BigNumber(config.data?.contracts.storage))
      try {
        // When new config is fetched, reset the form with the initial values
        await form.resetForm({
          values: {
            set,
            allowance,
            amount,
            period,
            renewWindow,
            download,
            upload,
            storage,
          },
        })
      } catch (e) {
        console.log(e)
      }

      if (storage.isZero() || period.isZero()) {
        return
      }

      setTargetPrice(allowance.div(storage.times(period)))
    }
    func()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.data])

  useEffect(() => {
    setAllowanceSuggestion(
      form.values.storage
        .times(targetPrice)
        .times(form.values.period)
        .integerValue()
    )
  }, [form.values.storage, form.values.period, targetPrice])

  const { changed, changeCount } = useFormChanged(form)

  return (
    <RenterdAuthedLayout
      title="Autopilot"
      routes={routes}
      sidenav={<RenterSidenav />}
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
      <div className="p-5 flex flex-col gap-16 max-w-screen-xl">
        <MenuSection title="">
          <Setting
            title="Target price"
            description={
              <>
                The target price you would like to pay per month to to store 1
                TiB of data. This price and your expected utilization values are
                used to calculate a suggested allowance. Suggested values are
                shown below each input field.
              </>
            }
            control={
              <ConfigurationSiacoin
                value={targetPrice}
                onChange={setTargetPrice}
              />
            }
          />
        </MenuSection>
        <MenuSection title="Estimates">
          <Setting
            title="Expected storage"
            description={
              <>The amount of storage you would like to rent in TiB.</>
            }
            control={
              <ConfigurationNumber
                units="TiB"
                value={form.values.storage}
                changed={changed.storage}
                onChange={(value) => form.setFieldValue('storage', value)}
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Expected upload"
            description={
              <>
                The amount of upload bandwidth you plan to use each month in
                TiB.
              </>
            }
            control={
              <ConfigurationNumber
                units="TiB"
                value={form.values.upload}
                changed={changed.upload}
                onChange={(value) => form.setFieldValue('upload', value)}
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Expected download"
            description={
              <>
                The amount of download bandwidth you plan to use each month in
                TiB.
              </>
            }
            control={
              <ConfigurationNumber
                units="TiB"
                changed={changed.download}
                value={form.values.download}
                onChange={(value) => form.setFieldValue('download', value)}
              />
            }
          />
        </MenuSection>
        <MenuSection title="Settings">
          <Setting
            title="Allowance"
            description={
              <>The amount of Siacoin you would like to spend for the period.</>
            }
            control={
              <ConfigurationSiacoin
                value={form.values.allowance}
                changed={changed.allowance}
                onChange={(value) => form.setFieldValue('allowance', value)}
                suggestion={allowanceSuggestion}
                // decimalsLimitSc={0}
                suggestionTip={
                  'Suggested allowance based on your target price, expected usage, and period.'
                }
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Period"
            description={<>The length of the storage contracts.</>}
            control={
              <ConfigurationNumber
                units="weeks"
                value={form.values.period}
                changed={changed.period}
                onChange={(value) => form.setFieldValue('period', value)}
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
                units="weeks"
                value={form.values.renewWindow}
                changed={changed.renewWindow}
                onChange={(value) => form.setFieldValue('renewWindow', value)}
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
                units="hosts"
                changed={changed.amount}
                value={form.values.amount}
                onChange={(value) => form.setFieldValue('amount', value)}
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
                changed={changed.set}
                value={form.values.set}
                onChange={(value) => form.setFieldValue('set', value)}
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
      </div>
    </RenterdAuthedLayout>
  )
}
