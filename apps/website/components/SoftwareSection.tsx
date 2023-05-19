import {
  Links,
  Text,
  LinkData,
  Link,
  Book16,
  LogoGithub16,
} from '@siafoundation/design-system'
import { StaticImageData } from 'next/image'
import { CalloutCoreSoftware } from './CalloutCoreSoftware'

type Props = {
  title: string
  description: React.ReactNode
  version: string
  sourceLink: string
  docsLink: string
  links: LinkData[]
  background: StaticImageData
}

export function SoftwareSection({
  title,
  description,
  version,
  sourceLink,
  docsLink,
  links,
  background,
}: Props) {
  return (
    <CalloutCoreSoftware
      name={title}
      description={description}
      background={background}
      variant="subtle"
    >
      <div className="flex flex-col">
        <Text size="14" weight="bold" className="mt-4 mb-4">
          Binaries (Version {version})
        </Text>
        <Links links={links} className="mb-12" />
        <div className="flex-1" />
        <div className="flex gap-6">
          <Text className="flex items-center gap-x-1">
            <LogoGithub16 />
            <Link
              size="14"
              font="mono"
              href={sourceLink}
              target="_blank"
              underline="none"
            >
              Source
            </Link>
          </Text>
          <Text className="flex items-center gap-x-1">
            <Book16 />
            <Link
              size="14"
              font="mono"
              href={docsLink}
              target="_blank"
              underline="none"
            >
              Documentation
            </Link>
          </Text>
        </div>
      </div>
    </CalloutCoreSoftware>
  )
}
