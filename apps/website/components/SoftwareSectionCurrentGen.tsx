import { webLinks } from '@siafoundation/design-system'
import { patterns } from '../content/assets'
import { SoftwareSection } from './SoftwareSection'

export function SoftwareSectionSiaUI() {
  return (
    <SoftwareSection
      title="Sia UI"
      status="deprecated"
      sourceLink={webLinks.github.siaui}
      docsLink={webLinks.docs.siaui}
      background={patterns.mountain}
      description={
        <>Built for users who prefer to work with a graphical user interface.</>
      }
      version="1.5.9"
      links={[
        {
          title: 'Windows',
          link: 'https://github.com/SiaFoundation/siad/releases/download/v1.5.9/Sia-UI.Setup.1.5.9.exe',
          newTab: true,
        },
        {
          title: 'MacOS',
          link: 'https://github.com/SiaFoundation/siad/releases/download/v1.5.9/Sia-UI-1.5.9.dmg',
          newTab: true,
        },
        {
          title: 'Linux',
          link: 'https://github.com/SiaFoundation/siad/releases/download/v1.5.9/Sia-UI-1.5.9.AppImage',
          newTab: true,
        },
      ]}
    />
  )
}
