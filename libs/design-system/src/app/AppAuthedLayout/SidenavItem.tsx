'use client'

import { Button } from '../../core/Button'
import { Link } from '../../core/Link'
import { Tooltip } from '../../core/Tooltip'
import { usePathname } from '@siafoundation/next'

type Props = {
  title: string
  children: React.ReactNode
  route?: string
  onClick?: () => void
}

export function SidenavItem({ title, children, route, onClick }: Props) {
  const pathname = usePathname()
  const state =
    route && (route === '/' ? pathname === route : pathname?.startsWith(route))

  if (!route) {
    return (
      <Tooltip
        side="right"
        align="center"
        delayDuration={0}
        sideOffset={5}
        content={title}
      >
        <Button
          icon="contrast"
          size="none"
          variant="state"
          data-state={state ? 'open' : 'closed'}
          onClick={onClick}
        >
          {children}
        </Button>
      </Tooltip>
    )
  }

  return (
    <Link href={route} className="no-underline">
      <Tooltip
        side="right"
        align="center"
        delayDuration={0}
        sideOffset={5}
        content={title}
      >
        <Button
          icon="contrast"
          size="none"
          variant="state"
          data-state={state ? 'open' : 'closed'}
          onClick={onClick}
        >
          {children}
        </Button>
      </Tooltip>
    </Link>
  )
}
