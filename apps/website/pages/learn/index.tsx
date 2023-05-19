/* eslint-disable react/no-unescaped-entities */
import {
  ContentGallery,
  Callout,
  Link,
  SiteHeading,
  webLinks,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getCacheStats } from '../../content/stats'
import { getMinutesInSeconds } from '../../lib/time'
import { textContent } from '../../lib/utils'
import { getCacheTutorials } from '../../content/tutorials'
import { AsyncReturnType } from '../../lib/types'
import { SectionGradient } from '../../components/SectionGradient'
import { SectionTransparent } from '../../components/SectionTransparent'
import { backgrounds } from '../../content/imageBackgrounds'
import { previews } from '../../content/imagePreviews'

const title = 'Learn'
const description =
  'Learn how the Sia protocol is used to power redundant, decentralized, data storage.'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Learn({ getStarted }: Props) {
  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.learn.index}
      heading={
        <SectionTransparent className="pt-24 md:pt-40 pb-6 md:pb-20">
          <SiteHeading
            size="64"
            title={title}
            description={description}
            anchorLink={false}
          />
        </SectionTransparent>
      }
      backgroundImage={backgrounds.light}
      previewImage={previews.light}
    >
      <SectionGradient className="pt-10 md:pt-24 pb-16 md:pb-32">
        <div className="flex flex-wrap items-center justify-between gap-4 gap-y-20">
          <div className="max-w-sm">
            <div className="flex flex-col gap-y-16">
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
                    link: routes.community.index,
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
                    link: routes.foundation.index,
                  },
                ]}
              />
            </div>
          </div>
          <div className="w-full h-full max-w-lg overflow-hidden">
            <Callout
              title="Sia 101"
              actionTitle="Learn more"
              actionLink={webLinks.docs.sia101}
              actionNewTab
              background={backgrounds.nateTrickle}
              description={<>Visit our docs to learn more about Sia.</>}
              className="w-full md:h-[500px]"
            />
          </div>
        </div>
      </SectionGradient>
      <SectionTransparent className="pt-8 md:pt-24 pb-16 md:pb-40">
        <div className="flex flex-col lg:max-w-3xl">
          <SiteHeading
            size="32"
            className="pb-16 md:pb-24"
            title="An introduction to the Sia protocol"
            description={
              <>
                Learn how Sia creates contracts between renters and hosts and
                securely stores data.
              </>
            }
            links={[
              {
                title: 'Read the whitepaper',
                link: routes.whitepaper.pdf,
                newTab: true,
              },
            ]}
          />
          <ContentGallery
            columnClassName="grid-cols-1"
            gapClassName="gap-10 md:gap-20"
            items={[
              {
                title: 'Files are divided prior to upload',
                icon: 'TreeViewAlt',
                subtitle: (
                  <>
                    The Sia software divides files into dozens of shards, each
                    destined for storage on a different host. This prevents any
                    single host from holding your data hostage, and accelerates
                    transfer speeds by connecting to multiple hosts
                    simultaneously. File shards are created using a technology
                    called{' '}
                    <Link
                      href="https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction"
                      target="_blank"
                    >
                      Reed-Solomon erasure coding
                    </Link>
                    , commonly used in CDs and DVDs. Erasure coding adds
                    redundancy to your files, such that (for example) any 10 of
                    30 shards can be used to recover the original data. This
                    means that files on Sia can remain accessible even if 20 out
                    of their 30 hosts are offline.
                  </>
                ),
              },
              {
                title: 'Each file segment is encrypted',
                icon: 'Password',
                subtitle: (
                  <>
                    Before leaving a renter's computer, each file shard is
                    encrypted with a different key. This ensures that, unlike
                    traditional cloud storage providers, hosts on Sia cannot see
                    your data. By default, Sia uses the{' '}
                    <Link
                      href="https://en.wikipedia.org/wiki/threefish"
                      target="_blank"
                    >
                      Threefish
                    </Link>{' '}
                    algorithm, a high-performance block cipher.
                  </>
                ),
              },
              {
                title: 'Storage is incentivized with smart contracts',
                icon: 'Idea',
                subtitle: (
                  <>
                    Using the Sia blockchain, renters form file contracts with
                    hosts. These contracts establish pricing, storage duration,
                    and other aspects of the relationship between the renters
                    and the hosts. File contracts are a type of{' '}
                    <Link
                      href="https://en.wikipedia.org/wiki/Smart_contract"
                      target="_blank"
                    >
                      smart contract
                    </Link>
                    . They allow us to create cryptographic service-level
                    agreements (SLAs) that are secured by the Sia blockchain.
                    Hosts that satisfy the terms of a contract are rewarded at
                    the end of the contract period, while those who violate the
                    terms are penalized.
                  </>
                ),
              },
              {
                title: 'Renters and hosts pay with Siacoin',
                icon: 'Wallet',
                subtitle: (
                  <>
                    Renters pay hosts in Siacoin, the native cryptocurrency of
                    the Sia blockchain. Instead of transferring the entire
                    payment up-front, storage is purchased in a rapid sequence
                    of micropayments that flows alongside the data being
                    transferred. This is accomplished using{' '}
                    <Link
                      href="https://en.bitcoin.it/wiki/Payment_channels"
                      target="_blank"
                    >
                      payment channels
                    </Link>
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
                icon: 'EventSchedule',
                subtitle: (
                  <>
                    Renters prepay for storage within file contracts, setting
                    aside a fixed amount of Siacoin to be spent on storing and
                    transferring data. File contracts typically last 90 days.
                    The renter software automatically renews contracts when they
                    are within a certain window of expiring. If contracts are
                    not renewed, any unused siacoins are returned to the renter.
                    The renter software also detect when hosts go offline, and
                    automatically migrates your data to new hosts.
                  </>
                ),
              },
              {
                title: 'Hosts submit storage proofs',
                icon: 'Policy',
                subtitle: (
                  <>
                    At the end of a file contract, the host must prove that they
                    are still storing the renter's data. They do this by
                    broadcasting a storage proof transaction. If the storage
                    proof appears on the blockchain within a certain timeframe,
                    the host receives the contract payout. If not, the host
                    receives nothing, and loses any collateral that they paid
                    into the contract. Storage proofs are made possible by a
                    cryptographic data structure called a{' '}
                    <Link
                      href="https://en.wikipedia.org/wiki/Merkle_tree"
                      target="_blank"
                    >
                      Merkle tree
                    </Link>
                    . Merkle trees make it possible to prove that a piece of
                    data is part of a larger file. Even better, these proofs are
                    quite small, no matter how large the file is. This is
                    important because the proofs are stored permanently on the
                    blockchain.
                  </>
                ),
              },
            ]}
          />
        </div>
      </SectionTransparent>
      <SectionGradient>
        <div className="pt-10 md:pt-24 pb-20 md:pb-40">
          <SiteHeading
            size="32"
            className="pb-10 md:pb-20"
            title="Learn more about the basics"
            description={
              <>
                Technical tutorials for new developers looking to build on Sia.
              </>
            }
          />
          <ContentGallery items={getStarted} />
        </div>
        <div className="pt-10 md:pt-24 pb-20 md:pb-40 grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2">
          <Callout
            size="0"
            title="Rent"
            background={backgrounds.leaves}
            description={
              <>Rent space and store your data on the Sia network.</>
            }
            actionTitle="Rent storage"
            actionLink={routes.rent.index}
          />
          <Callout
            size="0"
            title="Host"
            background={backgrounds.jungle}
            description={<>Offer your storage space on the Sia network.</>}
            actionTitle="Start hosting"
            actionLink={routes.host.index}
          />
        </div>
      </SectionGradient>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getCacheStats()
  const getStarted = await getCacheTutorials()
  return {
    props: {
      getStarted,
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: getMinutesInSeconds(5),
  }
}
