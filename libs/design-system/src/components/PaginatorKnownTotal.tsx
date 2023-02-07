import { Button } from '../core/Button'
import { Text } from '../core/Text'
import { ControlGroup } from '../core/ControlGroup'
import {
  CaretLeft16,
  CaretRight16,
  PageFirst16,
  PageLast16,
} from '../icons/carbon'
import { useRouter } from 'next/router'

type Props = {
  offset: number
  limit: number
  datasetTotal: number
  pageTotal: number
}

export function PaginatorKnownTotal({ offset, limit, datasetTotal }: Props) {
  const router = useRouter()
  return (
    <ControlGroup>
      <Button
        icon
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
        icon
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
      <Button className="rounded-none px-3">
        {offset + 1} - {Math.min(offset + limit, datasetTotal)}
        <Text size="12" color="subtle">
          {' '}
          of {datasetTotal ? datasetTotal.toLocaleString() : ''}
        </Text>
      </Button>
      <Button
        icon
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
        icon
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
