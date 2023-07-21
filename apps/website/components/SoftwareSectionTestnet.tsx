/* eslint-disable react/no-unescaped-entities */
import { webLinks } from '@siafoundation/design-system'
import { backgrounds } from '../content/imageBackgrounds'
import { SoftwareSection } from './SoftwareSection'

type Versions = {
  sia: {
    latest: string
    testnet: string
  }
  embarcadero: {
    latest: string
  }
}

type Props = {
  versions: Versions
}

export function SoftwareSectionTestnet({ versions }: Props) {
  return (
    <>
      <SoftwareSection
        title="siad"
        description={
          <>
            Modified for running on the Zen Testnet. Built for technical users
            comfortable with command line interfaces.
          </>
        }
        sourceLink={webLinks.github.siad}
        docsLink={webLinks.docs.siad}
        version={versions.sia.testnet}
        background={backgrounds.natePath}
        links={[
          {
            title: 'Windows AMD',
            link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.testnet}-Testnet-windows-amd64.zip`,
            newTab: true,
          },
          {
            title: 'Windows ARM',
            link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.testnet}-Testnet-windows-arm64.zip`,
            newTab: true,
          },
          {
            title: 'MacOS AMD',
            link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.testnet}-Testnet-darwin-amd64.zip`,
            newTab: true,
          },
          {
            title: 'MacOS ARM',
            link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.testnet}-Testnet-darwin-arm64.zip`,
            newTab: true,
          },
          {
            title: 'Linux AMD',
            link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.testnet}-Testnet-linux-amd64.zip`,
            newTab: true,
          },
          {
            title: 'Linux ARM',
            link: `${webLinks.website}/releases/siad/Sia-v${versions.sia.testnet}-Testnet-linux-arm64.zip`,
            newTab: true,
          },
          {
            title: 'Docker',
            link: 'https://github.com/SiaFoundation/siad/pkgs/container/siad',
            newTab: true,
          },
        ]}
      />
    </>
  )
}
