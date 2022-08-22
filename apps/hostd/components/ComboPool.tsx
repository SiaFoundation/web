import { Badge, Flex } from '@siafoundation/design-system'

type Option = {
  value: string
  label: React.ReactNode
}

type Props = {
  options: Option[]
  values: string[]
  onChange: (value: string) => void
}

export function ComboPool({ values, options, onChange }: Props) {
  return (
    <Flex gap="0-5" wrap="wrap">
      {options.map((option) => {
        return (
          <Badge
            key={option.value}
            interactive
            variant={values.includes(option.value) ? 'active' : 'inactive'}
            onClick={() => {
              onChange(option.value)
            }}
          >
            {option.label}
          </Badge>
        )
      })}
    </Flex>
  )
}
