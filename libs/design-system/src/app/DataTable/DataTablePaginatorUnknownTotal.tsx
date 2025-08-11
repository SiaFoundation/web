'use client'

import { Button } from '../../core/Button'
import { ControlGroup } from '../../core/ControlGroup'
import {
  CaretLeft16,
  CaretRight16,
  PageFirst16,
} from '@siafoundation/react-icons'
import { LoadingDots } from '../../components/LoadingDots'

type Props = {
  offset: number
  limit: number
  isLoading?: boolean
  pageTotal: number
  firstPage: () => void
  previousPage: () => void
  nextPage: () => void
  lastPage: () => void
}

export function DataTablePaginatorUnknownTotal({
  firstPage,
  previousPage,
  nextPage,
  offset,
  limit,
  pageTotal,
  isLoading,
}: Props) {
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
          firstPage()
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
          previousPage()
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
          nextPage()
        }}
      >
        <CaretRight16 />
      </Button>
    </ControlGroup>
  )
}
