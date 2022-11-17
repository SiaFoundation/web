import { Button } from '../core/Button'
import { Panel } from '../core/Panel'

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
    <Panel className="h-8 bg-gray-400 dark:bg-graydark-400 rounded">
      <div className="relative flex gap-1 items-center top-[-0.5px] h-full">
        {options.map((option) => (
          <Button
            key={option.value}
            size="medium"
            onClick={() => onChange(option.value)}
            variant={value !== option.value ? 'ghost' : 'gray'}
            color={value !== option.value ? 'verySubtle' : 'subtle'}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </Panel>
  )
}
