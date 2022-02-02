import {
  Checkbox,
  Flex,
  Radio,
  RadioGroup,
  Section,
  Select,
  Switch,
  TextArea,
  TextField,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Inputs() {
  return (
    <Section>
      <SectionHeading>Inputs</SectionHeading>
      <Section>
        <SubsectionHeading>TextField</SubsectionHeading>
        <Flex direction="column" gap="2">
          <Flex direction="row" gap="2">
            <TextField size="2" placeholder="Dennis Ritchie"></TextField>
            <TextField size="2" placeholder="Dennis Ritchie"></TextField>
            <TextField
              size="2"
              placeholder="placeholder"
              defaultValue="Dennis Ritchie"
            />
            <TextField
              size="2"
              placeholder="placeholder"
              defaultValue="Dennis Ritchie"
              readOnly
            />
            <TextField
              size="2"
              placeholder="placeholder"
              defaultValue="Dennis Ritchie"
              disabled
            />
            <TextField
              size="2"
              placeholder="placeholder"
              defaultValue="Dennis Ritchie"
              variant="ghost"
            />
            <TextField
              size="2"
              placeholder="placeholder"
              defaultValue="Dennis Ritchie"
              variant="totalGhost"
            />
          </Flex>
          <Flex direction="row" gap="2">
            <TextField
              size="1"
              type="email"
              placeholder="thompson@bell-labs.com"
            />
            <TextField size="1" type="password" placeholder="password" />
            <TextField size="1" type="number" placeholder="5" />
            <TextField size="1" type="date" />
            <TextField size="1" type="file" />
          </Flex>
          <Flex direction="row" gap="2">
            <TextField
              size="2"
              type="email"
              placeholder="thompson@bell-labs.com"
            />
            <TextField
              size="2"
              type="password"
              placeholder="password"
              defaultValue="foobar"
            />
            <TextField size="2" type="number" placeholder="5" />
            <TextField size="2" type="date" />
            <TextField size="2" type="file" />
          </Flex>
          <Flex direction="row" gap="2">
            <TextField
              size="3"
              type="email"
              placeholder="thompson@bell-labs.com"
            />
            <TextField size="3" type="password" placeholder="password" />
            <TextField size="3" type="number" placeholder="5" />
            <TextField size="3" type="date" />
            <TextField size="3" type="file" />
          </Flex>
          <Flex direction="row" gap="2">
            <TextField
              size="2"
              type="email"
              state="invalid"
              placeholder="thompson@bell-labs.com"
              defaultValue="thompson@@belllabs"
            />
            <TextField
              size="2"
              type="email"
              placeholder="thompson@bell-labs.com"
            />
            <TextField
              size="2"
              type="email"
              state="valid"
              placeholder="thompson@bell-labs.com"
            />
          </Flex>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>TextArea</SubsectionHeading>
        <Flex direction="row" gap="1">
          <TextArea size="1" defaultValue="Here be dragons" />
          <TextArea size="2" state="invalid" defaultValue="Here be dragons" />
          <TextArea size="3" state="valid" defaultValue="Here be dragons" />
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Checkbox</SubsectionHeading>
        <Flex direction="row" gap="1">
          <Checkbox size="1" />
          <Checkbox size="2" />
          <Checkbox size="1" defaultChecked />
          <Checkbox size="2" defaultChecked />
          <Checkbox disabled size="1" />
          <Checkbox disabled size="2" defaultChecked />
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Switch</SubsectionHeading>
        <Flex direction="row" gap="1">
          <Switch size="1" />
          <Switch size="2" />
          <Switch size="1" defaultChecked />
          <Switch size="2" defaultChecked />
          <Switch disabled size="1" />
          <Switch disabled size="2" defaultChecked />
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Radio</SubsectionHeading>
        <Flex direction="row" gap="3">
          <RadioGroup css={{ display: 'flex', gap: '$1' }}>
            <Radio size="1" value="1" />
            <Radio size="1" value="2" />
            <Radio size="2" value="3" />
          </RadioGroup>
          <RadioGroup defaultValue="2" css={{ display: 'flex', gap: '$1' }}>
            <Radio size="1" value="1" />
            <Radio size="2" value="2" />
          </RadioGroup>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Select</SubsectionHeading>
        <Flex direction="row" gap="1">
          <Select>
            <option>Option A</option>
            <option>Option B</option>
            <option>Option C</option>
            <option>Option D</option>
          </Select>
          <Select disabled>
            <option>Option A</option>
            <option>Option B</option>
            <option>Option C</option>
            <option>Option D</option>
          </Select>
        </Flex>
      </Section>
    </Section>
  )
}
