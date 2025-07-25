import {
  ConfigurationFiat,
  ConfigurationPanel,
  ConfigurationPanelSetting,
  ConfigurationSiacoin,
  PanelMenuSection,
  PanelMenuSetting,
  useDaemonExplorerExchangeRate,
} from '@siafoundation/design-system'
import { useConfig } from '../../contexts/config'
import { StateConnError } from './StateConnError'
import { ShouldPinSwitch } from './ShouldPinSwitch'
import { PinnedCurrencyWarning } from './PinnedCurrencyWarning'

export function Config() {
  const { form, fields, remoteError, configRef } = useConfig()

  const pinnedCurrency = form.watch('pinnedCurrency')
  const shouldPinMaxStoragePrice = form.watch('shouldPinMaxStoragePrice')
  const shouldPinMaxIngressPrice = form.watch('shouldPinMaxIngressPrice')
  const shouldPinMaxEgressPrice = form.watch('shouldPinMaxEgressPrice')
  const shouldPinMinCollateral = form.watch('shouldPinMinCollateral')

  const { rate } = useDaemonExplorerExchangeRate({
    currency: pinnedCurrency || undefined,
  })
  const canUseExchangeRates = !!rate

  return remoteError ? (
    <StateConnError />
  ) : (
    <div ref={configRef} className="px-5 pt-10 pb-6 flex flex-col gap-16">
      <PanelMenuSection title="Contracts">
        <ConfigurationPanelSetting
          name="wantedContracts"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          name="periodWeeks"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          name="renewWindowWeeks"
          form={form}
          fields={fields}
        />
      </PanelMenuSection>
      <PanelMenuSection title="Pricing">
        <ConfigurationPanelSetting
          name="pinnedCurrency"
          form={form}
          fields={fields}
        />
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
          id="maxIngressPriceTBGroup"
          title="Max ingress price"
          description={fields.maxIngressPriceTB.description}
          control={
            <div className="flex flex-col gap-1 w-[260px]">
              <ShouldPinSwitch
                name="shouldPinMaxIngressPrice"
                form={form}
                fields={fields}
              />
              {shouldPinMaxIngressPrice ? (
                canUseExchangeRates ? (
                  <ConfigurationFiat
                    name="maxIngressPriceTBPinned"
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
                  name="maxIngressPriceTB"
                  form={form}
                  fields={fields}
                />
              )}
            </div>
          }
        />
        <PanelMenuSetting
          id="maxEgressPriceTBGroup"
          title="Max egress price"
          description={fields.maxEgressPriceTB.description}
          control={
            <div className="flex flex-col gap-1 w-[260px]">
              <ShouldPinSwitch
                name="shouldPinMaxEgressPrice"
                form={form}
                fields={fields}
              />
              {shouldPinMaxEgressPrice ? (
                canUseExchangeRates ? (
                  <ConfigurationFiat
                    name="maxEgressPriceTBPinned"
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
                  name="maxEgressPriceTB"
                  form={form}
                  fields={fields}
                />
              )}
            </div>
          }
        />
        <PanelMenuSetting
          id="minCollateralGroup"
          title="Min collateral"
          description={fields.minCollateral.description}
          control={
            <div className="flex flex-col gap-1 w-[260px]">
              <ShouldPinSwitch
                name="shouldPinMinCollateral"
                form={form}
                fields={fields}
              />
              {shouldPinMinCollateral ? (
                canUseExchangeRates ? (
                  <ConfigurationFiat
                    name="minCollateralPinned"
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
                  name="minCollateral"
                  form={form}
                  fields={fields}
                />
              )}
            </div>
          }
        />
      </PanelMenuSection>
      <ConfigurationPanel
        title="Pinning"
        category="pinning"
        fields={fields}
        form={form}
      />
      <ConfigurationPanel
        title="Other"
        category="other"
        fields={fields}
        form={form}
      />
    </div>
  )
}
