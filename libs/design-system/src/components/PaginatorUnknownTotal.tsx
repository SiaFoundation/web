'use client'

import { Button } from '../core/Button'
import { ControlGroup } from '../core/ControlGroup'
import {
  CaretLeft16,
  CaretRight16,
  PageFirst16,
} from '@siafoundation/react-icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { LoadingDots } from './LoadingDots'
import { useScrollReset } from '../hooks/useScrollReset'

type Props = {
  offset: number
  limit: number
  pageTotal: number
  isLoading: boolean
  scrollId?: string
}

export function PaginatorUnknownTotal({
  offset,
  limit,
  pageTotal,
  isLoading,
  scrollId = 'app-scroll-area',
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const resetScroll = useScrollReset(scrollId)

  const isMore = pageTotal >= limit
  const from = offset + 1
  const to = Math.min(offset + limit, offset + pageTotal)
  return (
    <ControlGroup>
      <Button
        aria-label="go to first page"
        icon="contrast"
        disabled={offset <= 0}
        size="small"
        variant="gray"
        className="rounded-r-none"
        onClick={() => {
          resetScroll()
          const query = new URLSearchParams(searchParams.toString())
          query.set('offset', '0')
          router.push(`${pathname}?${query.toString()}`)
        }}
      >
        <div className="flex scale-[0.65]">
          <PageFirst16 />
        </div>
      </Button>
      <Button
        aria-label="go to previous page"
        icon="contrast"
        disabled={offset <= 0}
        size="small"
        variant="gray"
        className="rounded-none"
        onClick={() => {
          resetScroll()
          const query = new URLSearchParams(searchParams.toString())
          query.set('offset', Math.max(offset - limit, 0).toString())
          router.push(`${pathname}?${query.toString()}`)
        }}
      >
        <CaretLeft16 />
      </Button>
      {isLoading ? (
        <Button className="rounded-none px-3" state="waiting" color="subtle">
          <LoadingDots className="px-2" />
        </Button>
      ) : pageTotal ? (
        <Button className="rounded-none px-3" state="waiting">
          {from} - {to}
        </Button>
      ) : (
        <Button className="rounded-none px-3" state="waiting" color="subtle">
          none
        </Button>
      )}
      <Button
        aria-label="go to next page"
        icon="contrast"
        disabled={!isMore}
        size="small"
        variant="gray"
        className="rounded-none"
        onClick={() => {
          resetScroll()
          const query = new URLSearchParams(searchParams.toString())
          query.set('offset', (offset + limit).toString())
          router.push(`${pathname}?${query.toString()}`)
        }}
      >
        <CaretRight16 />
      </Button>
    </ControlGroup>
  )
}
