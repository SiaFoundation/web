import {
  Section,
  ThemeRadio,
  UserDropdownMenu,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Apps() {
  return (
    <Section>
      <SectionHeading>Controls</SectionHeading>
      <SubsectionHeading>ThemeRadio</SubsectionHeading>
      <ThemeRadio />
      <SubsectionHeading>UserDropdownMenu</SubsectionHeading>
      <div>
        <UserDropdownMenu />
      </div>
    </Section>
  )
}
