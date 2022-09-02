/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Flex,
  ContentGallery,
  Callout,
  Section,
  Idea24,
  Password24,
  Wallet24,
  TreeViewAlt24,
  Policy24,
  EventSchedule24,
  NextLink,
  SiteHeading,
  Grid,
  getImageProps,
  webLinks,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { sitemap } from '../../config/site'
import { getStats } from '../../content/stats'
import { getDaysInSeconds } from '../../lib/time'
import { textContent } from '../../lib/utils'
import backgroundImage from '../../assets/backgrounds/leaves.png'
import previewImage from '../../assets/previews/leaves.png'
import { getTutorials } from '../../content/tutorials'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const getStarted = getTutorials()

const title = 'Learn'
const description =
  'Learn how the Sia protocol is used to power redundant, decentralized, data storage.'

function Learn() {
  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={sitemap.learn.index}
      heading={
        <Section size="4">
          <SiteHeading size="64" title={title} description={description} />
        </Section>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <Section>
        <Grid
          align="center"
          justify="between"
          columns={{
            '@initial': '1',
            '@bp2': '2',
          }}
          gapX="6"
          gapY="9"
          css={{
            '@bp2': {
              height: '450px',
            },
          }}
        >
          <Box css={{ maxWidth: '600px' }}>
            <Flex direction="column" gap="8">
              <SiteHeading
                size="20"
                title="What Sia does"
                description={
                  <>
                    Learn the basics with a visual infographic that explains how
                    Sia works.
                  </>
                }
                links={[
                  {
                    title: 'Learn how Sia works',
                    link: webLinks.docs.sia101,
                    newTab: true,
                  },
                ]}
              />
              <SiteHeading
                size="20"
                title="Why it's here"
                description={
                  <>
                    Learn about the ecosystem of storage services and tools
                    powered by Sia.
                  </>
                }
                links={[
                  {
                    title: 'Explore the community',
                    link: sitemap.community.index,
                  },
                ]}
              />
              <SiteHeading
                size="20"
                title="Who makes Sia?"
                description={
                  <>
                    Learn more about the non-profit foundation that maintains
                    the Sia software.
                  </>
                }
                links={[
                  {
                    title: 'Meet the Sia Foundation',
                    link: sitemap.foundation.index,
                  },
                ]}
              />
            </Flex>
          </Box>
          <Box
            css={{
              height: '100%',
              '@initial': {
                height: '100%',
                width: '100%',
              },
              '@bp3': {
                margin: '0 0 0 auto',
                height: '100%',
                width: '400px',
              },
              '@bp4': {
                height: '100%',
                width: '500px',
              },
            }}
          >
            <Callout
              title="Sia 101"
              actionTitle="Learn more"
              actionLink={webLinks.docs.sia101}
              actionNewTab
              description={<>Visit our docs to learn more about Sia.</>}
              css={{
                height: '100%',
                '@bp2': {
                  height: '120%',
                  top: '-10%',
                },
              }}
            />
          </Box>
        </Grid>
      </Section>
      <Section css={{ maxWidth: '800px', marginTop: '$9' }} gap="9">
        <SiteHeading
          size="32"
          title="How Sia Works"
          description={
            <>
              Learn how Sia creates contracts between renters and hosts and
              securely stores data.
            </>
          }
          links={[
            {
              title: 'Read the whitepaper',
              link: sitemap.whitepaper.pdf,
              newTab: true,
            },
          ]}
        />
        <ContentGallery
          columns="1"
          gap="7"
          items={[
            {
              title: 'Files are divided prior to upload',
              icon: <TreeViewAlt24 />,
              subtitle: (
                <>
                  The Sia software divides files into dozens of shards, each
                  destined for storage on a different host. This prevents any
                  single host from holding your data hostage, and accelerates
                  transfer speeds by connecting to multiple hosts
                  simultaneously. File shards are created using a technology
                  called{' '}
                  <NextLink
                    href="https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction"
                    target="_blank"
                  >
                    Reed-Solomon erasure coding
                  </NextLink>
                  , commonly used in CDs and DVDs. Erasure coding adds
                  redundancy to your files, such that (for example) any 10 of 30
                  shards can be used to recover the original data. This means
                  that files on Sia can remain accessible even if 20 out of
                  their 30 hosts are offline.
                </>
              ),
            },
            {
              title: 'Each file segment is encrypted',
              icon: <Password24 />,
              subtitle: (
                <>
                  Before leaving a renter's computer, each file shard is
                  encrypted with a different key. This ensures that, unlike
                  traditional cloud storage providers, hosts on Sia cannot see
                  your data. By default, Sia uses the{' '}
                  <NextLink
                    href="https://en.wikipedia.org/wiki/threefish"
                    target="_blank"
                  >
                    Threefish
                  </NextLink>{' '}
                  algorithm, a high-performance block cipher.
                </>
              ),
            },
            {
              title: 'Storage is incentivized with smart contracts',
              icon: <Idea24 />,
              subtitle: (
                <>
                  Using the Sia blockchain, renters form file contracts with
                  hosts. These contracts establish pricing, storage duration,
                  and other aspects of the relationship between the renters and
                  the hosts. File contracts are a type of{' '}
                  <NextLink
                    href="https://en.wikipedia.org/wiki/Smart_contract"
                    target="_blank"
                  >
                    smart contract
                  </NextLink>
                  . They allow us to create cryptographic service-level
                  agreements (SLAs) that are secured by the Sia blockchain.
                  Hosts that satisfy the terms of a contract are rewarded at the
                  end of the contract period, while those who violate the terms
                  are penalized.
                </>
              ),
            },
            {
              title: 'Renters and hosts pay with Siacoin',
              icon: <Wallet24 />,
              subtitle: (
                <>
                  Renters pay hosts in Siacoin, the native cryptocurrency of the
                  Sia blockchain. Instead of transferring the entire payment
                  up-front, storage is purchased in a rapid sequence of
                  micropayments that flows alongside the data being transferred.
                  This is accomplished using{' '}
                  <NextLink
                    href="https://en.bitcoin.it/wiki/Payment_channels"
                    target="_blank"
                  >
                    payment channels
                  </NextLink>
                  , the same technology used in Bitcoin's Lightning Network.
                  Furthermore, most contracts require the host to lock up some
                  of their own siacoins as collateral, giving them a strong
                  incentive to stay online and fulfill the terms of the
                  contract.
                </>
              ),
            },
            {
              title: 'Contracts are renewed over time',
              icon: <EventSchedule24 />,
              subtitle: (
                <>
                  Renters prepay for storage within file contracts, setting
                  aside a fixed amount of Siacoin to be spent on storing and
                  transferring data. File contracts typically last 90 days. The
                  renter software automatically renews contracts when they are
                  within a certain window of expiring. If contracts are not
                  renewed, any unused siacoins are returned to the renter. The
                  renter software also detect when hosts go offline, and
                  automatically migrates your data to new hosts.
                </>
              ),
            },
            {
              title: 'Hosts submit storage proofs',
              icon: <Policy24 />,
              subtitle: (
                <>
                  At the end of a file contract, the host must prove that they
                  are still storing the renter's data. They do this by
                  broadcasting a storage proof transaction. If the storage proof
                  appears on the blockchain within a certain timeframe, the host
                  receives the contract payout. If not, the host receives
                  nothing, and loses any collateral that they paid into the
                  contract. Storage proofs are made possible by a cryptographic
                  data structure called a{' '}
                  <NextLink
                    href="https://en.wikipedia.org/wiki/Merkle_tree"
                    target="_blank"
                  >
                    Merkle tree
                  </NextLink>
                  . Merkle trees make it possible to prove that a piece of data
                  is part of a larger file. Even better, these proofs are quite
                  small, no matter how large the file is. This is important
                  because the proofs are stored permanently on the blockchain.
                </>
              ),
            },
          ]}
        />
      </Section>
      <Section>
        <SiteHeading
          size="32"
          title="Get Started"
          description={
            <>Technical tutorials for new developers looking to build on Sia.</>
          }
        />
        <ContentGallery items={getStarted} />
      </Section>
      <Section>
        <Callout
          eyebrow="Start building"
          title="Developer Resources"
          description={
            <>
              Software downloads, tutorials, technical walkthroughs, and more.
            </>
          }
          startTime={20}
          actionTitle="Explore"
          actionLink={sitemap.getStarted.index}
          size="2"
        />
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getStats()

  return {
    props: {
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: getDaysInSeconds(1),
  }
}

export default Learn
