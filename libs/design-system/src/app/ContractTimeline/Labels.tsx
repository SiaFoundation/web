import { Text } from '../../core/Text'
import { format } from 'date-fns'

type RelativeLabelProps = {
  children: React.ReactNode
  align?: 'start' | 'end'
  variant: 'primary' | 'secondary'
}

export function RelativeLabel({
  children,
  variant,
  align,
}: RelativeLabelProps) {
  return (
    <div
      className="relative"
      style={{
        top: variant === 'primary' ? '6px' : undefined,
        left: align === 'start' ? '0px' : undefined,
        right: align === 'end' ? '0px' : undefined,
      }}
    >
      <Text
        size="10"
        color={variant === 'primary' ? 'contrast' : 'verySubtle'}
        dir={align === 'start' ? 'rtl' : 'ltr'}
        weight={variant === 'primary' ? 'semibold' : 'regular'}
        ellipsis
      >
        {children}
      </Text>
    </div>
  )
}

type DateLabelProps = {
  date?: number
  align: 'start' | 'end'
  variant: 'primary' | 'secondary'
}

export function DateLabel({ date, align, variant }: DateLabelProps) {
  return date ? (
    <RelativeLabel variant={variant} align={align}>
      {variant === 'primary' ? format(date, 'MMM d') : format(date, 'MMM d')}
    </RelativeLabel>
  ) : null
}

type BlockLabelProps = {
  blockHeight?: number
  align: 'start' | 'end'
  variant: 'primary' | 'secondary'
}

export function BlockLabel({ blockHeight, align, variant }: BlockLabelProps) {
  return blockHeight ? (
    <RelativeLabel variant={variant} align={align}>
      {blockHeight.toLocaleString()}
    </RelativeLabel>
  ) : null
}
