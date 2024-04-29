import {
  Text,
  ConfigurationPanel,
  PanelMenuSection,
  PanelMenuSetting,
  Separator,
  FieldSwitch,
  FieldSiacoin,
  FieldFiat,
  FieldError,
  ConfigurationPanelSetting,
  shouldShowField,
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
                    <div className="flex w-full justify-between">
                      <Text weight="medium" color="verySubtle" size="14">
                        Storage price
                      </Text>
                      <FieldSwitch
                        name="shouldPinStoragePrice"
                        form={form}
                        fields={fields}
                        size="small"
                        group={false}
                        before={
                          <Text
                            weight="medium"
                            color={
                              shouldPinStoragePrice ? 'contrast' : 'subtle'
                            }
                            size="14"
                          >
                            pinned
                          </Text>
                        }
                      />
                    </div>
                  )}
                  {shouldShowField({
                    form,
                    fields,
                    name: 'shouldPinStoragePrice',
                  }) && shouldPinStoragePrice ? (
                    <>
                      <FieldFiat
                        name="storagePricePinned"
                        form={form}
                        fields={fields}
                        currency={pinnedCurrency}
                        group={false}
                      />
                      <FieldError name="storagePricePinned" form={form} />
                    </>
                  ) : (
                    <>
                      <FieldSiacoin
                        name="storagePrice"
                        form={form}
                        fields={fields}
                        group={false}
                      />
                      <FieldError name="storagePrice" form={form} />
                    </>
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
                    <div className="flex w-full justify-between">
                      <Text weight="medium" color="verySubtle" size="14">
                        Egress price
                      </Text>
                      <FieldSwitch
                        name="shouldPinEgressPrice"
                        form={form}
                        fields={fields}
                        size="small"
                        group={false}
                        before={
                          <Text
                            weight="medium"
                            color={shouldPinEgressPrice ? 'contrast' : 'subtle'}
                            size="14"
                          >
                            pinned
                          </Text>
                        }
                      />
                    </div>
                  )}
                  {shouldShowField({
                    form,
                    fields,
                    name: 'shouldPinEgressPrice',
                  }) && shouldPinEgressPrice ? (
                    <>
                      <FieldFiat
                        name="egressPricePinned"
                        form={form}
                        fields={fields}
                        currency={pinnedCurrency}
                        group={false}
                      />
                      <FieldError name="egressPricePinned" form={form} />
                    </>
                  ) : (
                    <>
                      <FieldSiacoin
                        name="egressPrice"
                        form={form}
                        fields={fields}
                        group={false}
                      />
                      <FieldError name="egressPrice" form={form} />
                    </>
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
                    <div className="flex w-full justify-between">
                      <Text weight="medium" color="verySubtle" size="14">
                        Ingress price
                      </Text>
                      <FieldSwitch
                        name="shouldPinIngressPrice"
                        form={form}
                        fields={fields}
                        size="small"
                        group={false}
                        before={
                          <Text
                            weight="medium"
                            color={
                              shouldPinIngressPrice ? 'contrast' : 'subtle'
                            }
                            size="14"
                          >
                            pinned
                          </Text>
                        }
                      />
                    </div>
                  )}
                  {shouldShowField({
                    form,
                    fields,
                    name: 'shouldPinIngressPrice',
                  }) && shouldPinIngressPrice ? (
                    <>
                      <FieldFiat
                        name="ingressPricePinned"
                        form={form}
                        fields={fields}
                        currency={pinnedCurrency}
                        group={false}
                      />
                      <FieldError name="ingressPricePinned" form={form} />
                    </>
                  ) : (
                    <>
                      <FieldSiacoin
                        name="ingressPrice"
                        form={form}
                        fields={fields}
                        group={false}
                      />
                      <FieldError name="ingressPrice" form={form} />
                    </>
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
                        <div className="flex w-full justify-between">
                          <Text weight="medium" color="verySubtle" size="14">
                            Max collateral
                          </Text>
                          <FieldSwitch
                            name="shouldPinMaxCollateral"
                            form={form}
                            fields={fields}
                            size="small"
                            group={false}
                            before={
                              <Text
                                weight="medium"
                                color={
                                  shouldPinMaxCollateral ? 'contrast' : 'subtle'
                                }
                                size="14"
                              >
                                pinned
                              </Text>
                            }
                          />
                        </div>
                      )}
                      {shouldShowField({
                        form,
                        fields,
                        name: 'shouldPinMaxCollateral',
                      }) && shouldPinMaxCollateral ? (
                        <>
                          <FieldFiat
                            name="maxCollateralPinned"
                            form={form}
                            fields={fields}
                            currency={pinnedCurrency}
                            group={false}
                          />
                          <FieldError name="maxCollateralPinned" form={form} />
                        </>
                      ) : (
                        <>
                          <FieldSiacoin
                            name="maxCollateral"
                            form={form}
                            fields={fields}
                            group={false}
                          />
                          <FieldError name="maxCollateral" form={form} />
                        </>
                      )}
                    </div>
                  }
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
