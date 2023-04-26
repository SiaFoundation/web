import { cx } from 'class-variance-authority'
import { Status } from '../core/Status'
import { Text } from '../core/Text'

type Props = {
  label: string
  enabled?: boolean
  onChange?: (val: boolean) => void
  color?: string
}

export function DataLabel({ label, enabled = true, onChange, color }: Props) {
  return (
    <div
      className={cx(
        'flex gap-1.5 items-center',
        enabled ? 'opacity-100' : 'opacity-50',
        onChange ? 'cursor-pointer' : 'cursor-auto',
        onChange && (enabled ? 'hover:opacity-90' : 'hover:opacity-60')
      )}
      onClick={() => onChange && onChange(!enabled)}
    >
      {color && (
        <div className="relative top-px">
          <Status style={{ backgroundColor: color }} />
        </div>
      )}
      <Text>{label}</Text>
    </div>
  )
}
