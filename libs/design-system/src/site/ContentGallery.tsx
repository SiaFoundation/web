import { uniq } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { Badge, Flex, Grid, ContentItemProps, ContentItem } from '..'
import { Text } from '../core/Text'

type Props = {
  items: ContentItemProps[]
  filterable?: string
  eyebrow?: string
  columns?: React.ComponentProps<typeof Grid>['columns']
  gap?: React.ComponentProps<typeof Grid>['gap']
  component?: (props: ContentItemProps) => JSX.Element | null
}

export function ContentGallery({
  filterable,
  eyebrow,
  columns,
  gap = '5',
  component,
  items,
}: Props) {
  const router = useRouter()
  const activeFilter = (filterable ? router.query[filterable] : undefined) as
    | string
    | undefined
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
    (filter?: string) => {
      if (!filterable) {
        return
      }
      router.replace({
        query: {
          ...router.query,
          [filterable]: filter,
        },
      })
    },
    [filterable, router]
  )

  const ContentComponent = component || ContentItem

  return (
    <Flex direction="column" gap="5">
      {filterable && (
        <Flex direction="column" gap="2">
          {eyebrow && (
            <Text
              size="12"
              css={{
                fontFamily: '$mono',
                textTransform: 'uppercase',
                color: '$slate12',
              }}
            >
              {eyebrow}
            </Text>
          )}
          <Flex gap="1" wrap="wrap">
            <Badge
              key="all"
              interactive
              variant={!activeFilter ? 'accent' : 'simple'}
              onClick={() => changeFilter(undefined)}
              site
            >
              All
            </Badge>
            {filters.map((filter) => (
              <Badge
                key={filter}
                interactive
                variant={activeFilter === filter ? 'accent' : 'simple'}
                onClick={() => changeFilter(filter)}
                site
              >
                {filter.replace(/_/g, ' ')}
              </Badge>
            ))}
          </Flex>
        </Flex>
      )}
      <Grid
        gap={gap}
        columns={
          columns || {
            '@inital': '1',
            '@bp2': '2',
            // '@bp3': '3',
          }
        }
        css={{
          overflow: 'hidden',
        }}
      >
        {filteredItems.map((item) => (
          <ContentComponent key={item.title + item.link} {...item} />
        ))}
      </Grid>
    </Flex>
  )
}
