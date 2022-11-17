import {
  Links,
  Text,
  LinkData,
  Link,
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
      variant="verySubtle"
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
              underline={false}
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
              underline={false}
            >
              Documentation
            </Link>
          </Text>
        </div>
      </div>
    </CalloutSoftware>
  )
}
