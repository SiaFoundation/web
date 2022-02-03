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
              <Button size="1" variant="green">
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
              <Button size="2" variant="green">
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
                <MagnifyingGlassIcon />
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
                  <DotsHorizontalIcon />
                </Button>
              </Menu>
            </ControlGroup>
          </Flex>
          <Flex direction="row" gap="1">
            <ControlGroup>
              <Button size="2">
                <MagnifyingGlassIcon />
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
                  <DotsHorizontalIcon />
                </Button>
              </Menu>
            </ControlGroup>
          </Flex>
          <Flex direction="row" gap="1">
            <ControlGroup>
              <Button size="3">
                <MagnifyingGlassIcon />
              </Button>
              <TextField size="3" />
              <Select size="3">
                <option>Option A</option>
                <option>Option B</option>
                <option>Option C</option>
                <option>Option D</option>
                <option>Option Elephant</option>
              </Select>
              <Menu>
                <Button size="3">
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
