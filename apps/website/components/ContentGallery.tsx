import { Flex, Grid } from '@siafoundation/design-system'
import { ContentBlock } from './ContentBlock'
import { ContentCard, Item } from './ContentCard'

type Props = React.ComponentProps<typeof ContentBlock> & {
  items: Item[]
}

export function ContentGallery({
  title,
  size,
  description,
  links,
  items,
}: Props) {
  return (
    <Flex direction="column" gap="3">
      <ContentBlock
        size={size}
        title={title}
        description={description}
        links={links}
      />
      <Grid
        gapX="3"
        gapY="3"
        columns={{
          '@inital': '1',
          '@bp2': '2',
          '@bp3': '3',
        }}
      >
        {items.map((item) => (
          <ContentCard key={item.link} {...item} />
        ))}
      </Grid>
    </Flex>
  )
}
