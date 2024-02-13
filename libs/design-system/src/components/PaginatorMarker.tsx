'use client'

import { Button } from '../core/Button'
import { ControlGroup } from '../core/ControlGroup'
import { CaretRight16, PageFirst16 } from '@siafoundation/react-icons'
import { usePagesRouter } from '@siafoundation/next'
import { LoadingDots } from './LoadingDots'

type Props = {
  marker?: string
  isMore: boolean
  limit: number
  pageTotal: number
  isLoading: boolean
}

export function PaginatorMarker({
  marker,
  isMore,
  pageTotal,
  isLoading,
}: Props) {
  const router = usePagesRouter()
  return (
    <ControlGroup>
      <Button
        icon="contrast"
        size="small"
        variant="gray"
        className="rounded-r-none"
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              marker: '',
            },
          })
        }
      >
        <div className="flex scale-[0.65]">
          <PageFirst16 />
        </div>
      </Button>
      {isLoading ? (
        <Button className="rounded-none px-3" state="waiting" color="subtle">
          <LoadingDots className="px-2" />
        </Button>
      ) : pageTotal ? (
        <Button className="rounded-none px-3" state="waiting">
          {pageTotal}
        </Button>
      ) : (
        <Button className="rounded-none px-3" state="waiting" color="subtle">
          none
        </Button>
      )}
      <Button
        icon="contrast"
        disabled={!isMore}
        size="small"
        variant="gray"
        className="rounded-none"
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              marker,
            },
          })
        }
      >
        <CaretRight16 />
      </Button>
    </ControlGroup>
  )
}
