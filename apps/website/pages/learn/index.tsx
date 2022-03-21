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
  LocalBackdrop,
  WavesBackdrop,
  Container,
} from '@siafoundation/design-system'
import { getArticles } from '../../content/articles'
import { Layout } from '../../components/Layout'
import { external, sitemap } from '../../config/site'
import { getStats, Stats } from '../../content/stats'
import { getDaysInSeconds } from '../../lib/time'
import background from '../../assets/backgrounds/leaves.png'

const backgroundImage = getImageProps(background)

const getStarted = getArticles(['tutorial'])

type Props = {
  stats: Stats
}

function Learn({ stats }: Props) {
  return (
    <Layout
      heading={
        <Section size="4">
          <SiteHeading
            size="3"
            title="Learn"
            description={
              <>
                Learn how the Sia protocol is used to power redundant,
                decentralized, data storage.
              </>
            }
          />
        </Section>
      }
      stats={stats}
      backgroundImage={backgroundImage}
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
        >
          <Box css={{ maxWidth: '600px' }}>
            <Flex direction="column" gap="8">
              <SiteHeading
                size="1"
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
                    link: external.docs.sia101,
                    newTab: true,
                  },
                ]}
              />
              <SiteHeading
                size="1"
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
                size="1"
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
              actionLink={external.docs.sia101}
              actionNewTab
              description={<>Visit our docs to learn more about Sia.</>}
              css={{ height: '100%' }}
            />
          </Box>
        </Grid>
      </Section>
      <Section css={{ maxWidth: '800px', marginTop: '$9' }} gap="9">
        <SiteHeading
          size="2"
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
              title: 'Files Are Divided Prior To Upload',
              icon: <TreeViewAlt24 />,
              subtitle: (
                <>
                  The Sia software divides files into 30 segments before
                  uploading, each targeted for distribution to hosts across the
                  world. This distribution assures that no one host represents a
                  single point of failure and reinforces overall network uptime
                  and redundancy. File segments are created using a technology
                  called{' '}
                  <NextLink
                    href="https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction"
                    target="_blank"
                  >
                    Reed-Solomon erasure coding
                  </NextLink>
                  , commonly used in CDs and DVDs. Erasure coding allows Sia to
                  divide files in a redundant manner, where any 10 of 30
                  segments can fully recover a user&apos;s files. This means
                  that if 20 out of 30 hosts go offline, a Sia user is still
                  able to download her files.
                </>
              ),
            },
            {
              title: 'Each File Segment Is Encrypted',
              icon: <Password24 />,
              subtitle: (
                <>
                  Before leaving a renter&apos;s computer, each file segment is
                  encrypted. This ensures that hosts only store encrypted
                  segments of user data. This differs from traditional cloud
                  storage providers like Amazon, who do not encrypt user data by
                  default. Sia is more secure than existing solutions because
                  hosts only store encrypted file segments, rather than whole
                  files. Sia uses the{' '}
                  <NextLink
                    href="https://en.wikipedia.org/wiki/threefish"
                    target="_blank"
                  >
                    Threefish
                  </NextLink>{' '}
                  algorithm, an open source, secure, high-performance encryption
                  standard.
                </>
              ),
            },
            {
              title: 'Files Are Sent To Hosts Using Smart Contracts',
              icon: <Idea24 />,
              subtitle: (
                <>
                  Using the Sia blockchain, renters form file contracts with
                  hosts. These contracts set pricing, uptime commitments, and
                  other aspects of the relationship between the renters and the
                  hosts. File contracts are a type of{' '}
                  <NextLink
                    href="https://en.wikipedia.org/wiki/Smart_contract"
                    target="_blank"
                  >
                    smart contract
                  </NextLink>
                  . They allow us to create cryptographic service-level
                  agreements (SLAs) that are stored on the Sia blockchain. Since
                  file contracts are automatically enforced by the network, Sia
                  has no need for intermediaries or trusted third parties.
                </>
              ),
            },
            {
              title: 'Renters And Hosts Pay With Siacoin',
              icon: <Wallet24 />,
              subtitle: (
                <>
                  Both renters and hosts use Siacoin, a unique cryptocurrency
                  built on the Sia blockchain. Renters use Siacoin to buy
                  storage capacity from hosts, while hosts deposit Siacoin into
                  each file contract as collateral. Micropayments flow between
                  renters and hosts using a technology called{' '}
                  <NextLink
                    href="https://en.bitcoin.it/wiki/Payment_channels"
                    target="_blank"
                  >
                    payment channels
                  </NextLink>
                  , which is similar to Bitcoin&apos;s Lightning Network.
                  Payments between renters and hosts occur off-chain, greatly
                  increasing network efficiency and scalability. Since hosts pay
                  collateral into every storage contract, they have a strong
                  disincentive to go offline.
                </>
              ),
            },
            {
              title: 'Contracts Renew Over Time',
              icon: <EventSchedule24 />,
              subtitle: (
                <>
                  Renters prepay for storage within file contracts, setting
                  aside a fixed amount of Siacoin to be spent on storing and
                  transferring data. File contracts typically last 90 days. Sia
                  automatically renews contracts when they are within a certain
                  window of expiring. If contracts are not renewed, Sia returns
                  any unused coins to the renter at the end of the contract
                  period. As individual hosts go offline, Sia automatically
                  moves renter data to new hosts in a process called file
                  repair.
                </>
              ),
            },
            {
              title: 'Hosts Submit Storage Proofs',
              icon: <Policy24 />,
              subtitle: (
                <>
                  At the end of a file contract, the host must prove that she is
                  storing the renter&apos;s data. This is called a storage
                  proof. If the storage proof appears on the blockchain within a
                  certain timeframe, the host is paid. If not, the host is
                  penalized. Storage proofs are made possible by a technology
                  called{' '}
                  <NextLink
                    href="https://en.wikipedia.org/wiki/Merkle_tree"
                    target="_blank"
                  >
                    Merkle trees
                  </NextLink>
                  . Merkle trees make it possible to prove that a small segment
                  of data is part of a larger file. The advantage of these
                  proofs is that they are very small, no matter how large the
                  file is. This is important because the proofs are stored
                  permanently on the blockchain.
                </>
              ),
            },
          ]}
        />
      </Section>
      <Section>
        <SiteHeading
          size="2"
          title="Get Started"
          description={
            <>
              Visit the developer pages for software downloads and developer
              resources, tutorials, technical walkthroughs, and more.
            </>
          }
        />
        <ContentGallery
          items={getStarted.map((i) => ({ ...i, newTab: true }))}
        />
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
          actionTitle="Explore"
          actionLink={sitemap.developers.index}
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
      stats,
    },
    revalidate: getDaysInSeconds(1),
  }
}

export default Learn
