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
  Text,
  TextArea,
  TextField,
  RadioCard,
  RadioCardGroup,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'
import { ComboBoxes } from './ComboBoxes'

export function Inputs() {
  return (
    <>
      <Section css={{ pt: '$12' }}>
        <SectionHeading>Inputs</SectionHeading>
      </Section>
      <Section css={{ pt: '$9' }}>
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
          <Grid columns={{ '@initial': 1, '@bp1': 4 }} gap="2">
            <TextField size="3" placeholder="Ada Lovelace" />
            <TextField
              size="3"
              placeholder="placeholder"
              defaultValue="Ada Lovelace"
              variant="totalGhost"
            />
            <TextField
              size="3"
              placeholder="placeholder"
              defaultValue="Ada Lovelace"
              variant="totalGhost"
              readOnly
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
      <Section css={{ pt: '$9' }}>
        <SubsectionHeading>Dropzone</SubsectionHeading>
        <Dropzone onFiles={() => null} />
      </Section>
      <Section css={{ pt: '$9' }}>
        <SubsectionHeading>TextArea</SubsectionHeading>
        <Flex direction="row" gap="1">
          <TextArea size="1" defaultValue="Here be dragons" />
          <TextArea size="2" state="invalid" defaultValue="Here be dragons" />
          <TextArea size="2" state="valid" defaultValue="Here be dragons" />
        </Flex>
      </Section>
      <Section css={{ pt: '$9' }}>
        <SubsectionHeading>Checkbox</SubsectionHeading>
        <Flex direction="row" gap="1">
          <Checkbox size="1">Checkbox</Checkbox>
          <Checkbox size="2">Checkbox</Checkbox>
          <Checkbox size="1" defaultChecked>
            Checkbox
          </Checkbox>
          <Checkbox size="2" defaultChecked>
            Checkbox
          </Checkbox>
          <Checkbox disabled size="1">
            Checkbox
          </Checkbox>
          <Checkbox disabled size="2" defaultChecked>
            Checkbox
          </Checkbox>
        </Flex>
      </Section>
      <Section css={{ pt: '$9' }}>
        <SubsectionHeading>Switch</SubsectionHeading>
        <Flex direction="row" gap="1">
          <Switch size="1">Switch</Switch>
          <Switch size="2">Switch</Switch>
          <Switch size="1" defaultChecked>
            Switch
          </Switch>
          <Switch size="2" defaultChecked>
            Switch
          </Switch>
          <Switch disabled size="1">
            Switch
          </Switch>
          <Switch disabled size="2" defaultChecked>
            Switch
          </Switch>
        </Flex>
      </Section>
      <Section css={{ pt: '$9' }}>
        <SubsectionHeading>Radio</SubsectionHeading>
        <Flex direction="row" gap="3">
          <RadioGroup css={{ display: 'flex', gap: '$1' }}>
            <Radio size="1" value="1">
              1
            </Radio>
            <Radio size="1" value="2">
              2
            </Radio>
            <Radio size="2" value="3">
              3
            </Radio>
          </RadioGroup>
          <RadioGroup defaultValue="2" css={{ display: 'flex', gap: '$1' }}>
            <Radio size="1" value="1">
              1
            </Radio>
            <Radio size="2" value="2">
              2
            </Radio>
          </RadioGroup>
        </Flex>
      </Section>
      <Section css={{ pt: '$9' }}>
        <SubsectionHeading>RadioCard</SubsectionHeading>
        <RadioCardGroup>
          <Grid columns="2" gap="2">
            <RadioCard value="1">
              <Flex direction="column" gap="1">
                <Text size="18">Create a new wallet</Text>
                <Text>Generates a new wallet seed.</Text>
              </Flex>
            </RadioCard>
            <RadioCard value="2">
              <Flex direction="column" gap="1">
                <Text size="18">Recover an existing wallet</Text>
                <Text>Add an existing wallet seed.</Text>
              </Flex>
            </RadioCard>
            <RadioCard value="3">
              <Flex direction="column" gap="1">
                <Text size="18">Recover an existing wallet via addresses</Text>
                <Text>Add an existing wallet via address.</Text>
              </Flex>
            </RadioCard>
            <RadioCard value="4">
              <Flex direction="column" gap="1">
                <Text size="18">Add a Ledger hardware wallet</Text>
                <Text>Add an existing hardware wallet.</Text>
              </Flex>
            </RadioCard>
          </Grid>
        </RadioCardGroup>
        <RadioCardGroup onChange={(val) => alert(val)}>
          <Grid columns="2" gap="2">
            <RadioCard indicator={false} value="1">
              <Flex direction="column" gap="1">
                <Text size="18">Create a new wallet</Text>
                <Text>Generates a new wallet seed.</Text>
              </Flex>
            </RadioCard>
            <RadioCard indicator={false} value="2">
              <Flex direction="column" gap="1">
                <Text size="18">Recover an existing wallet</Text>
                <Text>Add an existing wallet seed.</Text>
              </Flex>
            </RadioCard>
            <RadioCard indicator={false} value="3">
              <Flex direction="column" gap="1">
                <Text size="18">Recover an existing wallet via addresses</Text>
                <Text>Add an existing wallet via address.</Text>
              </Flex>
            </RadioCard>
            <RadioCard indicator={false} value="4">
              <Flex direction="column" gap="1">
                <Text size="18">Add a Ledger hardware wallet</Text>
                <Text>Add an existing hardware wallet.</Text>
              </Flex>
            </RadioCard>
          </Grid>
        </RadioCardGroup>
      </Section>
      <Section css={{ pt: '$9' }}>
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
      <ComboBoxes />
    </>
  )
}
