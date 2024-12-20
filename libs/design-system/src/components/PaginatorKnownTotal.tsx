'use client'

import { Button } from '../core/Button'
import { ControlGroup } from '../core/ControlGroup'
import {
  CaretLeft16,
  CaretRight16,
  PageFirst16,
  PageLast16,
} from '@siafoundation/react-icons'
import { usePagesRouter } from '@siafoundation/next'
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
  const router = usePagesRouter()
  return (
    <ControlGroup>
      <Button
        aria-label="go to first page"
        icon="contrast"
        disabled={offset <= 0}
        size="small"
        variant="gray"
        className="rounded-r-none"
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              offset: 0,
            },
          })
        }
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
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              offset: Math.max(offset - limit, 0),
            },
          })
        }
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
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              offset: Math.min(offset + limit, total),
            },
          })
        }
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
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              offset: Math.floor(total / limit) * limit,
            },
          })
        }
      >
        <div className="flex" style={{ transform: 'scale(0.65)' }}>
          <PageLast16 />
        </div>
      </Button>
    </ControlGroup>
  )
}
