import { uniq } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import {
  Badge,
  Flex,
  Grid,
  ContentBlock,
  ContentCard,
  ContentItemProps,
  ContentLi,
} from '../'
import { Heading } from '../primitives/Heading'
import { Text } from '../primitives/Text'

type Props = React.ComponentProps<typeof ContentBlock> & {
  items: ContentItemProps[]
  filterable?: string
  variant?: 'list' | 'card'
}

export function ContentGallery({
  title,
  size,
  description,
  filterable,
  variant = 'list',
  links,
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

  const ContentComponent = variant === 'card' ? ContentCard : ContentLi

  return (
    <Flex direction="column" gap="3" align="start">
      <ContentBlock
        size={size}
        title={title}
        description={description}
        links={links}
      />
      <Flex direction="column" gap="5">
        {filterable && (
          <Flex direction="column" gap="2">
            <Text
              size="1"
              css={{
                fontFamily: '$mono',
                textTransform: 'uppercase',
                color: '$slate12',
              }}
            >
              Filter projects
            </Text>
            <Flex gap="2" wrap="wrap">
              <Badge
                key="all"
                interactive
                variant={!activeFilter ? 'green' : 'outline'}
                size="2"
                onClick={() => changeFilter(undefined)}
              >
                All
              </Badge>
              {filters.map((filter) => (
                <Badge
                  key={filter}
                  interactive
                  variant={activeFilter === filter ? 'green' : 'outline'}
                  size="2"
                  onClick={() => changeFilter(filter)}
                >
                  {filter.replace(/_/g, ' ')}
                </Badge>
              ))}
            </Flex>
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
            <ContentComponent key={item.link} {...item} />
          ))}
        </Grid>
      </Flex>
    </Flex>
  )
}
