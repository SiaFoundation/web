import {
  NavbarApp,
  NavbarSite,
  Box,
  Flex,
  Grid,
  NextImage,
  Panel,
  ScrollArea,
  Section,
  Separator,
  UserDropdownMenu,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'
import bellLabs from '../assets/bell-labs.jpeg'

export function Layout() {
  return (
    <>
      <Section size="1">
        <SectionHeading hideSeparator>Layout</SectionHeading>
      </Section>
      <Section>
        <SubsectionHeading>Flex</SubsectionHeading>
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
              <Separator orientation="vertical" size="95" />
            </Flex>
            <Box fill css={{ height: '50px', width: '50px' }} />
            <Flex align="center">
              <Separator orientation="vertical" size="100" />
            </Flex>
            <Box fill css={{ height: '50px', width: '50px' }} />
          </Flex>
          <Flex direction="column" gap="3" css={{ width: '50px' }}>
            <Flex justify="center">
              <Separator orientation="horizontal" size="1" />
            </Flex>
            <Box fill css={{ height: '50px', width: '50px' }} />
            <Flex justify="center">
              <Separator orientation="horizontal" size="95" />
            </Flex>
            <Box fill css={{ height: '50px', width: '50px' }} />
            <Flex justify="center">
              <Separator orientation="horizontal" size="100" />
            </Flex>
            <Box fill css={{ height: '50px', width: '50px' }} />
          </Flex>
        </Grid>
      </Section>
      <Section>
        <SubsectionHeading>Panel</SubsectionHeading>
        <Grid
          columns={{
            '@initial': 1,
            '@bp2': 3,
          }}
          gap="4"
        >
          <Panel
            radius="0"
            css={{
              width: '100%',
              height: '100px',
            }}
          ></Panel>
          <Panel
            radius="1"
            css={{
              width: '100%',
              height: '100px',
            }}
          ></Panel>
          <Panel
            radius="2"
            css={{
              width: '100%',
              height: '100px',
            }}
          ></Panel>
          <Panel
            radius="3"
            css={{
              width: '100%',
              height: '100px',
            }}
          ></Panel>
        </Grid>
      </Section>
      <Section>
        <SubsectionHeading>Navbar</SubsectionHeading>
        <Box
          css={{
            position: 'relative',
            backgroundColor: '$slate5',
            overflow: 'hidden',
            borderRadius: '$2',
          }}
        >
          <Box
            css={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <NextImage
              src={bellLabs.src}
              blurDataURL={bellLabs.blurDataURL}
              layout="fill"
              alt="bell labs"
            />
          </Box>
          <Grid
            columns={1}
            gap="2"
            css={{
              padding: '$2',
            }}
          >
            <NavbarApp appName="Xerox" homeHref={'#'}>
              <UserDropdownMenu />
            </NavbarApp>
            <NavbarSite appName="Xerox" homeHref={'#'}>
              <UserDropdownMenu />
            </NavbarSite>
          </Grid>
        </Box>
      </Section>
    </>
  )
}
