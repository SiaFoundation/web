import {
  Text,
  ConfigurationPanel,
  PanelMenuSection,
  PanelMenuSetting,
  Separator,
  FieldSwitch,
  ConfigurationPanelSetting,
  shouldShowField,
  Tooltip,
  ConfigurationSiacoin,
  ConfigurationFiat,
} from '@siafoundation/design-system'
import { Warning16, CheckmarkFilled16 } from '@siafoundation/react-icons'
import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { HostdAuthedLayout } from '../../components/HostdAuthedLayout'
import { useConfig } from '../../contexts/config'
import { ConfigNav } from './ConfigNav'
import { StateConnError } from './StateConnError'
import { ConfigActions } from './ConfigActions'

export function Config() {
  const { openDialog } = useDialog()
  const { fields, settings, dynDNSCheck, form, remoteError, configRef } =
    useConfig()
  const shouldPinStoragePrice = form.watch('shouldPinStoragePrice')
  const shouldPinEgressPrice = form.watch('shouldPinEgressPrice')
  const shouldPinIngressPrice = form.watch('shouldPinIngressPrice')
  const shouldPinMaxCollateral = form.watch('shouldPinMaxCollateral')
  const pinnedCurrency = form.watch('pinnedCurrency')
  return (
    <HostdAuthedLayout
      title="Configuration"
      routes={routes}
      nav={<ConfigNav />}
      sidenav={<HostdSidenav />}
      stats={
        settings.data?.ddns.provider && !dynDNSCheck.isValidating ? (
          dynDNSCheck.error ? (
            <>
              <Text color="amber">
                <Warning16 />
              </Text>
              <Text size="14">
                Error with dynamic DNS configuration:{' '}
                {dynDNSCheck.error.message}
              </Text>
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
      actions={<ConfigActions />}
      openSettings={() => openDialog('settings')}
      size="3"
    >
      {remoteError ? (
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
            {shouldShowField({ form, fields, name: 'pinnedCurrency' }) && (
              <>
                <ConfigurationPanelSetting
                  name="pinnedCurrency"
                  form={form}
                  fields={fields}
                />
                <Separator className="w-full my-3" />
              </>
            )}
            {shouldShowField({ form, fields, name: 'pinnedThreshold' }) && (
              <>
                <ConfigurationPanelSetting
                  form={form}
                  fields={fields}
                  name="pinnedThreshold"
                />
                <Separator className="w-full my-3" />
              </>
            )}
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
            <Separator className="w-full my-3" />
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
            <Separator className="w-full my-3" />
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
            <Separator className="w-full my-3" />
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
              <>
                <Separator className="w-full my-3" />
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
              </>
            )}
            {shouldShowField({
              form,
              fields,
              name: 'contractPrice',
            }) && (
              <>
                <Separator className="w-full my-3" />
                <ConfigurationPanelSetting
                  form={form}
                  fields={fields}
                  name="contractPrice"
                />
              </>
            )}
            {shouldShowField({
              form,
              fields,
              name: 'baseRPCPrice',
            }) && (
              <>
                <Separator className="w-full my-3" />
                <ConfigurationPanelSetting
                  form={form}
                  fields={fields}
                  name="baseRPCPrice"
                />
              </>
            )}
            {shouldShowField({
              form,
              fields,
              name: 'sectorAccessPrice',
            }) && (
              <>
                <Separator className="w-full my-3" />
                <ConfigurationPanelSetting
                  form={form}
                  fields={fields}
                  name="sectorAccessPrice"
                />
              </>
            )}
            {shouldShowField({
              form,
              fields,
              name: 'priceTableValidity',
            }) && (
              <>
                <Separator className="w-full my-3" />
                <ConfigurationPanelSetting
                  form={form}
                  fields={fields}
                  name="priceTableValidity"
                />
              </>
            )}
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
      )}
    </HostdAuthedLayout>
  )
}
