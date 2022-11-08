import {
  Button,
  ControlGroup,
  CaretLeft16,
  CaretRight16,
  IconButton,
  PageFirst16,
  PageLast16,
  Text,
  Flex,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { useHosts } from '../hooks/useHosts'

export function HostsPaginator() {
  const router = useRouter()
  const { skip, limit, meta } = useHosts()
  return (
    <ControlGroup>
      <IconButton
        disabled={skip <= 0}
        size="1"
        variant="gray"
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              skip: 0,
            },
          })
        }
      >
        <Flex css={{ transform: 'scale(0.65)' }}>
          <PageFirst16 />
        </Flex>
      </IconButton>
      <IconButton
        disabled={skip <= 0}
        size="1"
        variant="gray"
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
      </IconButton>
      <Button size="1">
        {skip + 1} - {Math.min(skip + limit, meta.totalFiltered)}
        <Text size="12" color="subtle">
          {' '}
          of{' '}
          {meta.totalFiltered ? meta.totalFiltered.toLocaleString() : '68,590'}
        </Text>
      </Button>
      <IconButton
        disabled={skip + limit >= meta.totalFiltered}
        size="1"
        variant="gray"
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
      </IconButton>
      <IconButton
        disabled={skip + limit >= meta.totalFiltered}
        size="1"
        variant="gray"
        onClick={() =>
          router.push({
            query: {
              ...router.query,
              skip: Math.round(meta.totalFiltered / limit) * limit,
            },
          })
        }
      >
        <Flex css={{ transform: 'scale(0.65)' }}>
          <PageLast16 />
        </Flex>
      </IconButton>
    </ControlGroup>
  )
}
