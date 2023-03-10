import { Button } from './Button'

type Option = {
  value: string
  label: React.ReactNode
}

type Props = {
  options: Option[]
  values: string[]
  onChange: (value: string) => void
}

export function PoolCombo({ values, options, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((option) => {
        return (
          <Button
            key={option.value}
            variant={values.includes(option.value) ? 'active' : 'inactive'}
            onClick={() => {
              onChange(option.value)
            }}
          >
            {option.label}
          </Button>
        )
      })}
    </div>
  )
}
