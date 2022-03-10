import {
  Checkbox,
  Dropzone,
  Flex,
  Grid,
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
          <Grid columns={{ '@initial': 1, '@bp1': 4 }} gap="2">
            <TextField size="2" placeholder="Ada Lovelace"></TextField>
            <TextField size="2" placeholder="Ada Lovelace"></TextField>
            <TextField
              size="2"
              placeholder="placeholder"
              defaultValue="Ada Lovelace"
            />
            <TextField
              size="2"
              placeholder="placeholder"
              defaultValue="Ada Lovelace"
              readOnly
            />
            <TextField
              size="2"
              placeholder="placeholder"
              defaultValue="Ada Lovelace"
              disabled
            />
            <TextField
              size="2"
              placeholder="placeholder"
              defaultValue="Ada Lovelace"
              variant="ghost"
            />
            <TextField
              size="2"
              placeholder="placeholder"
              defaultValue="Ada Lovelace"
              variant="totalGhost"
            />
          </Grid>
          <Grid columns={{ '@initial': 1, '@bp1': 3 }} gap="2">
            <TextField
              size="1"
              type="email"
              placeholder="thompson@bell-labs.com"
            />
            <TextField size="1" type="password" placeholder="password" />
            <TextField size="1" type="number" placeholder="5" />
          </Grid>
          <Grid columns={{ '@initial': 1, '@bp1': 3 }} gap="2">
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
          </Grid>
          <Grid columns={{ '@initial': 1, '@bp1': 3 }} gap="2">
            <TextField size="1" type="date" />
            <TextField size="2" type="date" />
          </Grid>
          <Grid columns={{ '@initial': 1, '@bp1': 3 }} gap="2">
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
          </Grid>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Dropzone</SubsectionHeading>
        <Dropzone onFiles={() => null} />
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
        <Grid columns={{ '@initial': 1, '@bp2': 2, '@bp4': 3 }} gap="2">
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
          <Flex direction="row" gap="1">
            <Select size="2">
              <option>Option A</option>
              <option>Option B</option>
              <option>Option C</option>
              <option>Option D</option>
            </Select>
            <Select disabled size="2">
              <option>Option A</option>
              <option>Option B</option>
              <option>Option C</option>
              <option>Option D</option>
            </Select>
          </Flex>
        </Grid>
      </Section>
    </Section>
  )
}
