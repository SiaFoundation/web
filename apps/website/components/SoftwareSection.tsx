import {
  Flex,
  Links,
  Text,
  LinkData,
  NextLink,
  Book16,
  LogoGithub16,
} from '@siafoundation/design-system'
import { CalloutSoftware } from './CalloutSoftware'

type Props = {
  title: string
  description: React.ReactNode
  version: string
  sourceLink: string
  docsLink: string
  links: LinkData[]
  startTime: number
}

export function SoftwareSection({
  title,
  description,
  version,
  sourceLink,
  docsLink,
  links,
  startTime,
}: Props) {
  return (
    <CalloutSoftware
      name={title}
      description={description}
      startTime={startTime}
    >
      <Flex direction="column" gap="2">
        <Text size="14" weight="bold" css={{ mt: '$2' }}>
          Binaries (Version {version})
        </Text>
        <Links links={links} />
        <Flex
          gap="3"
          css={{
            mt: '$4',
          }}
        >
          <Text
            size="14"
            font="mono"
            css={{ display: 'flex', alignItems: 'center', gap: '$0-5' }}
          >
            <LogoGithub16 />
            <NextLink underline="hover" href={sourceLink} target="_blank">
              Source
            </NextLink>
          </Text>
          <Text
            size="14"
            font="mono"
            css={{
              display: 'flex',
              alignItems: 'center',
              gap: '$0-5',
            }}
          >
            <Book16 />
            <NextLink underline="hover" href={docsLink} target="_blank">
              Documentation
            </NextLink>
          </Text>
        </Flex>
      </Flex>
    </CalloutSoftware>
  )
}
