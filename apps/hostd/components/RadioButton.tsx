import { Button, Flex, Panel } from '@siafoundation/design-system'

type Option = {
  label: React.ReactNode
  value: string
}

type Props = {
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export function RadioButton({ options, value, onChange }: Props) {
  return (
    <Panel css={{ p: '$0-5', backgroundColor: '$slate5' }}>
      <Flex gap="0-5">
        {options.map((option) => (
          <Button
            key={option.value}
            size="1"
            onClick={() => onChange(option.value)}
            ghost={value !== option.value}
          >
            {option.label}
          </Button>
        ))}
      </Flex>
    </Panel>
  )
}
