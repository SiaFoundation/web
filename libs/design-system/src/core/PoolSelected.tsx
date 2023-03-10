import { Close16 } from '../icons/carbon'
import { Button } from './Button'
import { ControlGroup } from './ControlGroup'

type Option = {
  value: string
  label: React.ReactNode
}

type Props = {
  options: Option[]
  onClick?: (value: string) => void
  onRemove: (value: string) => void
}

export function PoolSelected({ options, onClick, onRemove }: Props) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((option) => {
        return (
          <ControlGroup key={option.value}>
            <Button
              variant="active"
              onClick={() => {
                if (onClick) {
                  onClick(option.value)
                }
              }}
            >
              {option.label}
            </Button>
            <Button
              variant="active"
              size="small"
              onClick={() => onRemove(option.value)}
            >
              <Close16 />
            </Button>
          </ControlGroup>
        )
      })}
    </div>
  )
}
