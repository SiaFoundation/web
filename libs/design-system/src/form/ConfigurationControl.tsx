import type { FieldValues } from 'react-hook-form'
import { ConfigurationNumber } from './ConfigurationNumber'
import { ConfigurationSelect } from './ConfigurationSelect'
import { ConfigurationSiacoin } from './ConfigurationSiacoin'
import { ConfigurationSwitch } from './ConfigurationSwitch'
import { ConfigurationText } from './ConfigurationText'
import type { FieldProps } from './configurationFields'

export function ConfigurationControl<
  Values extends FieldValues,
  Categories extends string,
>({ name, form, fields }: FieldProps<Values, Categories>) {
  const field = fields[name]
  const Custom = field.custom || (() => null)
  return field.type === 'custom' ? (
    <Custom form={form} name={name} fields={fields} />
  ) : field.type === 'number' ? (
    <ConfigurationNumber form={form} name={name} fields={fields} />
  ) : field.type === 'siacoin' ? (
    <ConfigurationSiacoin form={form} name={name} fields={fields} />
  ) : field.type === 'text' ? (
    <ConfigurationText form={form} name={name} fields={fields} />
  ) : field.type === 'password' ? (
    <ConfigurationText
      form={form}
      type="password"
      fields={fields}
      name={name}
    />
  ) : field.type === 'boolean' ? (
    <ConfigurationSwitch form={form} name={name} fields={fields} />
  ) : field.type === 'select' ? (
    <ConfigurationSelect form={form} name={name} fields={fields} />
  ) : null
}
