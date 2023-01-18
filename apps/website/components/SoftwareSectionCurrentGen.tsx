/* eslint-disable react/no-unescaped-entities */
import { webLinks } from '@siafoundation/design-system'
import { Versions } from '../content/versions'
import { SoftwareSection } from './SoftwareSection'

type Props = {
  versions: Versions
}

export function SoftwareSectionCurrentGen({ versions }: Props) {
  return (
    <>
      <SoftwareSection
        title="siad"
        description={
          <>
            Built for technical users comfortable with command line interfaces.
          </>
        }
        sourceLink={webLinks.github.siad}
        docsLink={webLinks.docs.siad}
        version={versions.sia.latest}
        startTime={0}
        links={[
          {
            title: 'Windows',
            link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.latest}-windows-amd64.zip`,
            newTab: true,
          },
          {
            title: 'MacOS',
            link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.latest}-darwin-amd64.zip`,
            newTab: true,
          },
          {
            title: 'Linux',
            link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.latest}-linux-amd64.zip`,
            newTab: true,
          },
          {
            title: 'Raspberry Pi',
            link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.latest}-linux-arm64.zip`,
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
        sourceLink={webLinks.github.siaui}
        docsLink={webLinks.docs.siaui}
        startTime={15}
        description={
          <>
            Built for users who prefer to work with a graphical user interface.
          </>
        }
        version={versions.sia.latest}
        links={[
          {
            title: 'Windows',
            link: `${webLinks.website}/releases/Sia-UI-v${versions.sia.latest}.exe`,
            newTab: true,
          },
          {
            title: 'MacOS',
            link: `${webLinks.website}/releases/Sia-UI-v${versions.sia.latest}.dmg`,
            newTab: true,
          },
          {
            title: 'Linux',
            link: `${webLinks.website}/releases/Sia-UI-v${versions.sia.latest}.AppImage`,
            newTab: true,
          },
        ]}
      />
      <SoftwareSection
        title="embarcadero"
        description={'A tool for conducting escrowless SF<->SC swaps.'}
        sourceLink={webLinks.github.embarcadero}
        docsLink={webLinks.docs.embarcadero}
        version={versions.embarcadero.latest}
        startTime={30}
        links={[
          {
            title: 'Linux AMD',
            link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${versions.embarcadero.latest}/embarcadero_v${versions.embarcadero.latest}_linux_amd64.zip`,
            newTab: true,
          },
          {
            title: 'Linux ARM',
            link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${versions.embarcadero.latest}/embarcadero_v${versions.embarcadero.latest}_linux_arm64.zip`,
            newTab: true,
          },
          {
            title: 'MacOS AMD',
            link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${versions.embarcadero.latest}/embarcadero_v${versions.embarcadero.latest}_darwin_amd64.zip`,
            newTab: true,
          },
          {
            title: 'MacOS ARM',
            link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${versions.embarcadero.latest}/embarcadero_v${versions.embarcadero.latest}_darwin_arm64.zip`,
            newTab: true,
          },
          {
            title: 'Windows AMD',
            link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${versions.embarcadero.latest}/embarcadero_v${versions.embarcadero.latest}_windows_amd64.zip`,
            newTab: true,
          },
          {
            title: 'Windows ARM',
            link: `https://github.com/SiaFoundation/embarcadero/releases/download/v${versions.embarcadero.latest}/embarcadero_v${versions.embarcadero.latest}_windows_arm64.zip`,
            newTab: true,
          },
        ]}
      />
    </>
  )
}
