import {
  ConfigurationFiat,
  ConfigurationPanel,
  ConfigurationPanelSetting,
  ConfigurationSiacoin,
  PanelMenuSection,
  PanelMenuSetting,
} from '@siafoundation/design-system'
import { useConfig } from '../../contexts/config'
import { StateConnError } from './StateConnError'
import { ShouldPinSwitch } from './ShouldPinSwitch'
import { PinnedCurrencyWarning } from './PinnedCurrencyWarning'
import { useExchangeRate } from '@siafoundation/react-core'

export function Config() {
  const { form, fields, remoteError, configRef } = useConfig()

  const pinnedCurrency = form.watch('pinnedCurrency')
  const shouldPinMaxStoragePrice = form.watch('shouldPinMaxStoragePrice')
  const shouldPinMaxUploadPrice = form.watch('shouldPinMaxUploadPrice')
  const shouldPinMaxDownloadPrice = form.watch('shouldPinMaxDownloadPrice')

  const { rate } = useExchangeRate({
    currency: pinnedCurrency || undefined,
  })
  const canUseExchangeRates = !!rate

  return remoteError ? (
    <StateConnError />
  ) : (
    <div ref={configRef} className="px-5 pt-10 pb-6 flex flex-col gap-16">
      <PanelMenuSection title="Storage">
        <ConfigurationPanelSetting
          autoVisibility
          name="storageTB"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          autoVisibility
          name="uploadTBMonth"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          autoVisibility
          name="downloadTBMonth"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          autoVisibility
          name="periodWeeks"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          autoVisibility
          name="renewWindowWeeks"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          autoVisibility
          name="amountHosts"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          autoVisibility
          form={form}
          fields={fields}
          name="prune"
        />
      </PanelMenuSection>
      <PanelMenuSection title="Pricing">
        <PanelMenuSetting
          id="maxStoragePriceTBMonthGroup"
          title="Max storage price"
          description={fields.maxStoragePriceTBMonth.description}
          control={
            <div className="flex flex-col gap-1 w-[260px]">
              <ShouldPinSwitch
                name="shouldPinMaxStoragePrice"
                form={form}
                fields={fields}
              />
              {shouldPinMaxStoragePrice ? (
                canUseExchangeRates ? (
                  <ConfigurationFiat
                    name="maxStoragePriceTBMonthPinned"
                    form={form}
                    fields={fields}
                    currency={pinnedCurrency || ''}
                  />
                ) : (
                  <PinnedCurrencyWarning
                    canUseExchangeRates={canUseExchangeRates}
                    pinnedCurrency={pinnedCurrency}
                  />
                )
              ) : (
                <ConfigurationSiacoin
                  name="maxStoragePriceTBMonth"
                  form={form}
                  fields={fields}
                />
              )}
            </div>
          }
        />
        <PanelMenuSetting
          id="maxUploadPriceTBGroup"
          title="Max upload price"
          description={fields.maxUploadPriceTB.description}
          control={
            <div className="flex flex-col gap-1 w-[260px]">
              <ShouldPinSwitch
                name="shouldPinMaxUploadPrice"
                form={form}
                fields={fields}
              />
              {shouldPinMaxUploadPrice ? (
                canUseExchangeRates ? (
                  <ConfigurationFiat
                    name="maxUploadPriceTBPinned"
                    form={form}
                    fields={fields}
                    currency={pinnedCurrency || ''}
                  />
                ) : (
                  <PinnedCurrencyWarning
                    canUseExchangeRates={canUseExchangeRates}
                    pinnedCurrency={pinnedCurrency}
                  />
                )
              ) : (
                <ConfigurationSiacoin
                  name="maxUploadPriceTB"
                  form={form}
                  fields={fields}
                />
              )}
            </div>
          }
        />
        <PanelMenuSetting
          id="maxDownloadPriceTBGroup"
          title="Max download price"
          description={fields.maxDownloadPriceTB.description}
          control={
            <div className="flex flex-col gap-1 w-[260px]">
              <ShouldPinSwitch
                name="shouldPinMaxDownloadPrice"
                form={form}
                fields={fields}
              />
              {shouldPinMaxDownloadPrice ? (
                canUseExchangeRates ? (
                  <ConfigurationFiat
                    name="maxDownloadPriceTBPinned"
                    form={form}
                    fields={fields}
                    currency={pinnedCurrency || ''}
                  />
                ) : (
                  <PinnedCurrencyWarning
                    canUseExchangeRates={canUseExchangeRates}
                    pinnedCurrency={pinnedCurrency}
                  />
                )
              ) : (
                <ConfigurationSiacoin
                  name="maxDownloadPriceTB"
                  form={form}
                  fields={fields}
                />
              )}
            </div>
          }
        />
        <ConfigurationPanelSetting
          autoVisibility
          name="maxContractPrice"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          autoVisibility
          name="maxRPCPriceMillion"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          autoVisibility
          name="hostBlockHeightLeeway"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          autoVisibility
          name="minPriceTableValidityMinutes"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          autoVisibility
          name="minAccountExpiryDays"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          autoVisibility
          name="minMaxEphemeralAccountBalance"
          form={form}
          fields={fields}
        />
      </PanelMenuSection>
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
      <ConfigurationPanel
        title="Uploads"
        category="uploadpacking"
        fields={fields}
        form={form}
      />
      <ConfigurationPanel
        title="Redundancy"
        category="redundancy"
        fields={fields}
        form={form}
      />
      <ConfigurationPanel
        title="Pinning"
        category="pinning"
        fields={fields}
        form={form}
      />
    </div>
  )
}
