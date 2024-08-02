import {
  ConfigurationFiat,
  ConfigurationPanel,
  ConfigurationPanelSetting,
  ConfigurationSiacoin,
  PanelMenuSection,
  PanelMenuSetting,
} from '@siafoundation/design-system'
import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { useConfig } from '../../contexts/config'
import { ConfigStats } from './ConfigStats'
import { ConfigActions } from './ConfigActions'
import { ConfigNav } from './ConfigNav'
import { StateConnError } from './StateConnError'
import { Recommendations } from './Recommendations'
import { ShouldPinSwitch } from './ShouldPinSwitch'
import { PinnedCurrencyWarning } from './PinnedCurrencyWarning'

export function Config() {
  const { openDialog } = useDialog()
  const { form, fields, remoteError, configRef } = useConfig()

  const pinningEnabled = form.watch('pinningEnabled')
  const pinnedCurrency = form.watch('pinnedCurrency')
  const forexEndpointURL = form.watch('forexEndpointURL')
  const shouldPinAllowance = form.watch('shouldPinAllowance')
  const shouldPinMaxStoragePrice = form.watch('shouldPinMaxStoragePrice')
  const shouldPinMaxUploadPrice = form.watch('shouldPinMaxUploadPrice')
  const shouldPinMaxDownloadPrice = form.watch('shouldPinMaxDownloadPrice')
  const shouldPinMaxRpcPrice = form.watch('shouldPinMaxRPCPrice')

  const canShowPinned = pinningEnabled && pinnedCurrency && forexEndpointURL

  return (
    <RenterdAuthedLayout
      title="Configuration"
      routes={routes}
      nav={<ConfigNav />}
      sidenav={<RenterdSidenav />}
      stats={<ConfigStats />}
      actions={<ConfigActions />}
      after={<Recommendations />}
      openSettings={() => openDialog('settings')}
      size="3"
    >
      {remoteError ? (
        <StateConnError />
      ) : (
        <div ref={configRef} className="px-5 py-6 flex flex-col gap-16">
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
            <PanelMenuSetting
              id="allowanceMonthGroup"
              title="Allowance"
              description={fields.allowanceMonth.description}
              control={
                <div className="flex flex-col gap-1 w-[260px]">
                  <ShouldPinSwitch
                    name="shouldPinAllowance"
                    form={form}
                    fields={fields}
                  />
                  {shouldPinAllowance ? (
                    canShowPinned ? (
                      <ConfigurationFiat
                        name="allowanceMonthPinned"
                        form={form}
                        fields={fields}
                        currency={pinnedCurrency || undefined}
                      />
                    ) : (
                      <PinnedCurrencyWarning
                        pinningEnabled={pinningEnabled}
                        pinnedCurrency={pinnedCurrency}
                        forexEndpointURL={forexEndpointURL}
                      />
                    )
                  ) : (
                    <ConfigurationSiacoin
                      name="allowanceMonth"
                      form={form}
                      fields={fields}
                    />
                  )}
                </div>
              }
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
              name="autopilotContractSet"
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
                    canShowPinned ? (
                      <ConfigurationFiat
                        name="maxStoragePriceTBMonthPinned"
                        form={form}
                        fields={fields}
                        currency={pinnedCurrency || undefined}
                      />
                    ) : (
                      <PinnedCurrencyWarning
                        pinningEnabled={pinningEnabled}
                        pinnedCurrency={pinnedCurrency}
                        forexEndpointURL={forexEndpointURL}
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
                    canShowPinned ? (
                      <ConfigurationFiat
                        name="maxUploadPriceTBPinned"
                        form={form}
                        fields={fields}
                        currency={pinnedCurrency || undefined}
                      />
                    ) : (
                      <PinnedCurrencyWarning
                        pinningEnabled={pinningEnabled}
                        pinnedCurrency={pinnedCurrency}
                        forexEndpointURL={forexEndpointURL}
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
                    canShowPinned ? (
                      <ConfigurationFiat
                        name="maxDownloadPriceTBPinned"
                        form={form}
                        fields={fields}
                        currency={pinnedCurrency || undefined}
                      />
                    ) : (
                      <PinnedCurrencyWarning
                        pinningEnabled={pinningEnabled}
                        pinnedCurrency={pinnedCurrency}
                        forexEndpointURL={forexEndpointURL}
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
            <PanelMenuSetting
              id="maxRPCPriceMillionGroup"
              title="Max RPC price"
              description={fields.maxRPCPriceMillion.description}
              control={
                <div className="flex flex-col gap-1 w-[260px]">
                  <ShouldPinSwitch
                    name="shouldPinMaxRPCPrice"
                    form={form}
                    fields={fields}
                  />
                  {shouldPinMaxRpcPrice ? (
                    canShowPinned ? (
                      <ConfigurationFiat
                        name="maxRPCPriceMillionPinned"
                        form={form}
                        fields={fields}
                        currency={pinnedCurrency || undefined}
                      />
                    ) : (
                      <PinnedCurrencyWarning
                        pinningEnabled={pinningEnabled}
                        pinnedCurrency={pinnedCurrency}
                        forexEndpointURL={forexEndpointURL}
                      />
                    )
                  ) : (
                    <ConfigurationSiacoin
                      name="maxRPCPriceMillion"
                      form={form}
                      fields={fields}
                    />
                  )}
                </div>
              }
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
            <ConfigurationPanelSetting
              autoVisibility
              name="migrationSurchargeMultiplier"
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
      )}
    </RenterdAuthedLayout>
  )
}
