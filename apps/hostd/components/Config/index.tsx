import {
  Text,
  ConfigurationSiacoin,
  Button,
  triggerSuccessToast,
  Separator,
  ConfigurationNumber,
  triggerErrorToast,
  useFormChanged,
  Reset16,
  ConfigurationSwitch,
  ConfigurationText,
  ConfigurationSelect,
  Bullhorn16,
  Save16,
  Warning16,
  CheckmarkFilled16,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect } from 'react'
import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { HostdAuthedLayout } from '../../components/HostdAuthedLayout'
import { useFormik } from 'formik'
import {
  PanelMenuSection,
  PanelMenuSetting,
} from '@siafoundation/design-system'
import {
  useSettings,
  useSettingsAnnounce,
  useSettingsDynDNS,
  useSettingsUpdate,
} from '@siafoundation/react-hostd'
import {
  descriptions,
  dnsProviderOptions,
  initialValues,
  scDecimalPlaces,
  validationSchema,
} from './meta'
import { transformDown, transformUp } from './transform'

export function Config() {
  const { openDialog } = useDialog()
  const settings = useSettings({
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
      },
    },
  })
  const settingsUpdate = useSettingsUpdate()
  const settingsAnnounce = useSettingsAnnounce()
  const dynDNSCheck = useSettingsDynDNS({
    disabled: !settings.data || !settings.data.dynDNS.provider,
    config: {
      swr: {
        revalidateOnFocus: false,
        errorRetryCount: 0,
      },
    },
  })

  const form = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      if (!settings.data) {
        return
      }
      try {
        const response = await settingsUpdate.post({
          payload: transformUp(values),
        })
        if (response.error) {
          throw Error(response.error)
        }
        if (changed['netAddress']) {
          triggerSuccessToast(
            'Settings have been saved. Address has changed, make sure to re-announce the host.',
            {
              duration: 20_000,
            }
          )
        } else {
          triggerSuccessToast('Settings have been saved.')
        }
        dynDNSCheck.mutate()
      } catch (e) {
        triggerErrorToast((e as Error).message)
      }
    },
  })

  const resetFormAndData = useCallback(() => {
    const func = async () => {
      form.resetForm()
      await settings.mutate()
      dynDNSCheck.mutate()
    }
    func()
  }, [form, settings, dynDNSCheck])

  useEffect(() => {
    const func = async () => {
      if (!settings.data) {
        return
      }
      try {
        const s = settings.data
        // When new config is fetched, reset the form with the initial values
        await form.resetForm({
          values: transformDown(s),
        })
      } catch (e) {
        console.log(e)
      }
    }
    func()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.data])

  const { changed, changeCount } = useFormChanged(form)

  return (
    <HostdAuthedLayout
      title="Configuration"
      routes={routes}
      sidenav={<HostdSidenav />}
      stats={
        settings.data?.dynDNS.provider && !dynDNSCheck.isValidating ? (
          dynDNSCheck.error ? (
            <>
              <Text color="amber">
                <Warning16 />
              </Text>
              <Text>Error with dynamic DNS configuration</Text>
            </>
          ) : (
            <>
              <Text color="green">
                <CheckmarkFilled16 />
              </Text>
              <Text>Dynamic DNS enabled</Text>
            </>
          )
        ) : null
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
            <Save16 />
            Save changes
          </Button>
          <Button
            variant="accent"
            tip="Announce host address"
            onClick={() => settingsAnnounce.post({})}
          >
            <Bullhorn16 />
            Announce
          </Button>
        </div>
      }
      openSettings={() => openDialog('settings')}
    >
      <div className="p-6 flex flex-col gap-16 max-w-screen-xl">
        <PanelMenuSection title="Host">
          <PanelMenuSetting
            title="Accepting contracts"
            description={descriptions.acceptingContracts}
            control={
              <ConfigurationSwitch
                formik={form}
                changed={changed}
                name="acceptingContracts"
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="Address"
            description={descriptions.netAddress}
            control={
              <ConfigurationText
                formik={form}
                changed={changed}
                placeholder="my.host.com:9882"
                name="netAddress"
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="Maximum contract duration"
            description={descriptions.maxContractDuration}
            control={
              <ConfigurationNumber
                formik={form}
                changed={changed}
                units="months"
                decimalsLimit={2}
                name="maxContractDuration"
                suggestion={new BigNumber(6)}
                suggestionTip="The default maximum duration is 6 months."
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="Window size"
            description={descriptions.windowSize}
            control={
              <ConfigurationNumber
                formik={form}
                changed={changed}
                units="days"
                name="windowSize"
                suggestion={new BigNumber(1)}
                suggestionTip="The default window size is 1 day."
              />
            }
          />
        </PanelMenuSection>
        <PanelMenuSection title="Pricing">
          <PanelMenuSetting
            title="Contract price"
            description={descriptions.contractPrice}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                name="contractPrice"
                decimalsLimitSc={scDecimalPlaces}
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="Base RPC price"
            description={descriptions.baseRPCPrice}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                units="SC/million"
                name="baseRPCPrice"
                decimalsLimitSc={scDecimalPlaces}
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="Sector access price"
            description={descriptions.sectorAccessPrice}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                units="SC/million"
                name="sectorAccessPrice"
                decimalsLimitSc={scDecimalPlaces}
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="Collateral"
            description={descriptions.collateral}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                name="collateral"
                units="SC/month"
                decimalsLimitSc={scDecimalPlaces}
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="Maximum collateral"
            description={descriptions.maxCollateral}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                name="maxCollateral"
                decimalsLimitSc={scDecimalPlaces}
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="Minimum storage price"
            description={descriptions.minStoragePrice}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                units="SC/TB/month"
                name="minStoragePrice"
                decimalsLimitSc={scDecimalPlaces}
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="Minimum egress price"
            description={descriptions.minEgressPrice}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                units="SC/TB"
                name="minEgressPrice"
                decimalsLimitSc={scDecimalPlaces}
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="Minimum ingress price"
            description={descriptions.minIngressPrice}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                units="SC/TB"
                name="minIngressPrice"
                decimalsLimitSc={scDecimalPlaces}
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="Price table validity"
            description={descriptions.priceTableValidity}
            control={
              <ConfigurationNumber
                formik={form}
                units="minutes"
                changed={changed}
                name="priceTableValidity"
              />
            }
          />
        </PanelMenuSection>
        <PanelMenuSection title="DNS">
          <PanelMenuSetting
            title="Dynamic DNS Provider"
            description={descriptions.dnsProvider}
            control={
              <ConfigurationSelect
                options={dnsProviderOptions}
                formik={form}
                changed={changed}
                name="dnsProvider"
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="IPv4"
            description={descriptions.dnsIpv4}
            control={
              <ConfigurationSwitch
                formik={form}
                changed={changed}
                name="dnsIpv4"
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="IPv6"
            description={descriptions.dnsIpv6}
            control={
              <ConfigurationSwitch
                formik={form}
                changed={changed}
                name="dnsIpv6"
              />
            }
          />
        </PanelMenuSection>
        <PanelMenuSection title="Bandwidth">
          <PanelMenuSetting
            title="Ingress limit"
            description={descriptions.ingressLimit}
            control={
              <ConfigurationNumber
                formik={form}
                changed={changed}
                units="TB"
                name="ingressLimit"
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="Egress limit"
            description={descriptions.egressLimit}
            control={
              <ConfigurationNumber
                formik={form}
                changed={changed}
                units="TB"
                name="egressLimit"
              />
            }
          />
        </PanelMenuSection>
        <PanelMenuSection title="Registry">
          <PanelMenuSetting
            title="Maximum registry size"
            description={descriptions.maxRegistryEntries}
            control={
              <ConfigurationNumber
                formik={form}
                units="entries"
                decimalsLimit={0}
                changed={changed}
                name="maxRegistryEntries"
              />
            }
          />
        </PanelMenuSection>
        <PanelMenuSection title="RHP3">
          <PanelMenuSetting
            title="Account expiry"
            description={descriptions.accountExpiry}
            control={
              <ConfigurationNumber
                formik={form}
                units="days"
                changed={changed}
                name="accountExpiry"
              />
            }
          />
          <Separator className="w-full my-3" />
          <PanelMenuSetting
            title="Maximum account balance"
            description={descriptions.maxAccountBalance}
            control={
              <ConfigurationSiacoin
                formik={form}
                changed={changed}
                name="maxAccountBalance"
              />
            }
          />
        </PanelMenuSection>
      </div>
    </HostdAuthedLayout>
  )
}
