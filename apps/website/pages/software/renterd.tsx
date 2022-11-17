/* eslint-disable react/no-unescaped-entities */
import {
  ContentGallery,
  Callout,
  Code,
  ContentProject,
  SiteHeading,
  getImageProps,
  webLinks,
  Link,
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
    <div className="flex flex-row flex-wrap items-center gap-x-2 gap-y-3">
      <Link
        weight="bold"
        href="https://github.com/SiaFoundation/renterd"
        target="_blank"
      >
        <div className="flex items-center gap-2">
          <LogoGithub24 />
          Pre-release source code.
        </div>
      </Link>
      <Text color="subtle">The first official release is coming soon.</Text>
    </div>
  )

  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.getStarted.index}
      heading={
        <SectionSimple className="pt-24 pb-0 md:pt-32 md:pb-0">
          <SiteHeading size="64" title={title} description={description} />
          <div className="block xl:hidden pt-32 pb-4">{downloadEl}</div>
        </SectionSimple>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <SectionGradient className="pt-6 xl:pt-6 pb:30">
        <div className="hidden xl:block pt-52">{downloadEl}</div>
        <RenterdUICarousel />
        <SiteHeading
          size="24"
          className="mt-16 mb-24"
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
      <SectionWaves className="py-16">
        <div className="flex flex-col lg:flex-row gap-x-16 gap-y-0 lg:justify-between lg:items-center w-full overflow-hidden">
          <SiteHeading
            className="flex-1"
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
        </div>
      </SectionWaves>
      <SectionGradient className="pt-32">
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
        />
        <div className="flex flex-row flex-wrap justify-between gap-6 w-full pb-12">
          <div className="flex flex-col gap-2 overflow-hidden">
            <Text className="mt-6">
              <Text weight="bold">Example:</Text> Build a contract formation
              transaction.
            </Text>
            <Terminal
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
          </div>
          <div className="flex flex-col gap-2 overflow-hidden">
            <Text className="mt-6">
              <Text weight="bold">Example:</Text> Upload a file.
            </Text>
            <Terminal
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
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-30 items-center justify-between mt-20 md:mt-40">
          <SiteHeading title="Download renterd">
            <div className="mt-2">{downloadEl}</div>
          </SiteHeading>
          <Callout
            className="w-full md:max-w-lg h-[500px]"
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
        </div>
        <SiteHeading
          size="32"
          className="mt-40 mb-10"
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
          items={services}
          className="mb-24"
        />
      </SectionGradient>
      <SectionGradient>
        <SiteHeading
          size="32"
          className="mt-24 mb-10"
          title="Tutorials for developers new to Sia"
          description={
            <>Technical tutorials for new developers looking to build on Sia.</>
          }
        />
        <ContentGallery items={tutorials} />
        <SiteHeading
          size="32"
          className="mt-60"
          title="Learn about the technology behind Sia"
          description={
            <>
              Technical deep-dives from the core team and the ecosystem of
              developers building technology on top of Sia.
            </>
          }
        />
        <ContentGallery columnClassName="grid-cols-1" items={technical} />
        <Callout
          className="mt-40 mb-40"
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
