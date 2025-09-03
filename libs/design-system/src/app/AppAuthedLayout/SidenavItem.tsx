'use client'

import { useMemo } from 'react'
import { Button } from '../../core/Button'
import { Link } from '../../core/Link'
import { Tooltip } from '../../core/Tooltip'
import { usePathname } from 'next/navigation'

type Props = {
  title: string
  children: React.ReactNode
  route?: string
  onClick?: () => void
}

export function SidenavItem({ title, children, route, onClick }: Props) {
  const pathname = usePathname()
  const routePathname = useMemo(() => {
    return route?.split('?')[0] || '-'
  }, [route])
  const isActive =
    route &&
    (route === '/' ? pathname === route : pathname?.startsWith(routePathname))

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
          aria-label={title}
          icon="contrast"
          size="none"
          variant="state"
          data-state={isActive ? 'open' : 'closed'}
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
          tabIndex={-1}
          aria-label={title}
          icon="contrast"
          size="none"
          variant="state"
          data-state={isActive ? 'open' : 'closed'}
          onClick={onClick}
        >
          {children}
        </Button>
      </Tooltip>
    </Link>
  )
}
