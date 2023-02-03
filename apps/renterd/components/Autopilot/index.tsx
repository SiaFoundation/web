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
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { RenterSidenav } from '../RenterSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import {
  useAutopilotConfig,
  useAutopilotConfigUpdate,
} from '@siafoundation/react-core'
import { useFormik } from 'formik'
import { useFormChanged } from '../../hooks/useFormChanged'
import { Setting } from '../Setting'
import { MenuSection } from '../MenuSection'

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

  const autopilotForm = useFormik({
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
              allowance: values.allowance.toString(),
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
        config.mutate()
      } catch (e) {
        autopilotForm.setErrors(e)
      }
    },
  })

  const [targetPrice, setTargetPrice] = useState<BigNumber | undefined>(
    new BigNumber(0)
  )

  const [allowanceSuggestion, setAllowanceSuggestion] = useState<BigNumber>(
    new BigNumber(0)
  )

  useEffect(() => {
    const func = async () => {
      if (!config.data) {
        return
      }
      const set = config.data?.contracts.set
      const allowance = new BigNumber(config.data?.contracts.allowance)
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
        await autopilotForm.resetForm({
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
      autopilotForm.values.storage
        .times(targetPrice)
        .times(autopilotForm.values.period)
        .integerValue()
    )
  }, [autopilotForm.values.storage, autopilotForm.values.period, targetPrice])

  const { changed, changeCount } = useFormChanged(autopilotForm)

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
            variant="accent"
            disabled={!changeCount}
            onClick={() => autopilotForm.submitForm()}
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
                TB of data. This price and your expected utilization values are
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
              <>The amount of storage you would like to rent in TB.</>
            }
            control={
              <ConfigurationNumber
                units="TB"
                value={autopilotForm.values.storage}
                changed={changed.storage}
                onChange={(value) =>
                  autopilotForm.setFieldValue('storage', value)
                }
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Expected upload"
            description={
              <>
                The amount of upload bandwidth you plan to use each month in TB.
              </>
            }
            control={
              <ConfigurationNumber
                units="TB"
                value={autopilotForm.values.upload}
                changed={changed.upload}
                onChange={(value) =>
                  autopilotForm.setFieldValue('upload', value)
                }
              />
            }
          />
          <Separator className="w-full my-3" />
          <Setting
            title="Expected download"
            description={
              <>
                The amount of download bandwidth you plan to use each month in
                TB.
              </>
            }
            control={
              <ConfigurationNumber
                units="TB"
                changed={changed.download}
                value={autopilotForm.values.download}
                onChange={(value) =>
                  autopilotForm.setFieldValue('download', value)
                }
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
                value={autopilotForm.values.allowance}
                changed={changed.allowance}
                onChange={(value) =>
                  autopilotForm.setFieldValue('allowance', value)
                }
                suggestion={allowanceSuggestion}
                decimalsLimitSc={0}
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
                value={autopilotForm.values.period}
                changed={changed.period}
                onChange={(value) =>
                  autopilotForm.setFieldValue('period', value)
                }
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
                value={autopilotForm.values.renewWindow}
                changed={changed.renewWindow}
                onChange={(value) =>
                  autopilotForm.setFieldValue('renewWindow', value)
                }
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
                value={autopilotForm.values.amount}
                onChange={(value) =>
                  autopilotForm.setFieldValue('amount', value)
                }
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
                value={autopilotForm.values.set}
                onChange={(value) => autopilotForm.setFieldValue('set', value)}
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

// function converts bytes to TiB
function bytesToTiB(bytes: BigNumber): BigNumber {
  return bytes.div(1024).div(1024).div(1024).div(1024)
}

// function converts TiB to bytes
function TiBToBytes(TiB: BigNumber): BigNumber {
  return TiB.times(1024).times(1024).times(1024).times(1024)
}
