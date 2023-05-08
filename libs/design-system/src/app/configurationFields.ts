import BigNumber from 'bignumber.js'
import { FieldValues, Path, RegisterOptions } from 'react-hook-form'

export type ConfigField<
  Values extends FieldValues,
  Categories extends string
> = {
  type: 'number' | 'siacoin' | 'text' | 'secret' | 'boolean' | 'select'
  category: Categories
  title: string
  description: React.ReactNode
  units?: string
  placeholder?: string
  suggestionTip?: React.ReactNode
  suggestion?: BigNumber | string | boolean
  average?: BigNumber | string | boolean
  // number
  decimalsLimit?: number
  // sc
  decimalsLimitSc?: number
  decimalsLimitFiat?: number
  tipsDecimalsLimitSc?: number

  options?: { label: string; value: string }[]

  show?: (values: Values) => boolean

  validation: RegisterOptions<Values>
  trigger?: Path<Values>[]
}

export type ConfigFields<
  Values extends FieldValues,
  Categories extends string
> = Record<keyof Values, ConfigField<Values, Categories>>
