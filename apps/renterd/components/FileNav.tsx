import { Fragment } from 'react'
import { Text, Link, ChevronRight16 } from '@siafoundation/design-system'

export function FileNav() {
  const parts = ['files', 'backups', 'random']

  return (
    <div className="flex gap-1 items-center">
      {parts.map((part, i) => {
        return (
          <Fragment key={part + i}>
            {i > 0 && (
              <Text size="16" color="verySubtle" className="flex items-center">
                <ChevronRight16 />
              </Text>
            )}
            <Text size="16" color="subtle" className="flex items-center">
              <Link href="/" underline="none">
                {part}
              </Link>
            </Text>
          </Fragment>
        )
      })}
    </div>
  )
}
