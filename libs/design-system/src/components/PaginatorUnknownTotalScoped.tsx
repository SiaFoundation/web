'use client'

import { Button } from '../core/Button'
import { ControlGroup } from '../core/ControlGroup'
import {
  CaretLeft16,
  CaretRight16,
  PageFirst16,
} from '@siafoundation/react-icons'
import {
  useAppRouter,
  useParams,
  usePathname,
  useSearchParams,
} from '@siafoundation/next'
import { LoadingDots } from './LoadingDots'

type Props = {
  scope: string
  offset: number
  limit: number
  pageTotal: number
  isLoading: boolean
}

export function PaginatorUnknownTotalScoped({
  scope,
  offset,
  limit,
  pageTotal,
  isLoading,
}: Props) {
  const router = useAppRouter()
  const pathname = usePathname()
  const params = useSearchParams()
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
          const paramsObj = new URLSearchParams(Array.from(params.entries()))
          paramsObj.set(`${scope}Page`, '0')
          router.push(`${pathname}?${paramsObj.toString()}`)
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
        onClick={() =>
          router.push(`${pathname}?${scope}Page=${Math.max(offset - limit, 0)}`)
        }
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
          const paramsObj = new URLSearchParams(Array.from(params.entries()))
          paramsObj.set(`${scope}Page`, String(offset + limit))
          router.push(`${pathname}?${paramsObj.toString()}`)
        }}
      >
        <CaretRight16 />
      </Button>
    </ControlGroup>
  )
}
