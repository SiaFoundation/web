import {
  Text,
  ConfigurationPanel,
  PanelMenuSection,
  PanelMenuSetting,
  FieldSwitch,
  ConfigurationPanelSetting,
  shouldShowField,
  Tooltip,
  ConfigurationSiacoin,
  ConfigurationFiat,
} from '@siafoundation/design-system'
import { useConfig } from '../../contexts/config'
import { StateConnError } from './StateConnError'

export function Config() {
  const { fields, form, remoteError, configRef } = useConfig()
  const shouldPinStoragePrice = form.watch('shouldPinStoragePrice')
  const shouldPinEgressPrice = form.watch('shouldPinEgressPrice')
  const shouldPinIngressPrice = form.watch('shouldPinIngressPrice')
  const shouldPinMaxCollateral = form.watch('shouldPinMaxCollateral')
  const pinnedCurrency = form.watch('pinnedCurrency')
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
        <PanelMenuSetting
          id="storagePriceGroup"
          title="Storage price"
          description={fields.storagePrice.description}
          control={
            <div className="flex flex-col gap-1 w-[250px]">
              {shouldShowField({
                form,
                fields,
                name: 'shouldPinStoragePrice',
              }) && (
                <Tooltip
                  align="end"
                  content="Pin the value to a fixed fiat amount. The daemon will automatically keep the value in sync."
                >
                  <div className="flex w-full justify-between">
                    <Text weight="medium" color="verySubtle" size="14">
                      Pin
                    </Text>
                    <FieldSwitch
                      name="shouldPinStoragePrice"
                      form={form}
                      fields={fields}
                      size="small"
                      group={false}
                    />
                  </div>
                </Tooltip>
              )}
              {shouldShowField({
                form,
                fields,
                name: 'shouldPinStoragePrice',
              }) && shouldPinStoragePrice ? (
                <ConfigurationFiat
                  name="storagePricePinned"
                  form={form}
                  fields={fields}
                  currency={pinnedCurrency || undefined}
                />
              ) : (
                <ConfigurationSiacoin
                  name="storagePrice"
                  form={form}
                  fields={fields}
                />
              )}
            </div>
          }
        />
        <PanelMenuSetting
          id="egressPriceGroup"
          title="Egress price"
          description={fields.egressPrice.description}
          control={
            <div className="flex flex-col gap-1 w-[250px]">
              {shouldShowField({
                form,
                fields,
                name: 'shouldPinEgressPrice',
              }) && (
                <Tooltip
                  align="end"
                  content="Pin the value to a fixed fiat amount. The daemon will automatically keep the value in sync."
                >
                  <div className="flex w-full justify-between">
                    <Text weight="medium" color="verySubtle" size="14">
                      Pin
                    </Text>
                    <FieldSwitch
                      name="shouldPinEgressPrice"
                      form={form}
                      fields={fields}
                      size="small"
                      group={false}
                    />
                  </div>
                </Tooltip>
              )}
              {shouldShowField({
                form,
                fields,
                name: 'shouldPinEgressPrice',
              }) && shouldPinEgressPrice ? (
                <ConfigurationFiat
                  name="egressPricePinned"
                  form={form}
                  fields={fields}
                  currency={pinnedCurrency}
                />
              ) : (
                <ConfigurationSiacoin
                  name="egressPrice"
                  form={form}
                  fields={fields}
                />
              )}
            </div>
          }
        />
        <PanelMenuSetting
          id="ingressPriceGroup"
          title="Ingress price"
          description={fields.ingressPrice.description}
          control={
            <div className="flex flex-col gap-1 w-[250px]">
              {shouldShowField({
                form,
                fields,
                name: 'shouldPinIngressPrice',
              }) && (
                <Tooltip
                  align="end"
                  content="Pin the value to a fixed fiat amount. The daemon will automatically keep the value in sync."
                >
                  <div className="flex w-full justify-between">
                    <Text weight="medium" color="verySubtle" size="14">
                      Pin
                    </Text>
                    <FieldSwitch
                      name="shouldPinIngressPrice"
                      form={form}
                      fields={fields}
                      size="small"
                      group={false}
                    />
                  </div>
                </Tooltip>
              )}
              {shouldShowField({
                form,
                fields,
                name: 'shouldPinIngressPrice',
              }) && shouldPinIngressPrice ? (
                <ConfigurationFiat
                  name="ingressPricePinned"
                  form={form}
                  fields={fields}
                  currency={pinnedCurrency}
                />
              ) : (
                <ConfigurationSiacoin
                  name="ingressPrice"
                  form={form}
                  fields={fields}
                />
              )}
            </div>
          }
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
          <PanelMenuSetting
            id="maxCollateralGroup"
            title="Max collateral"
            description={fields.maxCollateral.description}
            control={
              <div className="flex flex-col gap-1 w-[250px]">
                {shouldShowField({
                  form,
                  fields,
                  name: 'shouldPinMaxCollateral',
                }) && (
                  <Tooltip
                    align="end"
                    content="Pin the value to a fixed fiat amount. The daemon will automatically keep the value in sync."
                  >
                    <div className="flex w-full justify-between">
                      <Text weight="medium" color="verySubtle" size="14">
                        Pin
                      </Text>
                      <FieldSwitch
                        name="shouldPinMaxCollateral"
                        form={form}
                        fields={fields}
                        size="small"
                        group={false}
                      />
                    </div>
                  </Tooltip>
                )}
                {shouldShowField({
                  form,
                  fields,
                  name: 'shouldPinMaxCollateral',
                }) && shouldPinMaxCollateral ? (
                  <ConfigurationFiat
                    name="maxCollateralPinned"
                    form={form}
                    fields={fields}
                    currency={pinnedCurrency}
                  />
                ) : (
                  <ConfigurationSiacoin
                    name="maxCollateral"
                    form={form}
                    fields={fields}
                  />
                )}
              </div>
            }
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
