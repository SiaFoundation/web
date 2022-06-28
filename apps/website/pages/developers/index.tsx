/* eslint-disable react/no-unescaped-entities */
import { getSiaVersion } from '@siafoundation/env'
import {
  Flex,
  Grid,
  ContentGallery,
  Callout,
  Section,
  WavesBackdrop,
  Container,
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
import { sitemap } from '../../config/site'
import { getDaysInSeconds } from '../../lib/time'
import { getArticles } from '../../content/articles'
import { AsyncReturnType } from '../../lib/types'
import { getSoftware } from '../../content/software'
import { getStats } from '../../content/stats'
import { SoftwareSection } from '../../components/SoftwareSection'
import backgroundImage from '../../assets/backgrounds/waterfall.png'
import previewImage from '../../assets/previews/waterfall.png'
import { getTutorials } from '../../content/tutorials'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const siaVersion = getSiaVersion()

const tutorials = getTutorials()
const services = getSoftware('storage_services', 4)

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

const title = 'Developer Resources'
const description =
  'Software downloads, tutorials, technical walkthroughs, and more.'

type Props = AsyncReturnType<typeof getStaticProps>['props']

function Developers({ technical, stats }: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={sitemap.developers.index}
      heading={
        <Section size="4">
          <SiteHeading size="64" title={title} description={description} />
        </Section>
      }
      stats={stats}
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <Section
        size="3"
        width="flush"
        css={{ position: 'relative', marginBottom: '$6' }}
      >
        <WavesBackdrop />
        <Container>
          <Flex direction="column" gap="5">
            <SiteHeading
              size="32"
              title="Core Software"
              description={
                <>
                  <Accordion type="single">
                    <AccordionItem value="steps" variant="ghost">
                      <AccordionTrigger variant="ghost">
                        <Flex direction="column">
                          <Paragraph size="14">
                            As a reminder, all release binaries are signed. You
                            can download the signing key{' '}
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
                              href={`${webLinks.website}/releases/siad/Sia-v${siaVersion.current}-SHA256SUMS.txt.asc`}
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
                          2. Download the signed hash file, and verify the
                          signature.
                        </Paragraph>
                        <Codeblock>
                          {`wget -c ${webLinks.website}/releases/siad/Sia-v${siaVersion.current}-SHA256SUMS.txt.asc
gpg --verify Sia-v${siaVersion.current}-SHA256SUMS.txt.asc`}
                        </Codeblock>

                        <Paragraph size="14">
                          3. If you downloaded a zip file, unzip that first.
                        </Paragraph>
                        <Codeblock>
                          unzip Sia-v{siaVersion.current}-linux-amd64.zip
                        </Codeblock>

                        <Paragraph size="14">
                          4. Check that the files you downloaded were signed.
                        </Paragraph>
                        <Codeblock>
                          sha256sum --check --ignore-missing Sia-v
                          {siaVersion.current}-SHA256SUMS.txt.asc
                        </Codeblock>

                        <Paragraph size="14">
                          You should see "OK" next to the files you did download
                          and errors for the files you have not downloaded.
                        </Paragraph>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </>
              }
            />
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
                  version={siaVersion.current}
                  links={[
                    {
                      title: 'Windows',
                      link: `${webLinks.website}/releases/Sia-UI-v${siaVersion.current}.exe`,
                      newTab: true,
                    },
                    {
                      title: 'MacOS',
                      link: `${webLinks.website}/releases/Sia-UI-v${siaVersion.current}.dmg`,
                      newTab: true,
                    },
                    {
                      title: 'Linux',
                      link: `${webLinks.website}/releases/Sia-UI-v${siaVersion.current}.AppImage`,
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
                  version={siaVersion.current}
                  links={[
                    {
                      title: 'Windows',
                      link: `${webLinks.website}/releases/siad/Sia-v${siaVersion.current}-windows-amd64.zip`,
                      newTab: true,
                    },
                    {
                      title: 'MacOS',
                      link: `${webLinks.website}/releases/siad/Sia-v${siaVersion.current}-darwin-amd64.zip`,
                      newTab: true,
                    },
                    {
                      title: 'Linux',
                      link: `${webLinks.website}/releases/siad/Sia-v${siaVersion.current}-linux-amd64.zip`,
                      newTab: true,
                    },
                    {
                      title: 'Raspberry Pi',
                      link: `${webLinks.website}/releases/siad/Sia-v${siaVersion.current}-linux-arm64.zip`,
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
                  version={siaVersion.embc}
                  links={[
                    {
                      title: 'Linux AMD',
                      link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${siaVersion.embc}/embarcadero_v${siaVersion.embc}_linux_amd64.zip`,
                      newTab: true,
                    },
                    {
                      title: 'Linux ARM',
                      link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${siaVersion.embc}/embarcadero_v${siaVersion.embc}_linux_arm64.zip`,
                      newTab: true,
                    },
                    {
                      title: 'MacOS AMD',
                      link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${siaVersion.embc}/embarcadero_v${siaVersion.embc}_darwin_amd64.zip`,
                      newTab: true,
                    },
                    {
                      title: 'MacOS ARM',
                      link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${siaVersion.embc}/embarcadero_v${siaVersion.embc}_darwin_arm64.zip`,
                      newTab: true,
                    },
                    {
                      title: 'Windows AMD',
                      link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${siaVersion.embc}/embarcadero_v${siaVersion.embc}_windows_amd64.zip`,
                      newTab: true,
                    },
                    {
                      title: 'Windows ARM',
                      link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${siaVersion.embc}/embarcadero_v${siaVersion.embc}_windows_arm64.zip`,
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
        </Container>
      </Section>
      <Section>
        <SiteHeading
          size="32"
          title="Developer Tutorials"
          description={
            <>Technical tutorials for new developers looking to build on Sia.</>
          }
        />
        <ContentGallery items={tutorials} />
      </Section>
      <Section>
        <SiteHeading
          size="32"
          title="Technical Walkthroughs"
          description={
            <>
              Technical deep-dives from the core team and the ecosystem of
              developers building technology on top of Sia.
            </>
          }
        />
        <ContentGallery columns="1" items={technical} />
      </Section>
      <Section>
        <SiteHeading
          size="32"
          title="Built on Sia"
          description={
            <>
              Sia is a thriving ecosystem of open source software, layer 2
              networks, and commercial data storage platforms.
            </>
          }
          links={[
            {
              title: 'Browse the entire ecosystem',
              link: sitemap.community.index,
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
      <Section>
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
          actionLink={sitemap.learn.index}
        />
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getStats()
  const technical = getArticles(['technical'], 8)

  const props = {
    stats,
    technical,
  }

  return {
    props,
    revalidate: getDaysInSeconds(1),
  }
}

export default Developers
