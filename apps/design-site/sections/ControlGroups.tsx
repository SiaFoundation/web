import {
  Button,
  ControlGroup,
  Flex,
  Section,
  Select,
  TextField,
  Search16,
  OverflowMenuHorizontal16,
} from '@siafoundation/design-system'
import { Menu } from '../components/Menu'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function ControlGroups() {
  return (
    <Section>
      <SectionHeading>Control groups</SectionHeading>
      <Section>
        <SubsectionHeading>ControlGroup - Buttons</SubsectionHeading>
        <Flex direction="column" gap="2">
          <Flex direction="row" gap="1">
            <ControlGroup>
              <Button size="1" variant="accent">
                Green
              </Button>
              <Button size="1" variant="gray">
                Gray
              </Button>
              <Button size="1" disabled variant="red">
                Red
              </Button>
            </ControlGroup>
          </Flex>
          <Flex direction="row" gap="1">
            <ControlGroup>
              <Button size="2" variant="accent">
                Green
              </Button>
              <Button size="2" variant="gray">
                Gray
              </Button>
              <Button size="2" disabled variant="red">
                Red
              </Button>
            </ControlGroup>
          </Flex>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>ControlGroup - Mixed</SubsectionHeading>
        <Flex direction="column" gap="2">
          <Flex direction="row" gap="1">
            <ControlGroup>
              <Button size="1">
                <Search16 />
              </Button>
              <TextField size="1" />
              <Select size="1">
                <option>Option A</option>
                <option>Option B</option>
                <option>Option C</option>
                <option>Option D</option>
                <option>Option Elephant</option>
              </Select>
              <Menu>
                <Button size="1">
                  <OverflowMenuHorizontal16 />
                </Button>
              </Menu>
            </ControlGroup>
          </Flex>
          <Flex direction="row" gap="1">
            <ControlGroup>
              <Button size="2">
                <Search16 />
              </Button>
              <TextField size="2" />
              <Select size="2">
                <option>Option A</option>
                <option>Option B</option>
                <option>Option C</option>
                <option>Option D</option>
                <option>Option Elephant</option>
              </Select>
              <Menu>
                <Button size="2">
                  <OverflowMenuHorizontal16 />
                </Button>
              </Menu>
            </ControlGroup>
          </Flex>
        </Flex>
      </Section>
    </Section>
  )
}
