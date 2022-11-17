import {
  Section,
  ThemeRadio,
  UserDropdownMenu,
} from '@siafoundation/design-system'
import { SectionHeading as DSSectionHeading } from '../components/SectionHeading'

export function Apps() {
  return (
    <>
      <Section className="pt-20">
        <DSSectionHeading>ThemeRadio</DSSectionHeading>
        <div className="flex flex-col gap-6">
          <ThemeRadio />
        </div>
      </Section>
      <Section className="pt-20">
        <DSSectionHeading>UserDropdownMenu</DSSectionHeading>
        <div className="flex flex-col gap-6">
          <UserDropdownMenu />
        </div>
      </Section>
    </>
  )
}
