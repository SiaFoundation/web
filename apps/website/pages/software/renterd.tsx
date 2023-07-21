/* eslint-disable react/no-unescaped-entities */
import {
  ContentGallery,
  Callout,
  Code,
  SiteHeading,
  webLinks,
  Text,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { CarouselRenterd } from '../../components/CarouselRenterd'
import { routes } from '../../config/routes'
import { getMinutesInSeconds } from '../../lib/time'
import { getFeedContent } from '../../content/feed'
import { AsyncReturnType } from '../../lib/types'
import { getProjects } from '../../content/projects'
import { getStats } from '../../content/stats'
import { getTutorialArticles } from '../../content/articles'
import { textContent } from '../../lib/utils'
import { Terminal } from '../../components/Terminal'
import { SectionGradient } from '../../components/SectionGradient'
import { SectionTransparent } from '../../components/SectionTransparent'
import { useInView } from 'react-intersection-observer'
import { cx } from 'class-variance-authority'
import { getRenterdLatestRelease } from '../../content/releases'
import { DownloadWidgetLarge } from '../../components/DownloadWidgetLarge'
import { backgrounds } from '../../content/imageBackgrounds'
import { previews } from '../../content/imagePreviews'

const title = 'renterd'
const daemon = 'renterd'
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

export default function Renterd({ version, technical, tutorials }: Props) {
  const downloadEl = <DownloadWidgetLarge daemon={daemon} version={version} />
  const { ref: appRef, inView: appInView } = useInView()

  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.software.renterd}
      heading={
        <SectionTransparent className="pt-24 pb-0 md:pt-32 md:pb-0">
          <SiteHeading
            size="64"
            title={title}
            description={description}
            anchorLink={false}
          />
          <div className="block xl:hidden pt-32 pb-4">{downloadEl}</div>
        </SectionTransparent>
      }
      backgroundImage={backgrounds.natePath}
      previewImage={previews.renterd}
    >
      <SectionGradient className="pt-8 xl:pt-6 pb:30">
        <div className="relative">
          <div ref={appRef} className="absolute top-[70%]" />
          <div
            className={cx(
              'relative transition-transform',
              appInView ? 'scale-[1.03]' : ''
            )}
          >
            <div className="hidden xl:block pt-52 pb-2">{downloadEl}</div>
            <CarouselRenterd />
          </div>
        </div>
        <SiteHeading
          size="24"
          className="mt-24 mb-24 md:mb-32"
          title="Manage your storage with a powerful user interface"
          description={
            <>
              Manage your files, contracts, wallet, settings, and more with an
              intuitive interface. The embedded interface can be accessed with
              your web browser.
            </>
          }
        />
      </SectionGradient>
      <SectionTransparent>
        <div className="flex flex-col lg:flex-row gap-x-16 gap-y-0 lg:justify-between lg:items-center w-full overflow-hidden pb-16 pt-6 md:pt-16">
          <SiteHeading
            className="flex-1"
            title="Smart defaults for the everyday user"
            description={
              <>
                <Code>renterd</Code> comes with a built-in "autopilot" that
                handles host selection, contract management, and file repair.
                Want more control? Just disable it with{' '}
                <Code>-autopilot.enabled=false</Code>, and use the renterd HTTP
                API to implement custom maintenance logic in your favorite
                language.
              </>
            }
          />
          <Terminal
            sequences={[
              [
                {
                  command: ['renterd'],
                  result: [
                    'renterd v0.2.0',
                    'Network Mainnet',
                    'api: Listening on 127.0.0.1:9980',
                    'bus: Listening on 127.0.0.1:9981',
                    'autopilot: fetched 273 active contracts, took 3m42.415321208s',
                    'autopilot: looking for 100 candidate hosts',
                    'autopilot: selected 228 candidate hosts out of 20731     {"excluded": 0, "unscanned": 20503}',
                    'autopilot: scored 13 candidate hosts out of 228, took 22.02253025s       {"zeroscore": 0, "unusable": 215}',
                    '...',
                  ],
                },
              ],
              [
                {
                  command: ['renterd -autopilot.enabled=false'],
                  result: [
                    'renterd v0.2.0',
                    'Network Mainnet',
                    'api: Listening on 127.0.0.1:9980',
                    'bus: Listening on 127.0.0.1:9981',
                  ],
                },
              ],
            ]}
          />
        </div>
      </SectionTransparent>
      <SectionGradient>
        <SiteHeading
          title="Modular APIs that give developers more control"
          className="pt-20 md:pt-32"
          description={
            <>
              We've designed a brand-new API for renting that offers both power
              and performance. Form contracts, transfer data, and manage your
              files with clean and consistent JSON-speaking endpoints.{' '}
              <Code>renterd</Code> can even scale horizontally: in{' '}
              <Code>worker</Code> mode, it provides raw access to the Sia
              renter-host protocol, with no UI, no blockchain, and no disk I/O —
              perfect for massive renting operations.
            </>
          }
          links={[
            {
              title: 'View API docs',
              link: webLinks.apiDocs.renterd,
              newTab: true,
            },
          ]}
        />
        <div className="flex flex-row flex-wrap justify-between gap-6 w-full pb-12">
          <div className="flex flex-col gap-2 overflow-hidden">
            <Text className="mt-6">
              <Text weight="bold">Example:</Text> Form a contract with a host.
            </Text>
            <Terminal
              sequences={[
                [
                  {
                    command: [
                      'curl -X POST http://localhost:9980/api/worker/rhp/form --json \\',
                      "'" +
                        JSON.stringify(
                          {
                            hostKey:
                              'ed25519:878d7d27e75691aa8f554ecb4c3e0c371a2a2a3d0901fe77727b6df6c6a11a6a',
                            hostIP: '127.0.0.1:59868',
                            hostCollateral: '191285052982572071957200',
                            renterFunds: '16666666666666666666666666',
                            renterAddress:
                              'addr:861c1574947689c04df41a987b3a6a0a44eef27bb4511f3d64d1531913ca26288a12efc3f227',
                            endHeight: 126,
                          },
                          null,
                          2
                        ) +
                        "'",
                    ],
                    result: ['{ file contract transaction }'],
                  },
                ],
              ]}
            />
          </div>
          <div className="flex flex-col gap-2 overflow-hidden">
            <Text className="mt-6">
              <Text weight="bold">Example:</Text> Upload a file and fetch the
              metadata.
            </Text>
            <Terminal
              sequences={[
                [
                  {
                    command: [
                      'curl -X PUT http://localhost:9980/api/worker/objects/movies/movie.mp4 \\',
                      '--data @movie.mp4',
                    ],
                    result: ['{ file upload successful 200 }'],
                  },
                  {
                    command: [
                      'curl -X GET http://localhost:9980/api/bus/objects/movies/movie.mp4',
                    ],
                    result: [
                      JSON.stringify(
                        {
                          object: {
                            key: 'key:35d3ee7e94f74c671cbb754ce7b2568a740874b2921e370d6444b356752f23e8',
                            slabs: '{ slabs of data }',
                          },
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
        </div>
      </SectionGradient>
      <SectionGradient>
        <SiteHeading
          size="32"
          className="mt-12 md:mt-24 pb-12 md:pb-20"
          title="Tutorials for developers new to Sia"
          description={
            <>Technical tutorials for new developers looking to build on Sia.</>
          }
        />
        <ContentGallery items={tutorials} />
        <SiteHeading
          size="32"
          className="mt-32 md:mt-60"
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
          title="Learn more about renterd"
          className="mt-24 md:mt-40 mb-24 md:mb-48"
          size="2"
          background={backgrounds.nateSnow}
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
      </SectionGradient>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getStats()
  const technical = await getFeedContent(['technical'], 8)
  const tutorials = await getTutorialArticles()
  const release = await getRenterdLatestRelease()
  const services = await getProjects('storage_services', 5)

  const props = {
    technical,
    tutorials,
    services,
    version: release?.tag_name,
    fallback: {
      '/api/stats': stats,
    },
  }

  return {
    props,
    revalidate: getMinutesInSeconds(5),
  }
}
