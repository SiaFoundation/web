import { Button, HoverCard, ScrollArea } from '@siafoundation/design-system'
import { Maximize16 } from '@siafoundation/react-icons'
import useLocalStorageState from 'use-local-storage-state'
import { cx } from 'class-variance-authority'

export function HangingNavItem({
  localStorageKey,
  heading,
  children,
  tip,
  canMaximizeControls,
  testId,
}: {
  localStorageKey: string
  heading: React.ReactNode
  children?: React.ReactNode
  tip?: React.ReactNode
  canMaximizeControls?: boolean
  testId?: string
}) {
  const [maximized, setMaximized] = useLocalStorageState<boolean>(
    `v0/renterd/${localStorageKey}`,
    {
      defaultValue: true,
    }
  )
  const el = (
    <div className="flex flex-col gap-1">
      <div
        className={cx(
          'flex justify-between items-center gap-2 px-3 py-1.5',
          maximized && children
            ? 'border-b border-gray-200 dark:border-graydark-300'
            : '',
          canMaximizeControls ? 'cursor-pointer' : ''
        )}
        onClick={() => {
          if (canMaximizeControls) {
            setMaximized((maximized) => !maximized)
          }
        }}
      >
        {heading}
        {canMaximizeControls && (
          <Button variant="ghost" size="none">
            <Maximize16 />
          </Button>
        )}
      </div>
    </div>
  )
  return (
    <div
      data-testid={testId}
      className="flex flex-col max-h-[600px] bg-gray-50 dark:bg-graydark-50 border-b border-x border-gray-300 dark:border-graydark-400 rounded-b"
    >
      <ScrollArea>
        {tip ? <HoverCard trigger={el}>{tip}</HoverCard> : el}
        {maximized && children}
      </ScrollArea>
    </div>
  )
}
