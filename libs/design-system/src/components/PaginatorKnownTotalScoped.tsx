'use client'

import { Button } from '../core/Button'
import { ControlGroup } from '../core/ControlGroup'
import {
  CaretLeft16,
  CaretRight16,
  PageFirst16,
  PageLast16,
} from '@siafoundation/react-icons'
import { useAppRouter, useSearchParams, usePathname } from '@siafoundation/next'
import { LoadingDots } from './LoadingDots'

type Props = {
  scope: string
  offset: number
  limit: number
  isLoading: boolean
  total: number
}

export function PaginatorKnownTotalScoped({
  scope,
  offset,
  limit,
  total,
  isLoading,
}: Props) {
  const router = useAppRouter()
  const pathname = usePathname()
  const params = useSearchParams()
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
          paramsObj.set(`${scope}Offset`, '0')
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
        onClick={() => {
          const paramsObj = new URLSearchParams(Array.from(params.entries()))
          paramsObj.set(
            `${scope}Offset`,
            Math.max(offset - limit, 0).toString()
          )
          router.push(`${pathname}?${paramsObj.toString()}`)
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
          const paramsObj = new URLSearchParams(Array.from(params.entries()))
          paramsObj.set(
            `${scope}Offset`,
            Math.min(offset + limit, total).toString()
          )
          router.push(`${pathname}?${paramsObj.toString()}`)
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
          const paramsObj = new URLSearchParams(Array.from(params.entries()))
          paramsObj.set(
            `${scope}Offset`,
            (Math.floor(total / limit) * limit).toString()
          )
          router.push(`${pathname}?${paramsObj.toString()}`)
        }}
      >
        <div className="flex" style={{ transform: 'scale(0.65)' }}>
          <PageLast16 />
        </div>
      </Button>
    </ControlGroup>
  )
}
