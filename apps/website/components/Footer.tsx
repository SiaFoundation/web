import { Flex, SiteMap, ThemeRadio } from '@siafoundation/design-system'
import { menuSections } from '../config/siteMap'
import { SectionGradient } from './SectionGradient'
import { Statsbar } from './Statsbar'
import { SectionWaves } from './SectionWaves'

export function Footer() {
  return (
    <Flex direction="column">
      <SectionWaves css={{ pt: '$5', pb: '$9' }}>
        <SiteMap menuSections={menuSections} />
      </SectionWaves>
      <SectionGradient css={{ py: '$8', opacity: 0.99 }}>
        <Statsbar />
        <Flex css={{ marginTop: '$4' }}>
          <ThemeRadio />
        </Flex>
      </SectionGradient>
    </Flex>
  )
}
