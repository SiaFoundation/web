import {
  Section,
  Text,
  TextField,
  ComboBox,
  Code,
  mnemonics,
} from '@siafoundation/design-system'
import { useState } from 'react'
import { SmallSection } from '../components/SmallSection'
import { SubsectionHeading } from '../components/SubsectionHeading'

const options = mnemonics.map((word) => ({
  label: word,
  value: word,
}))

export function ComboBoxes() {
  const [value, setValue] = useState<{ label: string; value: string }>(
    options[0]
  )
  return (
    <>
      <Section className="pt-20">
        <SubsectionHeading>ComboBox</SubsectionHeading>
        <div className="flex flex-col gap-6">
          <SmallSection>sizes</SmallSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <ComboBox options={options} size="small" />
            <ComboBox options={options} size="medium" />
            <ComboBox options={options} size="large" />
          </div>
          <SmallSection>
            controlled, <Code>disabled</Code>
          </SmallSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <ComboBox
              value={value}
              onChange={setValue}
              options={options}
              size="medium"
            />
            <ComboBox
              value={value}
              disabled
              onChange={setValue}
              options={options}
              size="medium"
            />
          </div>
          <SmallSection>
            with <Code>prefix</Code> and <Code>{`indicators={false}`}</Code>
          </SmallSection>
          <SmallSection>
            with <Code>{`state="invalid"`}</Code> and{' '}
            <Code>{`state="valid"`}</Code>
          </SmallSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <ComboBox
              options={options}
              size="small"
              indicators={false}
              prefix={<Prefix n={1} />}
            />
            <ComboBox
              options={options}
              size="small"
              indicators={false}
              prefix={<Prefix n={2} />}
            />
            <ComboBox
              options={options}
              size="small"
              indicators={false}
              prefix={<Prefix n={3} />}
            />
            <ComboBox
              options={options}
              size="small"
              indicators={false}
              prefix={<Prefix n={4} />}
            />
            <ComboBox
              options={options}
              size="small"
              indicators={false}
              state="invalid"
              prefix={<Prefix n={11} />}
            />
            <ComboBox
              options={options}
              size="small"
              indicators={false}
              state="valid"
              prefix={<Prefix n={12} />}
            />
            <ComboBox
              options={options}
              size="small"
              indicators={false}
              prefix={<Prefix n={13} />}
            />
            <ComboBox
              options={options}
              size="small"
              indicators={false}
              prefix={<Prefix n={14} />}
            />
          </div>
        </div>
      </Section>
      <Section className="pt-20">
        <SubsectionHeading>Mixed</SubsectionHeading>
        <div className="flex gap-2">
          <ComboBox options={options} size="small" />
          <TextField
            size="small"
            type="email"
            state="invalid"
            placeholder="thompson@bell-labs.com"
            defaultValue="thompson@@belllabs"
          />
          <ComboBox options={options} size="medium" />
          <TextField
            size="medium"
            type="email"
            state="invalid"
            placeholder="thompson@bell-labs.com"
            defaultValue="thompson@@belllabs"
          />
          <ComboBox options={options} size="large" />
          <ComboBox options={options} size="large" />
        </div>
      </Section>
    </>
  )
}

function Prefix({ n }) {
  return (
    <Text size="10" color="subtle" className="w-4 text-right">
      {n}
    </Text>
  )
}
