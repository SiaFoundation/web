import { DotsHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Button,
  ControlGroup,
  Flex,
  IconButton,
  Section,
  Select,
  TextField,
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
              <Button variant="green">Green</Button>
              <Button variant="gray">Gray</Button>
              <Button disabled variant="red">
                Red
              </Button>
              <Button ghost variant="green">
                Green
              </Button>
              <Button ghost variant="gray">
                Gray
              </Button>
              <Button ghost variant="red">
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
              <Button>
                <MagnifyingGlassIcon />
              </Button>
              <TextField />
              <Select>
                <option>Option A</option>
                <option>Option B</option>
                <option>Option C</option>
                <option>Option D</option>
                <option>Option Elephant</option>
              </Select>
              <Menu>
                <Button>
                  <DotsHorizontalIcon />
                </Button>
              </Menu>
            </ControlGroup>
          </Flex>
        </Flex>
      </Section>
    </Section>
  )
}
