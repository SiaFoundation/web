import { SiteMap, ThemeRadio } from '@siafoundation/design-system'
import { menuSections } from '../../config/siteMap'
import { SectionGradient } from '../SectionGradient'
import { Statsbar } from '../Statsbar'
import { SectionWaves } from '../SectionWaves'

export function Footer() {
  return (
    <div className="flex flex-col">
      <SectionWaves className="pt-10 pb-12 md:pt-12 md:pb-20">
        <SiteMap menuSections={menuSections} />
      </SectionWaves>
      <SectionGradient className="py-16 md:py-20 opacity-[.99]">
        <Statsbar />
        <div className="pt-20 pb-20">
          <ThemeRadio />
        </div>
      </SectionGradient>
    </div>
  )
}
