/* eslint-disable react/no-unescaped-entities */
import {
  Flex,
  Box,
  Heading,
  Text,
  Paragraph,
  Section,
} from '@siafoundation/design-system'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Italic from './Italic'

type Props = {
  onDone: () => void
}

export default function Letter({ onDone }: Props) {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      onDone()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <Section size="3">
      <Flex
        direction="column"
        gap="2"
        css={{
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <Text
          size="32"
          weight="bold"
          css={{ fontStyle: 'italic', margin: '$3 0' }}
        >
          the future is making a comeback
        </Text>
        <Paragraph>
          A common sentiment is brewing online; a shared longing for the
          Internet that might have been. After decades of corporate
          encroachment, you don't need to be a power user to realize that
          something has gone very wrong.
        </Paragraph>
        <Paragraph>
          In the early days of the Internet, the future was bright. In{' '}
          <Italic>that</Italic> future, when you sent an instant message, it
          traveled directly to the recipient. When you needed to pay a friend,
          you announced a transfer of value to their public key. When you took a
          picture, it was immediately encrypted and backed up to storage that
          you controlled. In <Italic>that</Italic> future, people would laugh at
          the idea of having to authenticate themselves to some corporation
          before doing these things.
        </Paragraph>
        <Paragraph>
          But the future isn't what it used to be. Rather than a network of
          human-sized communities, we have a handful of soulless commons, each
          controlled by a faceless corporate entity.
        </Paragraph>
        <Paragraph>Want to send a message?</Paragraph>
        <Paragraph>
          <Italic>
            You can — but we'll store a copy of it indefinitely, unencrypted,
            for our preference-learning algorithms to pore over; how else could
            we slap targeted ads on every piece of content you see?
          </Italic>
        </Paragraph>
        <Paragraph>Want to pay a friend?</Paragraph>
        <Paragraph>
          <Italic>You can — in our Monopoly money.</Italic>
        </Paragraph>
        <Paragraph>Want to backup a photo?</Paragraph>
        <Paragraph>
          <Italic>
            You can — inside our walled garden, which only we (and the NSA, of
            course) can access. Just be careful what you share, because merely
            locking you out of your account and deleting all your data is far
            from the worst thing we could do.
          </Italic>
        </Paragraph>
        <Paragraph>
          You rationalize this: “MEGACORP would never do such a thing; it would
          be bad for business.” But we all know, at some level, that this state
          of affairs, this inversion of power, is not merely “unfortunate” or
          “suboptimal” — No. It is <Italic>degrading</Italic>. Even if MEGACORP
          were purely benevolent, it is degrading that we must ask its
          permission to talk to our friends; that we must rely on it to
          safeguard our treasured memories; that our digital lives are
          completely beholden to those who seek only to extract value from us.
        </Paragraph>
        <Paragraph>
          At the root of this issue is the centralization of data. MEGACORP can
          surveil you — because your emails and video chats flow through their
          servers. And MEGACORP can control you—because they hold your data
          hostage. But centralization is a solution to a{' '}
          <Italic>technical problem</Italic>: How can we make the user's data
          accessible from anywhere in the world, on any device? For a long time,
          no alternative solution to this problem was forthcoming.
        </Paragraph>
        <Paragraph>
          Today, thanks to a confluence of established techniques and recent
          innovations, we can solve the accessibility problem without resorting
          to centralization. Hashing, encryption, and erasure encoding got us
          most of the way, but one barrier remained: incentives. How do you
          incentivize an anonymous stranger to store your data? Earlier
          protocols like BitTorrent worked around this limitation by relying on
          altruism, tit-for-tat requirements, or “points” — in other words,
          nothing you could buy groceries with. Finally, in 2009, a solution
          appeared: Bitcoin. Not long after, Sia was born.
        </Paragraph>
        <Paragraph>
          Cryptography has unleashed the latent power of the Internet by
          enabling interactions between mutually-distrusting parties. Sia
          harnesses this power to create a trustless cloud storage marketplace,
          allowing buyers and sellers to transact directly. No intermediaries,
          no borders, no vendor lock-in, no spying, no throttling, no walled
          gardens; it's a return to the Internet we once knew. The future is
          making a comeback.
        </Paragraph>
      </Flex>
      <Box ref={ref} css={{ marginTop: '50vh' }} />
    </Section>
  )
}
