import { Button } from '../core/Button'
import { ControlGroup } from '../core/ControlGroup'
import {
  CaretLeft16,
  CaretRight16,
  PageFirst16,
  PageLast16,
} from '../icons/carbon'
import { useRouter } from 'next/router'
import { LoadingDots } from '..'

type Props = {
  offset: number
  limit: number
  isLoading: boolean
  datasetTotal: number
  pageTotal: number
}

export function PaginatorKnownTotal({
  offset,
  limit,
  datasetTotal,
  isLoading,
}: Props) {
  const router = useRouter()
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
      <Button state="waiting" className="rounded-none px-3">
        {datasetTotal > 0 ? (
          `${offset + 1} - ${Math.min(offset + limit, datasetTotal)} of ${
            datasetTotal ? datasetTotal.toLocaleString() : ''
          }`
        ) : isLoading ? (
          <LoadingDots className="px-2" />
        ) : (
          'No results'
        )}
      </Button>
      <Button
        icon="contrast"
        disabled={offset + limit >= datasetTotal}
        size="small"
        variant="gray"
        className="rounded-none"
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              offset: Math.min(offset + limit, datasetTotal),
            },
          })
        }
      >
        <CaretRight16 />
      </Button>
      <Button
        icon="contrast"
        disabled={offset + limit >= datasetTotal}
        size="small"
        variant="gray"
        className="rounded-l-none"
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              offset: Math.round(datasetTotal / limit) * limit,
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
