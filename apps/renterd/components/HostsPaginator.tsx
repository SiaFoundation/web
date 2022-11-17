import {
  Button,
  ControlGroup,
  CaretLeft16,
  CaretRight16,
  PageFirst16,
  PageLast16,
  Text,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { useHosts } from '../hooks/useHosts'

export function HostsPaginator() {
  const router = useRouter()
  const { skip, limit, meta } = useHosts()
  return (
    <ControlGroup>
      <Button
        disabled={skip <= 0}
        size="small"
        variant="gray"
        className="rounded-r-none"
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              skip: 0,
            },
          })
        }
      >
        <div className="flex" style={{ transform: 'scale(0.65)' }}>
          <PageFirst16 />
        </div>
      </Button>
      <Button
        disabled={skip <= 0}
        size="small"
        variant="gray"
        className="rounded-none"
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              skip: Math.max(skip - limit, 0),
            },
          })
        }
      >
        <CaretLeft16 />
      </Button>
      <Button className="rounded-none px-3">
        {skip + 1} - {Math.min(skip + limit, meta.totalFiltered)}
        <Text size="12" color="subtle">
          {' '}
          of{' '}
          {meta.totalFiltered ? meta.totalFiltered.toLocaleString() : '68,590'}
        </Text>
      </Button>
      <Button
        disabled={skip + limit >= meta.totalFiltered}
        size="small"
        variant="gray"
        className="rounded-none"
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              skip: Math.min(skip + limit, meta.totalFiltered),
            },
          })
        }
      >
        <CaretRight16 />
      </Button>
      <Button
        disabled={skip + limit >= meta.totalFiltered}
        size="small"
        variant="gray"
        className="rounded-l-none"
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              skip: Math.round(meta.totalFiltered / limit) * limit,
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
