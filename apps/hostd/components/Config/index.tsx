import {
  ConfigurationPanel,
  PanelMenuSection,
  ConfigurationPanelSetting,
  shouldShowField,
  Alert,
} from '@siafoundation/design-system'
import { useWatch } from 'react-hook-form'
import { useConfig } from '../../contexts/config'
import { PinnablePrice } from '../../contexts/config/types'
import { StateConnError } from './StateConnError'
import { MixedPinningNotice, PricingSetting } from './PricingSetting'

export function Config() {
  const {
    fields,
    form,
    remoteError,
    configRef,
    pinningEnabled,
    settingsPinned,
  } = useConfig()
  const shouldPinPrices = useWatch({
    control: form.control,
    name: 'shouldPinPrices',
  })
  const pinnedCurrency = useWatch({
    control: form.control,
    name: 'pinnedCurrency',
  })
  // Until the host resolves a mixed configuration `shouldPinPrices` is null,
  // and each price keeps the pinned state the daemon reports for it so the
  // host can see what is pinned. Without the explorer there is no exchange
  // rate and pinned settings are never saved, so every price is in siacoin.
  const isPinned = (price: PinnablePrice) =>
    !!pinningEnabled &&
    (shouldPinPrices ?? !!settingsPinned.data?.[price].pinned)
  const showMixedPinningNotice = !!pinningEnabled && shouldPinPrices === null
  return remoteError ? (
    <StateConnError />
  ) : (
    <div ref={configRef} className="px-5 py-6 flex flex-col gap-16">
      <ConfigurationPanel
        title="Host"
        category="host"
        fields={fields}
        form={form}
      />
      <PanelMenuSection title="Pricing">
        <ConfigurationPanelSetting
          autoVisibility
          name="shouldPinPrices"
          form={form}
          fields={fields}
        />
        {showMixedPinningNotice && (
          <Alert>
            <MixedPinningNotice form={form} />
          </Alert>
        )}
        <ConfigurationPanelSetting
          autoVisibility
          name="pinnedCurrency"
          form={form}
          fields={fields}
        />
        <ConfigurationPanelSetting
          autoVisibility
          form={form}
          fields={fields}
          name="pinnedThreshold"
        />
        <PricingSetting
          id="storagePriceGroup"
          title="Storage price"
          form={form}
          fields={fields}
          name="storagePrice"
          pinnedName="storagePricePinned"
          pinned={isPinned('storage')}
          showLegacyPinnedBadge={
            showMixedPinningNotice && !!settingsPinned.data?.storage.pinned
          }
          pinnedCurrency={pinnedCurrency}
        />
        <PricingSetting
          id="egressPriceGroup"
          title="Egress price"
          form={form}
          fields={fields}
          name="egressPrice"
          pinnedName="egressPricePinned"
          pinned={isPinned('egress')}
          showLegacyPinnedBadge={
            showMixedPinningNotice && !!settingsPinned.data?.egress.pinned
          }
          pinnedCurrency={pinnedCurrency}
        />
        <PricingSetting
          id="ingressPriceGroup"
          title="Ingress price"
          form={form}
          fields={fields}
          name="ingressPrice"
          pinnedName="ingressPricePinned"
          pinned={isPinned('ingress')}
          showLegacyPinnedBadge={
            showMixedPinningNotice && !!settingsPinned.data?.ingress.pinned
          }
          pinnedCurrency={pinnedCurrency}
        />
        <ConfigurationPanelSetting
          name="collateralMultiplier"
          form={form}
          fields={fields}
        />
        {shouldShowField({
          form,
          fields,
          name: 'maxCollateral',
        }) && (
          <PricingSetting
            id="maxCollateralGroup"
            title="Max collateral"
            form={form}
            fields={fields}
            name="maxCollateral"
            pinnedName="maxCollateralPinned"
            pinned={isPinned('maxCollateral')}
            showLegacyPinnedBadge={
              showMixedPinningNotice &&
              !!settingsPinned.data?.maxCollateral.pinned
            }
            pinnedCurrency={pinnedCurrency}
          />
        )}
        <ConfigurationPanelSetting
          autoVisibility
          form={form}
          fields={fields}
          name="contractPrice"
        />
        <ConfigurationPanelSetting
          autoVisibility
          form={form}
          fields={fields}
          name="baseRPCPrice"
        />
        <ConfigurationPanelSetting
          autoVisibility
          form={form}
          fields={fields}
          name="sectorAccessPrice"
        />
        <ConfigurationPanelSetting
          autoVisibility
          form={form}
          fields={fields}
          name="priceTableValidity"
        />
      </PanelMenuSection>
      <ConfigurationPanel
        title="DNS"
        category="DNS"
        fields={fields}
        form={form}
      />
      <ConfigurationPanel
        title="Bandwidth"
        category="bandwidth"
        fields={fields}
        form={form}
      />
      <ConfigurationPanel
        title="Registry"
        category="registry"
        fields={fields}
        form={form}
      />
      <ConfigurationPanel
        title="Accounts"
        category="RHP3"
        fields={fields}
        form={form}
      />
    </div>
  )
}
