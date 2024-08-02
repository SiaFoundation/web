import { FieldSwitch, Text, Tooltip } from '@siafoundation/design-system'
import { UseFormReturn } from 'react-hook-form'
import { SettingsData } from '../../contexts/config/types'
import { Fields } from '../../contexts/config/fields'

export function ShouldPinSwitch({
  name,
  form,
  fields,
}: {
  name: keyof SettingsData
  form: UseFormReturn<SettingsData>
  fields: Fields
}) {
  return (
    <Tooltip
      align="end"
      content="Pin the value to a fixed fiat amount. The daemon will automatically keep the value in sync."
    >
      <div className="flex w-full justify-between">
        <Text weight="medium" color="verySubtle" size="14">
          Pin
        </Text>
        <FieldSwitch
          name={name}
          form={form}
          fields={fields}
          size="small"
          group={false}
        />
      </div>
    </Tooltip>
  )
}
