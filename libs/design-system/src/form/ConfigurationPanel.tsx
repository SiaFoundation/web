import { Separator } from '../core/Separator'
import { ConfigurationSiacoin } from './ConfigurationSiacoin'
import { ConfigurationNumber } from './ConfigurationNumber'
import { ConfigurationText } from './ConfigurationText'
import { ConfigurationSwitch } from './ConfigurationSwitch'
import { PanelMenuSetting } from '../app/PanelMenuSetting'
import { PanelMenuSection } from '../app/PanelMenuSection'
import { Fragment } from 'react'
import { ConfigurationSelect } from './ConfigurationSelect'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { ConfigField, ConfigFields } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  title: string
  category: string
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
}

export function ConfigurationPanel<
  Values extends FieldValues,
  Categories extends string
>({ title, category, form, fields }: Props<Values, Categories>) {
  const list = (
    Object.entries(fields) as [Path<Values>, ConfigField<Values, Categories>][]
  ).filter(
    ([_, val]) =>
      val.category === category &&
      !val.hidden &&
      (!val.show || val.show(form.getValues()))
  )
  if (list.length === 0) {
    return null
  }
  return (
    <PanelMenuSection title={title}>
      {list.map(([key, val], i) => (
        <Fragment key={key}>
          <PanelMenuSetting
            title={val.title}
            description={val.description}
            control={
              val.type === 'number' ? (
                <ConfigurationNumber form={form} name={key} fields={fields} />
              ) : val.type === 'siacoin' ? (
                <ConfigurationSiacoin form={form} name={key} fields={fields} />
              ) : val.type === 'text' ? (
                <ConfigurationText form={form} name={key} fields={fields} />
              ) : val.type === 'password' ? (
                <ConfigurationText
                  form={form}
                  type="password"
                  fields={fields}
                  name={key}
                />
              ) : val.type === 'boolean' ? (
                <ConfigurationSwitch form={form} name={key} fields={fields} />
              ) : val.type === 'select' ? (
                <ConfigurationSelect form={form} name={key} fields={fields} />
              ) : null
            }
          />
          {i < list.length - 1 && <Separator className="w-full my-3" />}
        </Fragment>
      ))}
    </PanelMenuSection>
  )
}
