import {
  Flex,
  Section,
  ThemeRadio,
  UserDropdownMenu,
} from '@siafoundation/design-system'
import { SectionHeading as DSSectionHeading } from '../components/SectionHeading'

export function Apps() {
  return (
    <>
      <Section>
        <DSSectionHeading>ThemeRadio</DSSectionHeading>
        <Flex direction="column" gap="3">
          <ThemeRadio />
        </Flex>
      </Section>
      <Section>
        <DSSectionHeading>UserDropdownMenu</DSSectionHeading>
        <Flex direction="column" gap="3">
          <UserDropdownMenu />
        </Flex>
      </Section>
    </>
  )
}
