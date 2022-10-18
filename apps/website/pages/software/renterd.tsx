/* eslint-disable react/no-unescaped-entities */
import {
  Flex,
  ContentGallery,
  Callout,
  Section,
  WavesBackdrop,
  Container,
  Code,
  ContentProject,
  SiteHeading,
  getImageProps,
  webLinks,
  NextLink,
  Text,
  LogoGithub24,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { RenterdUICarousel } from '../../components/RenterdUICarousel'
import { routes } from '../../config/routes'
import { getMinutesInSeconds } from '../../lib/time'
import { getCacheArticles } from '../../content/articles'
import { AsyncReturnType } from '../../lib/types'
import { getCacheSoftware } from '../../content/software'
import { getCacheStats } from '../../content/stats'
import { getCacheTutorials } from '../../content/tutorials'
import backgroundImage from '../../assets/backgrounds/nate-bridge.png'
import previewImage from '../../assets/previews/renterd.png'
import { textContent } from '../../lib/utils'
import { WaveSection } from '../../components/WaveSection'
import { TerminalCommands } from '../../components/TerminalCommands'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const title = 'renterd'
const description = (
  <>
    renterd is a next-generation Sia renter, developed by the Sia Foundation. It
    aims to serve the needs of both everyday users -- who want a simple
    interface for storing and retrieving their personal data -- and developers
    -- who want to a powerful, flexible, and reliable API for building apps on
    Sia.
  </>
)

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Renterd({ technical, tutorials, services }: Props) {
  const downloadEl = (
    <Flex
      direction={{
        '@initial': 'column',
        '@bp2': 'row',
      }}
      align={{
        '@initial': 'start',
        '@bp2': 'center',
      }}
      gap="1"
    >
      <Text weight="bold">
        <NextLink
          href="https://github.com/SiaFoundation/renterd"
          target="_blank"
        >
          <Flex align="center" gap="1">
            <LogoGithub24 />
            Pre-release source code.
          </Flex>
        </NextLink>
      </Text>
      <Text color="subtle">The first official release is coming soon.</Text>
    </Flex>
  )

  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.getStarted.index}
      heading={
        <Section pt="4" pb="0">
          <SiteHeading size="64" title={title} description={description}>
            <Flex direction="column" gap="2" css={{ m: '$12 0 $2' }}>
              {downloadEl}
            </Flex>
          </SiteHeading>
        </Section>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
      contentCss={{ paddingTop: 0 }}
    >
      <WaveSection py="3">
        <Flex
          gap="9"
          direction={{
            '@initial': 'column',
            '@bp3': 'row',
          }}
          css={{ width: '100%', overflow: 'hidden' }}
        >
          <SiteHeading
            css={{ marginTop: '50px', flex: 1 }}
            title="Smart defaults for the everyday user"
            description={
              <>
                Run renterd in <Code>autopilot</Code> mode to automate host
                selection, contract management, and all other details. renterd
                can also be used in manual and <Code>stateless</Code> modes.
              </>
            }
          />
          <TerminalCommands
            css={{
              '@initial': {
                width: '100%',
              },
              '@bp2': {
                width: '500px',
              },
            }}
            sequences={[
              [
                {
                  command: ['renterd --autopilot --ui'],
                  result: [
                    '  Starting renterd in autopilot mode...',
                    '  API now running at localhost:9980...',
                    '  Opening user interface in browser...',
                    '  Selecting hosts and forming contracts...',
                  ],
                },
              ],
              [
                {
                  command: ['renterd --stateless'],
                  result: [
                    '  Starting renterd in stateless mode...',
                    '  API now running at localhost:9980...',
                  ],
                },
              ],
            ]}
          />
        </Flex>
      </WaveSection>
      <Section py="4">
        <SiteHeading
          title="Modular APIs that give developers more control"
          description={
            <>
              renterd includes modular APIs that allow developers to tune renter
              behaviours and build customized data storage integrations.
              renterd's <Code>stateless</Code> mode is another great way for
              developers to scale nodes horizontally.
            </>
          }
        >
          <Flex
            direction={{
              '@initial': 'column',
              '@bp2': 'row',
            }}
            gap="3"
            css={{ width: '100%' }}
          >
            <Flex
              direction="column"
              gap="1"
              css={{ flex: 1, overflow: 'hidden' }}
            >
              <Text css={{ marginTop: '$3' }}>
                <Text weight="bold">Example:</Text> Build a contract formation
                transaction.
              </Text>
              <TerminalCommands
                css={{
                  '@bp3': {
                    width: '500px',
                  },
                }}
                sequences={[
                  [
                    {
                      command: [
                        'curl -X POST http://localhost:9980/api/rhp/prepare/form \\',
                        JSON.stringify({ contract: 'new' }, null, 2),
                      ],
                      result: [
                        JSON.stringify({ contract: 'prepared' }, null, 2),
                      ],
                    },
                    {
                      command: [
                        'curl -X POST http://localhost:9980/api/wallet/fund \\',
                        JSON.stringify(
                          { transaction: { contract: 'prepared' } },
                          null,
                          2
                        ),
                      ],
                      result: [
                        JSON.stringify(
                          {
                            transaction: { contract: 'prepared' },
                            status: 'funded',
                          },
                          null,
                          2
                        ),
                      ],
                    },
                    {
                      command: [
                        'curl -X POST http://localhost:9980/api/wallet/sign \\',
                        JSON.stringify(
                          {
                            transaction: { contract: 'prepared' },
                            status: 'funded',
                          },
                          null,
                          2
                        ),
                      ],
                      result: [
                        JSON.stringify(
                          {
                            transaction: { contract: 'prepared' },
                            status: 'signed',
                          },
                          null,
                          2
                        ),
                      ],
                    },
                    {
                      command: [
                        'curl -X POST http://localhost:9980/api/rhp/form \\',
                        JSON.stringify(
                          {
                            transaction: { contract: 'prepared' },
                            status: 'signed',
                          },
                          null,
                          2
                        ),
                      ],
                      result: [
                        JSON.stringify(
                          {
                            status: '200',
                            message:
                              'Host will finalize and broadcast transaction.',
                          },
                          null,
                          2
                        ),
                      ],
                    },
                  ],
                ]}
              />
            </Flex>
            <Flex
              direction="column"
              gap="1"
              css={{ flex: 1, overflow: 'hidden' }}
            >
              <Text css={{ marginTop: '$3' }}>
                <Text weight="bold">Example:</Text> Migrate data to a specific
                contract.
              </Text>
              <TerminalCommands
                css={{
                  '@bp3': {
                    width: '500px',
                  },
                }}
                sequences={[
                  [
                    {
                      command: [
                        'http http://localhost:9980/api/slabs/migrate \\',
                        '    slabs:=@files/slabs.json \\    # data slabs to be moved',
                        '    from:=@files/contract1.json \\ # originating contract',
                        '    to:=@files/contract2.json \\   # destination contract',
                        '    currentHeight:=383331         # current block height',
                      ],
                      result: [
                        JSON.stringify(
                          {
                            status: '200',
                            message: 'Data migration initiated.',
                          },
                          null,
                          2
                        ),
                      ],
                    },
                  ],
                ]}
              />
            </Flex>
          </Flex>
        </SiteHeading>
      </Section>
      <WaveSection pt="4">
        <SiteHeading
          title="Manage everything with a powerful user interface"
          description={
            <>
              Manage your files, contracts, hosts, and blockchain node with an
              intuitive interface. The embedded interface can be accessed with
              your web browser.
            </>
          }
        >
          <RenterdUICarousel />
        </SiteHeading>
      </WaveSection>
      <Section
        py="4"
        width="flush"
        css={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: '$loContrast',
        }}
      >
        {/* <WavesBackdrop /> */}
        <Container>
          <Flex gap="6" justify="between" wrap="wrap">
            <SiteHeading
              css={{
                '@bp2': {
                  mt: '$12',
                },
              }}
              title="Download renterd"
              // description={
              //   <>
              //     <Code>renterd</Code> is currently Alpha software.
              //   </>
              // }
            >
              <Flex css={{ m: '$5 0' }}>{downloadEl}</Flex>
            </SiteHeading>
            <Callout
              css={{ maxWidth: '500px' }}
              title="Learn more about renterd"
              description={
                <>
                  Join the Sia Discord to chat with the team and community about
                  renterd development, features, use-cases, bugs, and more.
                </>
              }
              actionTitle="Join the Discord"
              actionLink={webLinks.discord}
            />
          </Flex>
        </Container>
      </Section>
      <Section
        width="flush"
        css={{
          position: 'relative',
          zIndex: 1,
          borderTop: '$sizes$frame solid $slate2',
          borderBottom: '$sizes$frame solid $slate2',
        }}
      >
        <WavesBackdrop />
        <Section py="4">
          <SiteHeading
            size="32"
            title="Tutorials for developers new to Sia"
            description={
              <>
                Technical tutorials for new developers looking to build on Sia.
              </>
            }
          />
          <ContentGallery items={tutorials} />
        </Section>
      </Section>
      <Section pt="4" pb="3">
        <SiteHeading
          size="32"
          title="Learn about the technology behind Sia"
          description={
            <>
              Technical deep-dives from the core team and the ecosystem of
              developers building technology on top of Sia.
            </>
          }
        />
        <ContentGallery columns="1" items={technical} />
      </Section>
      <Section py="3">
        <SiteHeading
          size="32"
          title="Companies and projects building on Sia"
          description={
            <>
              Sia is a thriving ecosystem of open source software, layer 2
              networks, and commercial data storage platforms.
            </>
          }
          links={[
            {
              title: 'Learn about the ecosystem',
              link: routes.community.index,
            },
          ]}
        />
        <ContentGallery
          component={ContentProject}
          columns={{
            '@initial': 1,
            '@bp2': 2,
            '@bp4': 3,
          }}
          items={services}
        />
      </Section>
      <Section py="3">
        <Callout
          title="Sia 101"
          size="2"
          description={
            <>
              Learn how the Sia protocol works to power redundant,
              decentralized, data storage.
            </>
          }
          actionTitle="Learn more"
          actionLink={routes.learn.index}
        />
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getCacheStats()
  const technical = await getCacheArticles(['technical'], 8)
  const tutorials = await getCacheTutorials()
  const services = await getCacheSoftware('storage_services', 5)

  const props = {
    technical,
    tutorials,
    services,
    fallback: {
      '/api/stats': stats,
    },
  }

  return {
    props,
    revalidate: getMinutesInSeconds(5),
  }
}
