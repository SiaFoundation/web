import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  AppBar,
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  NImage,
  ScrollArea,
  Section,
  Separator,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'
import bellLabs from '../public/bell-labs.jpeg'

export function Layout() {
  return (
    <Section>
      <SectionHeading hideSeparator>Layout</SectionHeading>
      <Section>
        <SubsectionHeading>Flex - row</SubsectionHeading>
        <Grid columns={1} gap="2">
          <Flex debug gap="1" css={{ p: '$1' }}>
            <Box fill css={{ flex: 1, height: '50px' }} />
            <Box fill css={{ flex: 1, height: '50px' }} />
            <Box fill css={{ flex: 2, height: '50px' }} />
          </Flex>
          <Flex debug direction="column" gap="1" css={{ p: '$1' }}>
            <Box fill css={{ height: '50px' }} />
            <Box fill css={{ height: '50px' }} />
            <Box fill css={{ height: '50px' }} />
          </Flex>
        </Grid>
      </Section>
      <Section>
        <SubsectionHeading>Grid</SubsectionHeading>
        <Grid columns={1} gap="2">
          <Grid debug columns={4} gap="1" css={{ p: '$1' }}>
            <Box fill css={{ height: '50px' }} />
            <Box fill css={{ height: '50px' }} />
            <Box fill css={{ height: '50px' }} />
            <Box fill css={{ height: '50px' }} />
            <Box fill css={{ height: '50px' }} />
            <Box fill css={{ height: '50px' }} />
            <Box fill css={{ height: '50px' }} />
            <Box fill css={{ height: '50px' }} />
          </Grid>
          <Grid debug columns={4} gap="1" css={{ p: '$1', height: '200px' }}>
            <Box fill css={{ gridArea: '1 / 1 / 3 / 3' }}>
              <Box css={{ width: '100%', height: '100%' }} />
            </Box>
            <Box fill css={{ gridArea: '1 / 3 / 5 / 4' }}>
              <Box css={{ width: '100%', height: '100%' }} />
            </Box>
            <Box fill css={{ gridArea: '1 / 4 / 2 / 5' }}>
              <Box css={{ width: '100%', height: '100%' }} />
            </Box>
            <Box fill css={{ gridArea: '2 / 4 / 4 / 5' }}>
              <Box css={{ width: '100%', height: '100%' }} />
            </Box>
            <Box fill css={{ gridArea: '4 / 4 / 5 / 5' }}>
              <Box css={{ width: '100%', height: '100%' }} />
            </Box>
            <Box fill css={{ gridArea: '3 / 1 / 5 / 3' }}>
              <Box css={{ width: '100%', height: '100%' }} />
            </Box>
          </Grid>
        </Grid>
      </Section>
      <Section>
        <SubsectionHeading>ScrollArea</SubsectionHeading>
        <Box debug css={{ height: '200px', width: '200px' }}>
          <ScrollArea>
            <Flex direction="column" gap="1" css={{ p: '$1' }}>
              <Box fill css={{ height: '50px' }} />
              <Box fill css={{ height: '50px' }} />
              <Box fill css={{ height: '50px' }} />
              <Box fill css={{ height: '50px' }} />
              <Box fill css={{ height: '50px' }} />
            </Flex>
          </ScrollArea>
        </Box>
      </Section>
      <Section>
        <SubsectionHeading>Separator</SubsectionHeading>
        <Grid columns={1} gap="4">
          <Flex direction="row" gap="3" css={{ height: '50px' }}>
            <Box fill css={{ height: '50px', width: '50px' }} />
            <Flex align="center">
              <Separator orientation="vertical" size="1" />
            </Flex>
            <Box fill css={{ height: '50px', width: '50px' }} />
            <Flex align="center">
              <Separator orientation="vertical" size="2" />
            </Flex>
            <Box fill css={{ height: '50px', width: '50px' }} />
            <Flex align="center">
              <Separator orientation="vertical" size="3" />
            </Flex>
            <Box fill css={{ height: '50px', width: '50px' }} />
          </Flex>
          <Flex direction="column" gap="3" css={{ width: '50px' }}>
            <Flex justify="center">
              <Separator orientation="horizontal" size="1" />
            </Flex>
            <Box fill css={{ height: '50px', width: '50px' }} />
            <Flex justify="center">
              <Separator orientation="horizontal" size="2" />
            </Flex>
            <Box fill css={{ height: '50px', width: '50px' }} />
            <Flex justify="center">
              <Separator orientation="horizontal" size="3" />
            </Flex>
            <Box fill css={{ height: '50px', width: '50px' }} />
          </Flex>
        </Grid>
      </Section>
      <Section>
        <SubsectionHeading>AppBar</SubsectionHeading>
        <Box
          css={{
            position: 'relative',
            backgroundColor: '$slate5',
            overflow: 'hidden',
          }}
        >
          <Box
            css={{
              position: 'absolute',
              top: '-40px',
            }}
          >
            <NImage {...bellLabs} alt="bell labs" />
          </Box>
          <Grid
            columns={1}
            gap="2"
            css={{
              padding: '$3',
            }}
          >
            <AppBar size="1" color="plain" border glass>
              <Flex css={{ px: '$3' }} justify="between">
                <Heading>Xerox</Heading>
                <IconButton css={{ color: '$gray10' }}>
                  <DotsHorizontalIcon />
                </IconButton>
              </Flex>
            </AppBar>
            <AppBar size="2" color="loContrast">
              <Flex css={{ px: '$3' }} justify="between">
                <Heading>Xerox</Heading>
                <IconButton css={{ color: '$gray10' }}>
                  <DotsHorizontalIcon />
                </IconButton>
              </Flex>
            </AppBar>
            <AppBar size="3" border>
              <Flex css={{ px: '$3' }} justify="between">
                <Heading>Xerox</Heading>
                <IconButton css={{ color: '$gray10' }}>
                  <DotsHorizontalIcon />
                </IconButton>
              </Flex>
            </AppBar>
          </Grid>
        </Box>
      </Section>
    </Section>
  )
}
