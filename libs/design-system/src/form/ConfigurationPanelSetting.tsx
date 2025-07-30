import { PanelMenuSetting } from '../app/PanelMenuSetting'
import { FieldValues } from 'react-hook-form'
import { FieldProps, shouldShowField } from './configurationFields'
import { ConfigurationControl } from './ConfigurationControl'

export function ConfigurationPanelSetting<
  Values extends FieldValues,
  Categories extends string,
>({
  name,
  form,
  fields,
  autoVisibility,
}: FieldProps<Values, Categories> & {
  autoVisibility?: boolean
}) {
  const field = fields[name]
  const checkConfigShouldShowField = shouldShowField({ form, fields, name })
  return !autoVisibility || checkConfigShouldShowField ? (
    <PanelMenuSetting
      id={name}
      title={field.title}
      description={field.description}
      control={<ConfigurationControl form={form} name={name} fields={fields} />}
    />
  ) : null
}
