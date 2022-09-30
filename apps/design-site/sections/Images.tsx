import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Grid,
  NextImage,
  Section,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'
import bellLabs from '../assets/bell-labs.jpeg'
import macTeam from '../assets/mac-team.png'
import avatar1 from '../assets/avatar1.png'
import avatar2 from '../assets/avatar2.png'
import avatar3 from '../assets/avatar3.png'

export function Images() {
  return (
    <>
      <Section py="1">
        <SectionHeading>Images</SectionHeading>
      </Section>
      <Section>
        <SubsectionHeading>Image</SubsectionHeading>
        <Grid
          columns={{
            '@initial': '1',
            '@bp2': '2',
          }}
          gap="2"
        >
          <Box>
            <Box css={{ position: 'relative ' }}>
              <NextImage {...bellLabs} alt="bell labs" />
              <Button
                size="1"
                variant="transparentWhite"
                css={{
                  position: 'absolute',
                  bottom: '$1',
                  right: '$1',
                }}
              >
                Bell Labs
              </Button>
            </Box>
          </Box>
          <Box>
            <Box css={{ position: 'relative ' }}>
              <NextImage {...macTeam} alt="mac team" radius="3" />
              <Button
                variant="transparentWhite"
                css={{
                  position: 'absolute',
                  bottom: '$1',
                  right: '$1',
                }}
              >
                Apple
              </Button>
            </Box>
          </Box>
        </Grid>
      </Section>
      <Section>
        <SubsectionHeading>NextImage - responsive</SubsectionHeading>
        <Flex gap="2" justify="start">
          <Box
            css={{
              position: 'relative',
              height: '250px',
              width: '250px',
            }}
            debug
          >
            <Box
              css={{
                position: 'relative',
              }}
              debug
            >
              <NextImage {...bellLabs} alt="bell labs" layout="responsive" />
              <Button
                size="1"
                variant="transparentWhite"
                css={{
                  position: 'absolute',
                  bottom: '$1',
                  right: '$1',
                }}
              >
                Bell Labs
              </Button>
            </Box>
          </Box>
          <Box
            css={{
              position: 'relative',
              height: '350px',
              width: '250px',
            }}
            debug
          >
            <Box
              css={{
                position: 'relative',
              }}
              debug
            >
              <NextImage {...macTeam} alt="mac team" layout="responsive" />
              <Button
                size="1"
                variant="transparentWhite"
                css={{
                  position: 'absolute',
                  bottom: '$1',
                  right: '$1',
                }}
              >
                Apple
              </Button>
            </Box>
          </Box>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>NextImage - fill & cover</SubsectionHeading>
        <Flex gap="2" justify="start">
          <Box
            css={{
              position: 'relative',
              height: '250px',
              width: '250px',
            }}
            debug
          >
            <NextImage
              src={bellLabs.src}
              blurDataURL={bellLabs.blurDataURL}
              alt="bell labs"
              layout="fill"
              objectFit="cover"
            />
            <Button
              size="1"
              variant="transparentWhite"
              css={{
                position: 'absolute',
                bottom: '$1',
                right: '$1',
              }}
            >
              Bell Labs
            </Button>
          </Box>
          <Box
            css={{
              position: 'relative',
              height: '350px',
              width: '250px',
            }}
            debug
          >
            <NextImage
              src={macTeam.src}
              blurDataURL={macTeam.blurDataURL}
              alt="mac team"
              layout="fill"
              objectFit="cover"
            />
            <Button
              variant="transparentWhite"
              css={{
                position: 'absolute',
                bottom: '$1',
                right: '$1',
              }}
            >
              Apple
            </Button>
          </Box>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Avatar</SubsectionHeading>
        <Grid columns={{ '@initial': 1, '@bp2': 2 }} justify="start" gap="3">
          <Flex gap="2" align="center" justify="start">
            <Avatar size="1" src={avatar1.src} interactive />
            <Avatar size="2" src={avatar2.src} interactive />
            <Avatar size="3" src={avatar3.src} interactive />
          </Flex>
          <Flex gap="2" align="center" justify="start">
            <Avatar size="1" fallback="RH" interactive />
            <Avatar size="2" fallback="RH" interactive />
            <Avatar size="3" fallback="RH" interactive />
          </Flex>
          <Flex gap="2" align="center" justify="start">
            <Avatar shape="square" size="1" src={avatar1.src} />
            <Avatar shape="square" size="2" src={avatar2.src} />
            <Avatar shape="square" size="3" src={avatar3.src} />
          </Flex>
        </Grid>
      </Section>
      <Section>
        <SubsectionHeading>AvatarGroup</SubsectionHeading>
        <Grid columns={{ '@initial': 1, '@bp2': 2 }} justify="start" gap="3">
          <Flex gap="2" align="center" justify="start">
            <AvatarGroup>
              <Avatar size="2" status="green" src={avatar1.src} interactive />
              <Avatar size="2" status="green" src={avatar2.src} interactive />
              <Avatar size="2" status="green" src={avatar3.src} inactive />
              <Avatar size="2" status="yellow" src={avatar3.src} interactive />
              <Avatar
                size="2"
                status="yellow"
                alt="A"
                fallback="A"
                interactive
              />
            </AvatarGroup>
          </Flex>
          <Flex gap="2" align="center" justify="start">
            <AvatarGroup>
              <Avatar
                shape="square"
                size="2"
                status="green"
                src={avatar1.src}
                interactive
              />
              <Avatar
                shape="square"
                size="2"
                status="green"
                src={avatar2.src}
                interactive
              />
              <Avatar
                shape="square"
                size="2"
                status="green"
                src={avatar3.src}
                inactive
              />
              <Avatar
                shape="square"
                size="2"
                status="yellow"
                src={avatar3.src}
                interactive
              />
              <Avatar
                shape="square"
                size="2"
                status="yellow"
                alt="A"
                fallback="A"
              />
            </AvatarGroup>
          </Flex>
        </Grid>
      </Section>
    </>
  )
}
