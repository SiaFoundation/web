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

export function SwitchMulti({ options, value, onChange }: Props) {
  return (
    <Panel
      css={{
        height: '30px',
        backgroundColor: '$slate5',
        borderRadius: '$1',
      }}
    >
      <Flex
        gap="0-5"
        align="center"
        css={{ position: 'relative', top: '-0.5px', height: '100%' }}
      >
        {options.map((option) => (
          <Button
            key={option.value}
            size="1"
            onClick={() => onChange(option.value)}
            ghost={value !== option.value}
            css={{
              color: value !== option.value ? '$textVerySubtle' : undefined,
              '&:hover': {
                color: value !== option.value ? '$textSubtle' : undefined,
              },
            }}
          >
            {option.label}
          </Button>
        ))}
      </Flex>
    </Panel>
  )
}
