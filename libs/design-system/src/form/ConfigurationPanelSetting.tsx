import { PanelMenuSetting } from '../app/PanelMenuSetting'
import { FieldValues } from 'react-hook-form'
import { FieldProps } from './configurationFields'
import { ConfigurationControl } from './ConfigurationControl'

export function ConfigurationPanelSetting<
  Values extends FieldValues,
  Categories extends string
>({ name, form, fields }: FieldProps<Values, Categories>) {
  const field = fields[name]
  return (
    <PanelMenuSetting
      id={name}
      title={field.title}
      description={field.description}
      control={<ConfigurationControl form={form} name={name} fields={fields} />}
    />
  )
}
