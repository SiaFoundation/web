/* eslint-disable react/no-unescaped-entities */
import {
  Flex,
  ContentGallery,
  Callout,
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
import backgroundImage from '../../assets/backgrounds/nate-path.png'
import previewImage from '../../assets/previews/renterd.png'
import { textContent } from '../../lib/utils'
import { Terminal } from '../../components/Terminal'
import { SectionGradient } from '../../components/SectionGradient'
import { SectionWaves } from '../../components/SectionWaves'
import { SectionSimple } from '../../components/SectionSimple'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const title = 'renterd'
const description = (
  <>
    <Code>renterd</Code> is a next-generation Sia renter, developed by the Sia
    Foundation. It aims to serve the needs of both everyday users — who want a
    simple interface for storing and retrieving their personal data — and
    developers — who want a powerful, flexible, and reliable API for building
    apps on Sia.
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
        <SectionSimple
          css={{
            pt: '$max',
            pb: '$3',
            '@bp2': {
              pb: 0,
            },
          }}
        >
          <SiteHeading size="64" title={title} description={description}>
            <Flex direction="column" gap="2" css={{ pt: '200px' }}>
              {downloadEl}
            </Flex>
          </SiteHeading>
        </SectionSimple>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <SectionGradient
        css={{
          pt: '$3',
          '@bp2': {
            pt: '$1',
          },
          pb: '$12',
        }}
      >
        <RenterdUICarousel />
        <SiteHeading
          size="24"
          eyebrow="Coming soon"
          title="Manage your storage with a powerful user interface"
          description={
            <>
              Manage your files, contracts, hosts, and blockchain node with an
              intuitive interface. The embedded interface can be accessed with
              your web browser.
            </>
          }
        />
      </SectionGradient>
      <SectionWaves css={{ py: '$12' }}>
        <Flex
          gap="9"
          direction={{
            '@initial': 'column',
            '@bp3': 'row',
          }}
          css={{ width: '100%', overflow: 'hidden' }}
        >
          <SiteHeading
            css={{ marginTop: '30px', flex: 1 }}
            title="Smart defaults for the everyday user"
            description={
              <>
                <Code>renterd</Code> comes with a built-in "autopilot" that
                handles host selection, contract management, and file repair.
                Want more control? Just disable it with{' '}
                <Code>--autopilot=false</Code>, and use the renterd HTTP API to
                implement custom maintenance logic in your favorite language.
              </>
            }
          />
          <Terminal
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
                  command: ['renterd'],
                  result: [
                    'renterd v0.1.0',
                    'Starting renterd in autopilot mode...',
                    'p2p: Listening on 127.0.0.1:56700',
                    'api: Listening on 127.0.0.1:9980',
                  ],
                },
              ],
              [
                {
                  command: ['renterd --autopilot=false'],
                  result: [
                    'renterd v0.1.0',
                    'Starting renterd in manual mode...',
                    'p2p: Listening on 127.0.0.1:56700',
                    'api: Listening on 127.0.0.1:9980',
                  ],
                },
              ],
              [
                {
                  command: ['renterd --stateless'],
                  result: [
                    'renterd v0.1.0',
                    'Starting renterd in stateless mode...',
                    'api: Listening on 127.0.0.1:9980',
                  ],
                },
              ],
            ]}
          />
        </Flex>
      </SectionWaves>
      <SectionGradient
        css={{
          pt: '$15',
          pb: '$12',
          background:
            'linear-gradient(177deg, $colors$loContrast 5%, $colors$slate2 25%, $colors$loContrast 45%)',
        }}
      >
        <SiteHeading
          title="Modular APIs that give developers more control"
          description={
            <>
              We've designed a brand-new API for renting that offers both power
              and performance. Form contracts, transfer data, and manage your
              files with clean and consistent JSON-speaking endpoints.{' '}
              <Code>renterd</Code> can even scale horizontally: in{' '}
              <Code>--stateless</Code> mode, it provides raw access to the Sia
              renter-host protocol, with no UI, no blockchain, and no disk I/O —
              perfect for massive renting operations.
            </>
          }
        >
          <Flex
            direction={{
              '@initial': 'column',
              '@bp2': 'row',
            }}
            gap="3"
            css={{ width: '100%', pb: '$6' }}
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
              <Terminal
                css={{
                  '@bp3': {
                    width: '500px',
                  },
                }}
                sequences={[
                  [
                    {
                      command: [
                        'curl -X POST http://localhost:9980/api/wallet/prepare/form --json \\',
                        "'" +
                          JSON.stringify(
                            {
                              hostKey:
                                'ed25519:15433dcd697167a6b40f2434aaf462badc9b9cbc5894726644d3221a6a196c2f',
                              renterFunds: '1000000000000000',
                              endHeight: '400000',
                            },
                            null,
                            2
                          ) +
                          "'",
                      ],
                      result: ['[{ file contract transaction }]'],
                    },
                    {
                      command: [
                        'curl -X POST http://localhost:9980/api/wallet/sign --json \\',
                        "'{ file contract transaction }'",
                      ],
                      result: ['{ signed transaction }'],
                    },
                    {
                      command: [
                        'curl -X POST http://localhost:9980/api/rhp/form --json \\',
                        "'" +
                          `{
  "hostKey": "ed25519:15433dcd697167a6b40f2434aaf462badc9b9cbc5894726644d3221a6a196c2f",
  "hostIP": "161.88.0.733:9982",
  "transactionSet": [{ signed transaction }]
}'`,
                      ],
                      result: [
                        JSON.stringify(
                          {
                            contractID:
                              'f68272bad8ae85a075158e8065ce67823a311be4416c02ad993cc29777a6694a',
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
                <Text weight="bold">Example:</Text> Upload a file.
              </Text>
              <Terminal
                css={{
                  '@bp3': {
                    width: '500px',
                  },
                }}
                sequences={[
                  [
                    {
                      command: [
                        'curl http://localhost:9980/api/slabs/upload \\',
                        `  -F meta='{
  "minShards": 3,
  "totalShards": 10,
  "contracts": [ file contracts ]
}' \\`,
                        '-F data=@movie.mp4',
                      ],
                      result: [
                        JSON.stringify(
                          [
                            {
                              key: 'key:35d3ee7e94f74c671cbb754ce7b2568a740874b2921e370d6444b356752f23e8',
                              minShards: 3,
                              shards: [
                                {
                                  host: 'ed25519:15433dcd697167a6b40f2434aaf462badc9b9cbc5894726644d3221a6a196c2f',
                                  root: 'a0e70901fb4753db933a27b5cc9dd77c5dcbf55b879ece34555a3928d4178b83',
                                },
                              ],
                            },
                          ],
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
        <Flex
          gapX="6"
          gapY="15"
          justify="between"
          wrap="wrap"
          css={{ '@bp1': { mt: '$12' } }}
        >
          <SiteHeading
            css={{
              '@bp2': {
                mt: '$12',
              },
            }}
            title="Download renterd"
          >
            <Flex css={{ m: '$5 0' }}>{downloadEl}</Flex>
          </SiteHeading>
          <Callout
            css={{ maxWidth: '500px' }}
            title="Learn more about renterd"
            description={
              <>
                Join the Sia Discord to chat with the team and community about{' '}
                <Code>renterd</Code> development, features, use-cases, bugs, and
                more.
              </>
            }
            actionTitle="Join the Discord"
            actionLink={webLinks.discord}
          />
        </Flex>
        <SiteHeading
          size="32"
          css={{ mt: '$max' }}
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
      </SectionGradient>
      <SectionGradient>
        <SiteHeading
          size="32"
          css={{ mt: '$12' }}
          title="Tutorials for developers new to Sia"
          description={
            <>Technical tutorials for new developers looking to build on Sia.</>
          }
        />
        <ContentGallery items={tutorials} />
        <SiteHeading
          size="32"
          css={{ mt: '$12' }}
          title="Learn about the technology behind Sia"
          description={
            <>
              Technical deep-dives from the core team and the ecosystem of
              developers building technology on top of Sia.
            </>
          }
        />
        <ContentGallery columns="1" items={technical} />
        <Callout
          css={{ mt: '$12', mb: '$max' }}
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
      </SectionGradient>
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
