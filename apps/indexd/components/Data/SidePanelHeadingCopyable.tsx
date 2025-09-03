import { Text, ValueCopyable } from '@siafoundation/design-system'

export function SidePanelHeadingCopyable({
  heading,
  label,
  value,
}: {
  heading: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-1 overflow-hidden">
      <div className="flex-none flex items-center gap-1">
        {typeof heading === 'string' ? (
          <Text size="18" weight="medium" ellipsis>
            {heading}
          </Text>
        ) : (
          heading
        )}
      </div>
      <ValueCopyable
        fitWidth
        size="18"
        weight="medium"
        maxLength={200}
        value={value}
        label={label}
      />
    </div>
  )
}
