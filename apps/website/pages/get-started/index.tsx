/* eslint-disable react/no-unescaped-entities */
import {
  Flex,
  Grid,
  ContentGallery,
  Callout,
  Code,
  Links,
  ContentProject,
  SiteHeading,
  getImageProps,
  Paragraph,
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Codeblock,
  Link,
  webLinks,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getMinutesInSeconds } from '../../lib/time'
import { getCacheArticles } from '../../content/articles'
import { AsyncReturnType } from '../../lib/types'
import { getCacheSoftware } from '../../content/software'
import { getCacheStats } from '../../content/stats'
import { getCacheTutorials } from '../../content/tutorials'
import { getCacheVersions } from '../../content/versions'
import { SoftwareSection } from '../../components/SoftwareSection'
import backgroundImage from '../../assets/backgrounds/leaves.png'
import previewImage from '../../assets/previews/leaves.png'
import { SectionWaves } from '../../components/SectionWaves'
import { SectionGradient } from '../../components/SectionGradient'
import { SectionSimple } from '../../components/SectionSimple'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const docLinks = [
  {
    title: 'API Reference',
    link: webLinks.apiDocs,
    newTab: true,
  },
  {
    title: 'Read the docs',
    link: webLinks.docs.index,
    newTab: true,
  },
]

const title = 'Get Started'
const description =
  'Software downloads, tutorials, technical walkthroughs, and more.'

type Props = AsyncReturnType<typeof getStaticProps>['props']

function GetStarted({ technical, versions, tutorials, services }: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.getStarted.index}
      heading={
        <SectionSimple css={{ py: '$max' }}>
          <SiteHeading size="64" title={title} description={description} />
        </SectionSimple>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <SectionWaves
        css={{
          pt: '$9',
          pb: '$12',
        }}
      >
        <Flex direction="column" gap="5">
          <SiteHeading size="32" title="Core Software">
            <Accordion type="single">
              <AccordionItem value="steps" variant="ghost">
                <AccordionTrigger variant="ghost">
                  <Flex direction="column">
                    <Paragraph size="14">
                      As a reminder, all release binaries are signed. You can
                      download the signing key{' '}
                      <Link
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        target="_blank"
                        href={`${webLinks.website}/releases/sia-signing-key.asc`}
                      >
                        here
                      </Link>
                      , and the signed hashes for the current release{' '}
                      <Link
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        target="_blank"
                        href={`${webLinks.website}/releases/siad/Sia-v${versions.sia.latest}-SHA256SUMS.txt.asc`}
                      >
                        here
                      </Link>
                      .
                    </Paragraph>
                    <Paragraph size="14">
                      <Link>
                        Click here to learn how to verify your release.
                      </Link>
                    </Paragraph>
                  </Flex>
                </AccordionTrigger>
                <AccordionContent css={{ margin: '$3 0' }}>
                  <Paragraph size="14">
                    1. Download and import the Sia signing key.
                  </Paragraph>
                  <Codeblock>
                    {`wget -c ${webLinks.website}/releases/sia-signing-key.asc
gpg --import sia-signing-key.asc`}
                  </Codeblock>

                  <Paragraph size="14">
                    2. Download the signed hash file, and verify the signature.
                  </Paragraph>
                  <Codeblock>
                    {`wget -c ${webLinks.website}/releases/siad/Sia-v${versions.sia.latest}-SHA256SUMS.txt.asc
gpg --verify Sia-v${versions.sia.latest}-SHA256SUMS.txt.asc`}
                  </Codeblock>

                  <Paragraph size="14">
                    3. If you downloaded a zip file, unzip that first.
                  </Paragraph>
                  <Codeblock>
                    unzip Sia-v{versions.sia.latest}-linux-amd64.zip
                  </Codeblock>

                  <Paragraph size="14">
                    4. Check that the files you downloaded were signed.
                  </Paragraph>
                  <Codeblock>
                    sha256sum --check --ignore-missing Sia-v
                    {versions.sia.latest}-SHA256SUMS.txt.asc
                  </Codeblock>

                  <Paragraph size="14">
                    You should see "OK" next to the files you did download and
                    errors for the files you have not downloaded.
                  </Paragraph>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SiteHeading>
          <Flex direction="column" gap="9">
            <Grid
              columns={{
                '@initial': '1',
                '@bp2': '2',
              }}
              gap="5"
              gapY="8"
            >
              <SoftwareSection
                title="Sia UI"
                description={
                  <>
                    Built for users who prefer to work with a graphical user
                    interface.
                  </>
                }
                version={versions.sia.latest}
                links={[
                  {
                    title: 'Windows',
                    link: `${webLinks.website}/releases/Sia-UI-v${versions.sia.latest}.exe`,
                    newTab: true,
                  },
                  {
                    title: 'MacOS',
                    link: `${webLinks.website}/releases/Sia-UI-v${versions.sia.latest}.dmg`,
                    newTab: true,
                  },
                  {
                    title: 'Linux',
                    link: `${webLinks.website}/releases/Sia-UI-v${versions.sia.latest}.AppImage`,
                    newTab: true,
                  },
                ]}
              />
              <SoftwareSection
                title="Sia Daemon"
                description={
                  <>
                    Built for technical users comfortable with command line
                    interfaces.
                  </>
                }
                version={versions.sia.latest}
                links={[
                  {
                    title: 'Windows',
                    link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.latest}-windows-amd64.zip`,
                    newTab: true,
                  },
                  {
                    title: 'MacOS',
                    link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.latest}-darwin-amd64.zip`,
                    newTab: true,
                  },
                  {
                    title: 'Linux',
                    link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.latest}-linux-amd64.zip`,
                    newTab: true,
                  },
                  {
                    title: 'Raspberry Pi',
                    link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.latest}-linux-arm64.zip`,
                    newTab: true,
                  },
                  {
                    title: 'Docker',
                    link: 'https://github.com/SiaFoundation/siad/pkgs/container/siad',
                    newTab: true,
                  },
                ]}
              />
              <SoftwareSection
                title="Embarcadero"
                description={
                  <>A tool for conducting escrowless SF{'<->'}SC swaps.</>
                }
                version={versions.embarcadero.latest}
                links={[
                  {
                    title: 'Linux AMD',
                    link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${versions.embarcadero.latest}/embarcadero_v${versions.embarcadero.latest}_linux_amd64.zip`,
                    newTab: true,
                  },
                  {
                    title: 'Linux ARM',
                    link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${versions.embarcadero.latest}/embarcadero_v${versions.embarcadero.latest}_linux_arm64.zip`,
                    newTab: true,
                  },
                  {
                    title: 'MacOS AMD',
                    link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${versions.embarcadero.latest}/embarcadero_v${versions.embarcadero.latest}_darwin_amd64.zip`,
                    newTab: true,
                  },
                  {
                    title: 'MacOS ARM',
                    link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${versions.embarcadero.latest}/embarcadero_v${versions.embarcadero.latest}_darwin_arm64.zip`,
                    newTab: true,
                  },
                  {
                    title: 'Windows AMD',
                    link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${versions.embarcadero.latest}/embarcadero_v${versions.embarcadero.latest}_windows_amd64.zip`,
                    newTab: true,
                  },
                  {
                    title: 'Windows ARM',
                    link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${versions.embarcadero.latest}/embarcadero_v${versions.embarcadero.latest}_windows_arm64.zip`,
                    newTab: true,
                  },
                ]}
              />
            </Grid>
            <Flex direction="column" gap="5">
              <SiteHeading
                size="20"
                title="Documentation"
                description={
                  <>
                    Read our documentation to learn how Sia works or visit the
                    API reference to learn about specific <Code>siad</Code>{' '}
                    parameters and endpoints.
                  </>
                }
              />
              <Links links={docLinks} size="3" />
            </Flex>
          </Flex>
        </Flex>
      </SectionWaves>
      <SectionGradient css={{ py: '$12' }}>
        <SiteHeading
          size="32"
          title="Tutorials for developers new to Sia"
          description={
            <>Technical tutorials for new developers looking to build on Sia.</>
          }
        />
        <ContentGallery items={tutorials} />
        <SiteHeading
          size="32"
          css={{ mt: '$9' }}
          title="Learn about the technology behind Sia"
          description={
            <>
              Technical deep-dives from the core team and the ecosystem of
              developers building technology on top of Sia.
            </>
          }
        />
        <ContentGallery columns="1" items={technical} />
        <SiteHeading
          size="32"
          css={{ mt: '$9' }}
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
        <Callout
          title="Sia 101"
          css={{ my: '$9' }}
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
  const versions = await getCacheVersions()
  const tutorials = await getCacheTutorials()
  const services = await getCacheSoftware('storage_services', 5)

  const props = {
    technical,
    versions,
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

export default GetStarted
