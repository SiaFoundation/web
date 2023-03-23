import { Button } from '../core/Button'
import { ControlGroup } from '../core/ControlGroup'
import { CaretLeft16, CaretRight16, PageFirst16 } from '../icons/carbon'
import { useRouter } from 'next/router'

type Props = {
  offset: number
  limit: number
  pageTotal: number
}

export function PaginatorUnknownTotal({ offset, limit, pageTotal }: Props) {
  const router = useRouter()
  const isMore = pageTotal === limit
  const from = offset + 1
  const to = Math.min(offset + limit, offset + pageTotal)
  return (
    <ControlGroup>
      <Button
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
      <Button className="rounded-none px-3" state="waiting">
        {from} - {to}
      </Button>
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
              offset: offset + limit,
            },
          })
        }
      >
        <CaretRight16 />
      </Button>
    </ControlGroup>
  )
}
