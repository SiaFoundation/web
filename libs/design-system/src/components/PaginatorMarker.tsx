'use client'

import { Button } from '../core/Button'
import { ControlGroup } from '../core/ControlGroup'
import { CaretRight16, PageFirst16 } from '@siafoundation/react-icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { LoadingDots } from './LoadingDots'
import { pluralize } from '@siafoundation/units'
import { useScrollReset } from '../hooks/useScrollReset'

type Props = {
  marker?: string | null
  nextMarker: string | null
  isMore: boolean
  limit: number
  pageTotal: number
  isLoading: boolean
  scrollId?: string
}

export function PaginatorMarker({
  marker,
  nextMarker,
  isMore,
  pageTotal,
  isLoading,
  scrollId = 'app-scroll-area',
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const resetScroll = useScrollReset(scrollId)

  // If no marker is provided, we do not know if we are on the first or any other page
  // so leave the control enabled. If the marker is null, we are on the first page.
  const previousDisabled = marker === undefined ? false : marker === null
  return (
    <ControlGroup>
      <Button
        aria-label="go to first page"
        disabled={previousDisabled}
        icon="contrast"
        size="small"
        variant="gray"
        className="rounded-r-none"
        onClick={() => {
          resetScroll()
          const query = new URLSearchParams(searchParams.toString())
          query.set('marker', '')
          router.push(`${pathname}?${query.toString()}`)
        }}
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
        <Button
          className="rounded-none px-3"
          state="waiting"
          tip={`${pluralize(pageTotal, 'item')} on current page`}
        >
          {pageTotal}
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
          query.set('marker', nextMarker ?? '')
          router.push(`${pathname}?${query.toString()}`)
        }}
      >
        <CaretRight16 />
      </Button>
    </ControlGroup>
  )
}
