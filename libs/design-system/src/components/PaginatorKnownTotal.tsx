'use client'

import { Button } from '../core/Button'
import { ControlGroup } from '../core/ControlGroup'
import {
  CaretLeft16,
  CaretRight16,
  PageFirst16,
  PageLast16,
} from '@siafoundation/react-icons'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { LoadingDots } from '../components/LoadingDots'

type Props = {
  offset: number
  limit: number
  isLoading: boolean
  total: number
}

export function PaginatorKnownTotal({
  offset,
  limit,
  total,
  isLoading,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
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
          const query = new URLSearchParams(searchParams.toString())
          query.set('offset', Math.max(offset - limit, 0).toString())
          router.push(`${pathname}?${query.toString()}`)
        }}
      >
        <CaretLeft16 />
      </Button>
      <Button state="waiting" className="rounded-none px-3">
        {total > 0 ? (
          `${offset + 1} - ${Math.min(offset + limit, total)} of ${
            total ? total.toLocaleString() : ''
          }`
        ) : isLoading ? (
          <LoadingDots className="px-2" />
        ) : (
          'No results'
        )}
      </Button>
      <Button
        aria-label="go to next page"
        icon="contrast"
        disabled={offset + limit >= total}
        size="small"
        variant="gray"
        className="rounded-none"
        onClick={() => {
          const query = new URLSearchParams(searchParams.toString())
          query.set('offset', Math.min(offset + limit, total).toString())
          router.push(`${pathname}?${query.toString()}`)
        }}
      >
        <CaretRight16 />
      </Button>
      <Button
        aria-label="go to last page"
        icon="contrast"
        disabled={offset + limit >= total}
        size="small"
        variant="gray"
        className="rounded-l-none"
        onClick={() => {
          const query = new URLSearchParams(searchParams.toString())
          query.set('offset', (Math.floor(total / limit) * limit).toString())
          router.push(`${pathname}?${query.toString()}`)
        }}
      >
        <div className="flex" style={{ transform: 'scale(0.65)' }}>
          <PageLast16 />
        </div>
      </Button>
    </ControlGroup>
  )
}
