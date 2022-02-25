import { Badge, Flex, Grid } from '@siafoundation/design-system'
import { uniq } from 'lodash'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useEffect, useMemo } from 'react'
import { ContentBlock } from './ContentBlock'
import { ContentCard, ContentCardProps } from './ContentCard'

type Props = React.ComponentProps<typeof ContentBlock> & {
  items: ContentCardProps[]
  filterable?: string
}

export function ContentGallery({
  title,
  size,
  description,
  filterable,
  links,
  items,
}: Props) {
  const router = useRouter()
  const activeFilter = router.query[filterable] as string
  const filters = useMemo(
    () =>
      uniq(
        items.reduce((acc, item) => acc.concat(item.tags || []), [] as string[])
      ),
    [items]
  )
  const filteredItems = useMemo(() => {
    if (!activeFilter) {
      return items
    }
    return items.filter((i) => i.tags?.includes(activeFilter))
  }, [items, activeFilter])

  const changeFilter = useCallback(
    (filter: string) => {
      router.replace({
        query: {
          [filterable]: filter,
        },
      })
    },
    [filterable, router]
  )

  useEffect(() => {
    if (filterable && !activeFilter) {
      changeFilter(filters[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <Flex direction="column" gap="3">
      <ContentBlock
        size={size}
        title={title}
        description={description}
        links={links}
      />
      <Flex direction="column" gap="5">
        {filterable && (
          <Flex gap="2" wrap="wrap" justify="center">
            {filters.map((filter) => (
              <Badge
                key={filter}
                interactive
                variant={activeFilter === filter ? 'blue' : 'gray'}
                size="2"
                onClick={() => changeFilter(filter)}
              >
                {filter.replace(/_/g, ' ')}
              </Badge>
            ))}
          </Flex>
        )}
        <Grid
          gapX="3"
          gapY="3"
          columns={{
            '@inital': '1',
            '@bp2': '2',
            '@bp3': '3',
          }}
        >
          {filteredItems.map((item) => (
            <ContentCard key={item.link} {...item} />
          ))}
        </Grid>
      </Flex>
    </Flex>
  )
}
