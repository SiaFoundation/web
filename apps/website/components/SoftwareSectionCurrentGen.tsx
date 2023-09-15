/* eslint-disable react/no-unescaped-entities */
import { webLinks } from '@siafoundation/design-system'
import { patterns } from '../content/assets'
import { SoftwareSection } from './SoftwareSection'

export type Versions = {
  sia: {
    latest: string
  }
}

type Props = {
  versions: Versions
}

export function SoftwareSectionCurrentGen({ versions }: Props) {
  return (
    <>
      <SoftwareSection
        title="siad"
        status="deprecated"
        description={
          <>
            Built for technical users comfortable with command line interfaces.
          </>
        }
        sourceLink={webLinks.github.siad}
        docsLink={webLinks.docs.siad}
        version={versions.sia.latest}
        background={patterns.light}
        links={[
          {
            title: 'Windows',
            link: `${webLinks.website.index}/releases/siad/Sia-v${versions.sia.latest}-windows-amd64.zip`,
            newTab: true,
          },
          {
            title: 'MacOS',
            link: `${webLinks.website.index}/releases/siad/Sia-v${versions.sia.latest}-darwin-amd64.zip`,
            newTab: true,
          },
          {
            title: 'Linux',
            link: `${webLinks.website.index}/releases/siad/Sia-v${versions.sia.latest}-linux-amd64.zip`,
            newTab: true,
          },
          {
            title: 'Raspberry Pi',
            link: `${webLinks.website.index}/releases/siad/Sia-v${versions.sia.latest}-linux-arm64.zip`,
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
        title="Sia UI"
        status="deprecated"
        sourceLink={webLinks.github.siaui}
        docsLink={webLinks.docs.siaui}
        background={patterns.mountain}
        description={
          <>
            Built for users who prefer to work with a graphical user interface.
          </>
        }
        version={versions.sia.latest}
        links={[
          {
            title: 'Windows',
            link: `${webLinks.website.index}/releases/Sia-UI-v${versions.sia.latest}.exe`,
            newTab: true,
          },
          {
            title: 'MacOS',
            link: `${webLinks.website.index}/releases/Sia-UI-v${versions.sia.latest}.dmg`,
            newTab: true,
          },
          {
            title: 'Linux',
            link: `${webLinks.website.index}/releases/Sia-UI-v${versions.sia.latest}.AppImage`,
            newTab: true,
          },
        ]}
      />
    </>
  )
}
