import {
  AnimatedPanel,
  Container,
  Flex,
  Grid,
  Skeleton,
  EntityList,
  BlockList,
} from '@siafoundation/design-system'

export function HomeSkeleton() {
  return (
    <>
      <Container>
        <Flex direction="column" gap="8">
          <AnimatedPanel
            variant="subtle"
            startTime={0}
            css={{
              padding: '$3',
              borderRadius: '$2',
            }}
          >
            <Grid columns="3" gap="6">
              <Skeleton css={{ width: '180px', height: '62px' }} />
              <Skeleton css={{ width: '180px', height: '62px' }} />
              <Skeleton css={{ width: '180px', height: '62px' }} />
              <Skeleton css={{ width: '180px', height: '62px' }} />
              <Skeleton css={{ width: '180px', height: '62px' }} />
              <Skeleton css={{ width: '180px', height: '62px' }} />
            </Grid>
          </AnimatedPanel>
        </Flex>
      </Container>
      <Container size="4">
        <Grid
          columns={{
            '@initial': 1,
            '@bp2': 2,
            '@bp4': 4,
          }}
          gap="3"
        >
          <BlockList title="Latest blocks" />
          <EntityList title="Latest siacoin transactions" />
          <EntityList title="Latest contract transactions" />
          <EntityList title="Latest other transactions" />
        </Grid>
      </Container>
    </>
  )
}
