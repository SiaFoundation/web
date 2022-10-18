import {
  Flex,
  Links,
  Text,
  SiteHeading,
  LinkData,
} from '@siafoundation/design-system'

type Props = {
  title: string
  description: React.ReactNode
  version: string
  links: LinkData[]
  children?: React.ReactNode
}

export function SoftwareSection({
  title,
  description,
  version,
  links,
  children,
}: Props) {
  return (
    <Flex direction="column" gap="2">
      <SiteHeading size="20" title={title} description={description} />
      <Text size="14" weight="bold">
        Version {version}
      </Text>
      <Links links={links} />
      {children}
    </Flex>
  )
}
