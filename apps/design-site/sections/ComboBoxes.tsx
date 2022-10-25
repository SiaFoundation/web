import {
  Flex,
  Grid,
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
      <Section css={{ pt: '$9' }}>
        <SubsectionHeading>ComboBox</SubsectionHeading>
        <Flex direction="column" gap="3">
          <SmallSection>sizes</SmallSection>
          <Grid
            columns={{
              '@initial': 1,
              '@bp1': 3,
            }}
            gap="1"
          >
            <ComboBox options={options} size="1" />
            <ComboBox options={options} size="2" />
            <ComboBox options={options} size="3" />
          </Grid>
          <SmallSection>
            controlled, <Code>disabled</Code>
          </SmallSection>
          <Grid
            columns={{
              '@initial': 1,
              '@bp1': 3,
            }}
            gap="1"
          >
            <ComboBox
              value={value}
              onChange={setValue}
              options={options}
              size="2"
            />
            <ComboBox
              value={value}
              disabled
              onChange={setValue}
              options={options}
              size="2"
            />
          </Grid>
          <SmallSection>
            with <Code>prefix</Code> and <Code>{`indicators={false}`}</Code>
          </SmallSection>
          <SmallSection>
            with <Code>{`state="invalid"`}</Code> and{' '}
            <Code>{`state="valid"`}</Code>
          </SmallSection>
          <Grid
            columns={{
              '@initial': 2,
              '@bp1': 4,
            }}
            gap="1"
          >
            <ComboBox
              options={options}
              size="1"
              indicators={false}
              prefix={<Prefix n={1} />}
            />
            <ComboBox
              options={options}
              size="1"
              indicators={false}
              prefix={<Prefix n={2} />}
            />
            <ComboBox
              options={options}
              size="1"
              indicators={false}
              prefix={<Prefix n={3} />}
            />
            <ComboBox
              options={options}
              size="1"
              indicators={false}
              prefix={<Prefix n={4} />}
            />
            <ComboBox
              options={options}
              size="1"
              indicators={false}
              state="invalid"
              prefix={<Prefix n={11} />}
            />
            <ComboBox
              options={options}
              size="1"
              indicators={false}
              state="valid"
              prefix={<Prefix n={12} />}
            />
            <ComboBox
              options={options}
              size="1"
              indicators={false}
              prefix={<Prefix n={13} />}
            />
            <ComboBox
              options={options}
              size="1"
              indicators={false}
              prefix={<Prefix n={14} />}
            />
          </Grid>
        </Flex>
      </Section>
      <Section css={{ pt: '$9' }}>
        <SubsectionHeading>Mixed</SubsectionHeading>
        <Flex direction="row" gap="1">
          <ComboBox options={options} size="1" />
          <TextField
            size="1"
            type="email"
            state="invalid"
            placeholder="thompson@bell-labs.com"
            defaultValue="thompson@@belllabs"
          />
          <ComboBox options={options} size="2" />
          <TextField
            size="2"
            type="email"
            state="invalid"
            placeholder="thompson@bell-labs.com"
            defaultValue="thompson@@belllabs"
          />
          <ComboBox options={options} size="3" />
          <ComboBox options={options} size="3" />
        </Flex>
      </Section>
    </>
  )
}

function Prefix({ n }) {
  return (
    <Text size="10" color="subtle" css={{ width: '16px', textAlign: 'right' }}>
      {n}
    </Text>
  )
}
