import {
  Badge,
  Button,
  ConfigFields,
  ConfigurationFiat,
  ConfigurationSiacoin,
  PanelMenuSetting,
  Text,
} from '@siafoundation/design-system'
import { Warning16 } from '@siafoundation/react-icons'
import { UseFormReturn } from 'react-hook-form'
import { CurrencyId } from '@siafoundation/react-core'
import { SettingsData } from '../../contexts/config/types'

/**
 * A price that can be pinned to a fiat value. Shows the fiat input when the
 * price is pinned and the siacoin input otherwise. Prices are pinned all
 * together, except on hosts with a mixed configuration saved before that was
 * enforced, where an individually pinned price is called out with a badge.
 */
export function PricingSetting<Categories extends string>({
  id,
  title,
  form,
  fields,
  name,
  pinnedName,
  pinned,
  showLegacyPinnedBadge,
  pinnedCurrency,
}: {
  id: string
  title: string
  form: UseFormReturn<SettingsData>
  fields: ConfigFields<SettingsData, Categories>
  name: keyof SettingsData
  pinnedName: keyof SettingsData
  pinned: boolean
  showLegacyPinnedBadge: boolean
  pinnedCurrency?: CurrencyId | ''
}) {
  return (
    <PanelMenuSetting
      id={id}
      title={title}
      description={fields[name].description}
      control={
        <div className="flex flex-col gap-1 w-[250px]">
          {showLegacyPinnedBadge && (
            <div className="flex justify-end">
              <Badge variant="amber" size="small">
                Pinned
              </Badge>
            </div>
          )}
          {pinned ? (
            <ConfigurationFiat
              name={pinnedName}
              form={form}
              fields={fields}
              currency={pinnedCurrency || undefined}
            />
          ) : (
            <ConfigurationSiacoin name={name} form={form} fields={fields} />
          )}
        </div>
      }
    />
  )
}

/**
 * Shown when the daemon has a mixed pinning configuration, ie one saved before
 * pinning became all or nothing. The host resolves it by choosing to pin every
 * price or none of them.
 */
export function MixedPinningNotice({
  form,
}: {
  form: UseFormReturn<SettingsData>
}) {
  const setShouldPinPrices = (value: boolean) =>
    form.setValue('shouldPinPrices', value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  return (
    <div className="flex gap-3">
      <Text color="amber" className="shrink-0 mt-px">
        <Warning16 />
      </Text>
      <div className="flex flex-col gap-3 items-start">
        <Text size="14" color="subtle">
          Some of your prices are pinned to fiat values and some are not.
          Pinning is now all or nothing - pin all of your prices or unpin all of
          them. Your current configuration is preserved.
        </Text>
        <div className="flex gap-2">
          <Button onClick={() => setShouldPinPrices(true)}>Pin all</Button>
          <Button onClick={() => setShouldPinPrices(false)}>Unpin all</Button>
        </div>
      </div>
    </div>
  )
}
