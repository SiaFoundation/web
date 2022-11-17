import {
  Checkbox,
  Dropzone,
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
      <Section>
        <SectionHeading>Inputs</SectionHeading>
        <SubsectionHeading>TextField</SubsectionHeading>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <TextField size="small" placeholder="Ada Lovelace" />
            <TextField
              size="small"
              placeholder="Ada Lovelace"
              defaultValue="Ada Lovelace"
            />
            <TextField size="small" value="Ada Lovelace" readOnly />
            <TextField
              size="small"
              placeholder="placeholder"
              defaultValue="Ada Lovelace"
              disabled
            />
            <TextField
              size="small"
              placeholder="placeholder"
              defaultValue="Ada Lovelace"
              variant="ghost"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField size="medium" placeholder="Ada Lovelace" />
            <TextField
              size="medium"
              placeholder="Ada Lovelace"
              defaultValue="Ada Lovelace"
            />
            <TextField size="medium" value="Ada Lovelace" readOnly />
            <TextField
              size="medium"
              placeholder="placeholder"
              defaultValue="Ada Lovelace"
              disabled
            />
            <TextField
              size="medium"
              placeholder="placeholder"
              defaultValue="Ada Lovelace"
              variant="ghost"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField size="large" placeholder="Ada Lovelace" />
            <TextField
              size="large"
              placeholder="Ada Lovelace"
              defaultValue="Ada Lovelace"
            />
            <TextField size="large" value="Ada Lovelace" readOnly />
            <TextField
              size="large"
              placeholder="placeholder"
              defaultValue="Ada Lovelace"
              disabled
            />
            <TextField
              size="large"
              placeholder="placeholder"
              defaultValue="Ada Lovelace"
              variant="ghost"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TextField
              size="small"
              type="email"
              placeholder="thompson@bell-labs.com"
            />
            <TextField size="small" type="password" placeholder="password" />
            <TextField size="small" type="number" placeholder="5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TextField
              size="medium"
              type="email"
              placeholder="thompson@bell-labs.com"
            />
            <TextField
              size="medium"
              type="password"
              placeholder="password"
              defaultValue="foobar"
            />
            <TextField size="medium" type="number" placeholder="5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TextField size="small" type="date" />
            <TextField size="medium" type="date" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TextField
              size="medium"
              type="email"
              state="invalid"
              placeholder="thompson@bell-labs.com"
              defaultValue="thompson@@belllabs"
            />
            <TextField
              size="medium"
              type="email"
              placeholder="thompson@bell-labs.com"
            />
            <TextField
              size="medium"
              type="email"
              state="valid"
              placeholder="thompson@bell-labs.com"
            />
          </div>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Dropzone</SubsectionHeading>
        <Dropzone onFiles={() => null} />
      </Section>
      <Section>
        <SubsectionHeading>TextArea</SubsectionHeading>
        <div className="flex gap-2">
          <TextArea size="small" defaultValue="Here be dragons" />
          <TextArea
            size="medium"
            state="invalid"
            defaultValue="Here be dragons"
          />
          <TextArea
            size="medium"
            state="valid"
            defaultValue="Here be dragons"
          />
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Checkbox</SubsectionHeading>
        <div className="flex gap-2">
          <Checkbox size="small">Checkbox</Checkbox>
          <Checkbox size="medium">Checkbox</Checkbox>
          <Checkbox size="small" defaultChecked>
            Checkbox
          </Checkbox>
          <Checkbox size="medium" defaultChecked>
            Checkbox
          </Checkbox>
          <Checkbox disabled size="small">
            Checkbox
          </Checkbox>
          <Checkbox disabled size="medium" defaultChecked>
            Checkbox
          </Checkbox>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Switch</SubsectionHeading>
        <div className="flex gap-2">
          <Switch size="small">Switch</Switch>
          <Switch size="medium">Switch</Switch>
          <Switch size="small" defaultChecked>
            Switch
          </Switch>
          <Switch size="medium" defaultChecked>
            Switch
          </Switch>
          <Switch disabled size="small">
            Switch
          </Switch>
          <Switch disabled size="medium" defaultChecked>
            Switch
          </Switch>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Radio</SubsectionHeading>
        <div className="flex gap-6">
          <RadioGroup className="flex gap-2">
            <Radio size="small" value="1">
              1
            </Radio>
            <Radio size="small" value="2">
              2
            </Radio>
            <Radio size="medium" value="3">
              3
            </Radio>
          </RadioGroup>
          <RadioGroup defaultValue="2">
            <Radio size="small" value="1">
              1
            </Radio>
            <Radio size="medium" value="2">
              2
            </Radio>
          </RadioGroup>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>RadioCard</SubsectionHeading>
        <RadioCardGroup>
          <div className="grid grid-cols-2 gap-4">
            <RadioCard value="1">
              <div className="flex flex-col gap-2 items-start">
                <Text size="18">Create a new wallet</Text>
                <Text>Generates a new wallet seed.</Text>
              </div>
            </RadioCard>
            <RadioCard value="2">
              <div className="flex flex-col gap-2 items-start">
                <Text size="18">Recover an existing wallet</Text>
                <Text>Add an existing wallet seed.</Text>
              </div>
            </RadioCard>
            <RadioCard value="3">
              <div className="flex flex-col gap-2 items-start">
                <Text size="18">Recover an existing wallet via addresses</Text>
                <Text>Add an existing wallet via address.</Text>
              </div>
            </RadioCard>
            <RadioCard value="4">
              <div className="flex flex-col gap-2 items-start">
                <Text size="18">Add a Ledger hardware wallet</Text>
                <Text>Add an existing hardware wallet.</Text>
              </div>
            </RadioCard>
          </div>
        </RadioCardGroup>
        <RadioCardGroup className="pt-12" onChange={(val) => alert(val)}>
          <div className="grid grid-cols-2 gap-4">
            <RadioCard indicator={false} value="1">
              <div className="flex flex-col gap-2 items-start">
                <Text size="18">Create a new wallet</Text>
                <Text>Generates a new wallet seed.</Text>
              </div>
            </RadioCard>
            <RadioCard indicator={false} value="2">
              <div className="flex flex-col gap-2 items-start">
                <Text size="18">Recover an existing wallet</Text>
                <Text>Add an existing wallet seed.</Text>
              </div>
            </RadioCard>
            <RadioCard indicator={false} value="3">
              <div className="flex flex-col gap-2 items-start">
                <Text size="18">Recover an existing wallet via addresses</Text>
                <Text>Add an existing wallet via address.</Text>
              </div>
            </RadioCard>
            <RadioCard indicator={false} value="4">
              <div className="flex flex-col gap-2 items-start">
                <Text size="18">Add a Ledger hardware wallet</Text>
                <Text>Add an existing hardware wallet.</Text>
              </div>
            </RadioCard>
          </div>
        </RadioCardGroup>
      </Section>
      <Section>
        <SubsectionHeading>Select</SubsectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex gap-2">
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
          </div>
          <div className="flex gap-2">
            <Select size="medium">
              <option>Option A</option>
              <option>Option B</option>
              <option>Option C</option>
              <option>Option D</option>
            </Select>
            <Select disabled size="medium">
              <option>Option A</option>
              <option>Option B</option>
              <option>Option C</option>
              <option>Option D</option>
            </Select>
          </div>
          <div className="flex gap-2">
            <Select size="large">
              <option>Option A</option>
              <option>Option B</option>
              <option>Option C</option>
              <option>Option D</option>
            </Select>
            <Select disabled size="large">
              <option>Option A</option>
              <option>Option B</option>
              <option>Option C</option>
              <option>Option D</option>
            </Select>
          </div>
        </div>
      </Section>
      <ComboBoxes />
    </>
  )
}
