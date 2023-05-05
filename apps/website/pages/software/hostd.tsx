/* eslint-disable react/no-unescaped-entities */
import {
  ContentGallery,
  Callout,
  Code,
  SiteHeading,
  getImageProps,
  webLinks,
  Link,
  Text,
  LogoGithub24,
  Book24,
  Select,
  ControlGroup,
  Download16,
  LinkButton,
  Button,
  Option,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getMinutesInSeconds } from '../../lib/time'
import { getCacheArticles } from '../../content/articles'
import { AsyncReturnType } from '../../lib/types'
import { getCacheSoftware } from '../../content/software'
import { getCacheStats } from '../../content/stats'
import { getCacheTutorials } from '../../content/tutorials'
import backgroundImage from '../../assets/backgrounds/waterfall.png'
import previewImage from '../../assets/previews/hostd.png'
import { textContent } from '../../lib/utils'
import { Terminal } from '../../components/Terminal'
import { SectionGradient } from '../../components/SectionGradient'
import { SectionWaves } from '../../components/SectionWaves'
import { SectionSimple } from '../../components/SectionSimple'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { cx } from 'class-variance-authority'
import {
  getCacheHostdLatestRelease,
  getCacheRenterdLatestRelease,
} from '../../content/releases'
import { HostdUICarousel } from '../../components/HostdUICarousel'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const title = 'hostd'
const description = (
  <>
    <Code>hostd</Code> hostd is an advanced Sia host solution created by the Sia
    Foundation, designed to enhance the experience for storage providers within
    the Sia network. Tailored for both individual and large-scale storage
    providers, hostd boasts a user-friendly interface and a robust API,
    empowering providers to efficiently manage their storage resources and
    revenue. hostd incorporates an embedded web-UI, simplifying deployment and
    enabling remote management capabilities, ensuring a smooth user experience
    across a diverse range of devices.
  </>
)

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Hostd({ version, technical, tutorials }: Props) {
  const downloadLinks = getLinks(version)
  const [download, setDownload] = useState(downloadLinks[0])
  const downloadEl = (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <div className="flex items-center gap-x-4 gap-y-3">
        <Link
          weight="bold"
          href={webLinks.github.hostd}
          target="_blank"
          size="14"
          underline="hover"
          className="flex items-center gap-1"
        >
          <LogoGithub24 />
          <span>Source code</span>
        </Link>
        <Link
          weight="bold"
          href={webLinks.apiDocs.hostd}
          target="_blank"
          size="14"
          underline="hover"
          className="flex items-center gap-1"
        >
          <Book24 />
          <span>API Docs</span>
        </Link>
      </div>
      <div className="flex-1" />
      {version ? (
        <>
          <Text className="hidden md:block" size="14" weight="bold">
            Downloads
          </Text>
          <ControlGroup>
            <Button state="waiting">{version}</Button>
            <Select
              value={download.link}
              onChange={(e) =>
                setDownload(
                  downloadLinks.find((i) => i.link === e.currentTarget.value)
                )
              }
            >
              <optgroup label="mainnet">
                {getLinks(version)
                  .filter((i) => i.group === 'mainnet')
                  .map((i) => (
                    <Option key={i.link} value={i.link}>
                      {i.title}
                    </Option>
                  ))}
              </optgroup>
              <optgroup label="testnet">
                {getLinks(version)
                  .filter((i) => i.group === 'testnet')
                  .map((i) => (
                    <Option key={i.link} value={i.link}>
                      {i.title}
                    </Option>
                  ))}
              </optgroup>
            </Select>
            <LinkButton
              href={download.link}
              tip="Download binary"
              icon="contrast"
            >
              <Download16 />
            </LinkButton>
          </ControlGroup>
        </>
      ) : null}
    </div>
  )
  const { ref: appRef, inView: appInView } = useInView()

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
            <HostdUICarousel />
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
          title="Learn more about hostd"
          className="mt-24 md:mt-40 mb-24 md:mb-48"
          size="2"
          description={
            <>
              Join the Sia Discord to chat with the team and community about{' '}
              <Code>hostd</Code> development, features, use-cases, bugs, and
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
  const stats = await getCacheStats()
  const technical = await getCacheArticles(['technical'], 8)
  const tutorials = await getCacheTutorials()
  const release = await getCacheHostdLatestRelease()
  const services = await getCacheSoftware('storage_services', 5)

  const props = {
    technical,
    tutorials,
    services,
    version: release?.tag_name || null,
    fallback: {
      '/api/stats': stats,
    },
  }

  return {
    props,
    revalidate: getMinutesInSeconds(5),
  }
}

function getLinks(version: string) {
  if (!version) {
    return []
  }
  return [
    {
      title: 'Windows AMD64',
      link: `${webLinks.github.hostd}/releases/download/${version}/hostd_windows_amd64.zip`,
      group: 'mainnet',
    },
    {
      title: 'MacOS AMD64',
      link: `${webLinks.github.hostd}/releases/download/${version}/hostd_darwin_amd64.zip`,
      group: 'mainnet',
    },
    {
      title: 'MacOS ARM64',
      link: `${webLinks.github.hostd}/releases/download/${version}/hostd_darwin_arm64.zip`,
      group: 'mainnet',
    },
    {
      title: 'Linux AMD64',
      link: `${webLinks.github.hostd}/releases/download/${version}/hostd_linux_amd64.zip`,
      group: 'mainnet',
    },
    {
      title: 'Linux ARM64',
      link: `${webLinks.github.hostd}/releases/download/${version}/hostd_linux_arm64.zip`,
      group: 'mainnet',
    },
    {
      title: 'testnet - Windows AMD64',
      link: `${webLinks.github.hostd}/releases/download/${version}/hostd_zen_windows_amd64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - MacOS AMD64',
      link: `${webLinks.github.hostd}/releases/download/${version}/hostd_zen_darwin_amd64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - MacOS ARM64',
      link: `${webLinks.github.hostd}/releases/download/${version}/hostd_zen_darwin_arm64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - Linux AMD64',
      link: `${webLinks.github.hostd}/releases/download/${version}/hostd_zen_linux_amd64.zip`,
      group: 'testnet',
    },
    {
      title: 'testnet - Linux ARM64',
      link: `${webLinks.github.hostd}/releases/download/${version}/hostd_zen_linux_arm64.zip`,
      group: 'testnet',
    },
  ]
}
