import { Button, Flex, Section } from '@siafoundation/design-system'
import { Menu } from '../components/Menu'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Menus() {
  return (
    <Section>
      <SectionHeading>Menus</SectionHeading>
      <Section>
        <SubsectionHeading>DropdownMenu</SubsectionHeading>
        <Flex direction="row" gap="1">
          <Menu>
            <Button>Auto</Button>
          </Menu>
          <Menu align="start">
            <Button>Start</Button>
          </Menu>
          <Menu align="center">
            <Button>Center</Button>
          </Menu>
          <Menu align="end">
            <Button>End</Button>
          </Menu>
        </Flex>
      </Section>
    </Section>
  )
}
