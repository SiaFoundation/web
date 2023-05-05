import {
  Button,
  ControlGroup,
  Section,
  Select,
  TextField,
  Search16,
  OverflowMenuHorizontal16,
  Option,
} from '@siafoundation/design-system'
import { ExampleMenu } from '../components/ExampleMenu'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function ControlGroups() {
  return (
    <>
      <Section>
        <SectionHeading>Control groups</SectionHeading>
        <SubsectionHeading>ControlGroup - Buttons</SubsectionHeading>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <ControlGroup>
              <Button size="small" variant="accent">
                Green
              </Button>
              <Button size="small" variant="gray">
                <Search16 />
                Gray
                <Search16 />
              </Button>
              <Button size="small" disabled variant="red">
                Red
              </Button>
            </ControlGroup>
          </div>
          <div className="flex gap-2">
            <ControlGroup>
              <Button size="medium" variant="accent">
                Green
              </Button>
              <Button size="medium" variant="gray">
                Gray
              </Button>
              <Button size="medium" disabled variant="red">
                Red
              </Button>
            </ControlGroup>
          </div>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>ControlGroup - Mixed</SubsectionHeading>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <ControlGroup>
              <Button size="small">
                <Search16 />
              </Button>
              <TextField size="small" />
              <Select size="small">
                <Option>Option A</Option>
                <Option>Option B</Option>
                <Option>Option C</Option>
                <Option>Option D</Option>
                <Option>Option Elephant</Option>
              </Select>
              <ExampleMenu>
                <Button size="small">
                  <OverflowMenuHorizontal16 />
                </Button>
              </ExampleMenu>
            </ControlGroup>
          </div>
          <div className="flex gap-2">
            <ControlGroup>
              <Button size="medium">
                <Search16 />
              </Button>
              <TextField size="medium" />
              <Select size="medium">
                <Option>Option A</Option>
                <Option>Option B</Option>
                <Option>Option C</Option>
                <Option>Option D</Option>
                <Option>Option Elephant</Option>
              </Select>
              <ExampleMenu>
                <Button size="medium">
                  <OverflowMenuHorizontal16 />
                </Button>
              </ExampleMenu>
            </ControlGroup>
          </div>
        </div>
      </Section>
    </>
  )
}
