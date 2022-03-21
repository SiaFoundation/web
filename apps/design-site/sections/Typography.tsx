import {
  Code,
  Codeblock,
  Flex,
  Grid,
  Heading,
  Kbd,
  NextLink,
  Paragraph,
  Section,
  Text,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

const randomLink = 'https://urbit.org/'
const exampleCode = `func Fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return Fibonacci(n-1) + Fibonacci(n-2)
}
`

export function Typography() {
  return (
    <>
      <Section size="1">
        <SectionHeading>Typography</SectionHeading>
      </Section>
      <Section>
        <SubsectionHeading>Headings</SubsectionHeading>
        <Flex direction="column" gap="2">
          <Heading size="1">Heading 1</Heading>
          <Heading size="2">Heading 2</Heading>
          <Heading size="3">Heading 3</Heading>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Text</SubsectionHeading>
        <Flex direction="column" gap="2">
          <Text size="10">Tiny processors 10</Text>
          <Text size="12">Tiny processors 12</Text>
          <Text size="14">Tools for thought 14</Text>
          <Text size="16">A web of information and ideas - 16 contrast</Text>
          <Text size="20" color="subtle">
            A computer that fits in your pocket - 20 subtle
          </Text>
          <Text size="24" css={{ fontStyle: 'italic' }}>
            Brain-computer interface - 24 italic
          </Text>
          <Text size="32">Human test subjects - 32</Text>
          <Text size="40">Text size 40</Text>
          <Text size="64" color="subtle">
            Text size 64 - subtle
          </Text>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Link</SubsectionHeading>
        <Flex direction="column" gap="2" align="start">
          <NextLink href={randomLink} target="_blank" variant="subtle">
            Subtle link
          </NextLink>
          <NextLink href={randomLink} target="_blank" variant="contrast">
            Contrast link
          </NextLink>
          <NextLink href={randomLink} target="_blank" variant="accent">
            Accent link
          </NextLink>
          <Text size="24">
            <NextLink href={randomLink} target="_blank">
              Link inside Text size 5
            </NextLink>
          </Text>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Code</SubsectionHeading>
        <Flex direction="column" gap="2" align="start">
          <Code variant="gray">{'fmt.Println("variant=gray")'}</Code>
          <Code variant="accent">{'fmt.Println("variant=accent")'}</Code>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Codeblock</SubsectionHeading>
        <Codeblock>{exampleCode}</Codeblock>
        <Flex direction="column" gap="2" align="start"></Flex>
      </Section>
      <Section>
        <SubsectionHeading>Paragraph</SubsectionHeading>
        <Flex direction="column" gap="5">
          <Grid
            columns={{
              '@bp1': 1,
              '@bp2': 2,
            }}
            gap="2"
          >
            <Paragraph size="1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt <Code>{'fmt.Println("pizza")'}</Code> ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure{' '}
              <NextLink variant="subtle" href={randomLink} target="_blank">
                example of an inline link
              </NextLink>{' '}
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.{' '}
              <NextLink variant="contrast" href={randomLink} target="_blank">
                Example of an inline link
              </NextLink>{' '}
              <Code variant="gray">{'fmt.Println("pasta")'}</Code>. Excepteur
              sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </Paragraph>
            <Paragraph size="2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt <Code>{'fmt.Println("pizza")'}</Code> ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure{' '}
              <NextLink variant="subtle" href={randomLink} target="_blank">
                example of an inline link
              </NextLink>{' '}
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.{' '}
              <NextLink variant="contrast" href={randomLink} target="_blank">
                Example of an inline link
              </NextLink>{' '}
              <Code variant="gray">{'fmt.Println("pasta")'}</Code>. Excepteur
              sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </Paragraph>
          </Grid>
          <Paragraph size="3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt <Code>{'fmt.Println("pizza")'}</Code> ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure{' '}
            <NextLink variant="subtle" href={randomLink} target="_blank">
              example of an inline link
            </NextLink>{' '}
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur.{' '}
            <NextLink variant="contrast" href={randomLink} target="_blank">
              Example of an inline link
            </NextLink>{' '}
            <Code variant="gray">{'fmt.Println("pasta")'}</Code>. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Paragraph>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Keyboard</SubsectionHeading>
        <Flex direction="column" gap="3">
          <Flex direction="row" gap="1" wrap="wrap">
            <Kbd>⌘</Kbd>
            <Kbd>⌥</Kbd>
            <Kbd>Tab</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>⌘</Kbd>
            <Kbd>4</Kbd>
            <Kbd>Q</Kbd>
            <Kbd>Space</Kbd>
          </Flex>
        </Flex>
      </Section>
    </>
  )
}
