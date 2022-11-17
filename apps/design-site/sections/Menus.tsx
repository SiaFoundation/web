import { Button, Section } from '@siafoundation/design-system'
import { ExampleMenu } from '../components/ExampleMenu'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Menus() {
  return (
    <>
      <Section>
        <SectionHeading>Menus</SectionHeading>
        <SubsectionHeading>DropdownMenu</SubsectionHeading>
        <div className="flex gap-2">
          <ExampleMenu>
            <Button>Auto</Button>
          </ExampleMenu>
          <ExampleMenu align="start">
            <Button>Start</Button>
          </ExampleMenu>
          <ExampleMenu align="center">
            <Button>Center</Button>
          </ExampleMenu>
          <ExampleMenu align="end">
            <Button>End</Button>
          </ExampleMenu>
        </div>
      </Section>
    </>
  )
}
