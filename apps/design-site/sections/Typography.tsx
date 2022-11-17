import {
  Code,
  Codeblock,
  Heading,
  Link,
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
      <Section>
        <SectionHeading>Typography</SectionHeading>
        <SubsectionHeading>Headings</SubsectionHeading>
        <div className="flex flex-col gap-4">
          <Heading size="20">Heading 20</Heading>
          <Heading size="24">Heading 24</Heading>
          <Heading size="32">Heading 32</Heading>
          <Heading size="64">Heading 64</Heading>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Text</SubsectionHeading>
        <div className="flex flex-col gap-4">
          <Text size="10">Tiny processors 10</Text>
          <Text size="12">Tiny processors 12</Text>
          <Text size="14">Tools for thought 14</Text>
          <Text size="16">A web of information and ideas - 16 contrast</Text>
          <Text size="20" color="subtle">
            A computer that fits in your pocket - 20 subtle
          </Text>
          <Text size="24" className="italic">
            Brain-computer interface - 24 italic
          </Text>
          <Text size="30">Human test subjects - 30</Text>
          <Text size="40">Text size 40</Text>
          <Text size="64" color="subtle">
            Text size 64 - subtle
          </Text>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Link</SubsectionHeading>
        <div className="flex flex-col gap-4 items-start">
          <Link size="14" href={randomLink} target="_blank" color="subtle">
            Subtle link
          </Link>
          <Link size="14" href={randomLink} target="_blank" color="contrast">
            Contrast link
          </Link>
          <Link size="14" href={randomLink} target="_blank" color="accent">
            Accent link
          </Link>
          <Text size="24">
            <Link href={randomLink} target="_blank">
              Link inside Text size 5
            </Link>
          </Text>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Code</SubsectionHeading>
        <div className="flex flex-col gap-4 items-start">
          <Paragraph size="14">
            <Code color="gray">{'fmt.Println("color=gray")'}</Code>{' '}
            <Code color="accent">{'fmt.Println("color=accent")'}</Code>
          </Paragraph>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Codeblock</SubsectionHeading>
        <Codeblock>{exampleCode}</Codeblock>
      </Section>
      <Section>
        <SubsectionHeading>Paragraph</SubsectionHeading>
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Paragraph size="14">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt <Code>{'fmt.Println("pizza")'}</Code> ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis{' '}
              <Code>{'fmt.Println("pizza")'}</Code> ut nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure{' '}
              <Link color="subtle" href={randomLink} target="_blank">
                example of an inline link
              </Link>{' '}
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.{' '}
              <Link color="contrast" href={randomLink} target="_blank">
                Example of an inline link
              </Link>{' '}
              <Code color="gray">{'fmt.Println("pasta")'}</Code>. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </Paragraph>
            <Paragraph size="18">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt <Code>{'fmt.Println("pizza")'}</Code> ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure{' '}
              <Link color="subtle" href={randomLink} target="_blank">
                example of an inline link
              </Link>{' '}
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.{' '}
              <Link color="contrast" href={randomLink} target="_blank">
                Example of an inline link
              </Link>{' '}
              <Code color="gray">{'fmt.Println("pasta")'}</Code>. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </Paragraph>
          </div>
          <Paragraph size="20">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt <Code>{'fmt.Println("pizza")'}</Code> ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure{' '}
            <Link color="subtle" href={randomLink} target="_blank">
              example of an inline link
            </Link>{' '}
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur.{' '}
            <Link color="contrast" href={randomLink} target="_blank">
              Example of an inline link
            </Link>{' '}
            <Code color="gray">{'fmt.Println("pasta")'}</Code>. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Paragraph>
        </div>
      </Section>
    </>
  )
}
