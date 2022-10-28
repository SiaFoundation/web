/* eslint-disable react/no-unescaped-entities */
import {
  Flex,
  Paragraph,
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Codeblock,
  Link,
  webLinks,
} from '@siafoundation/design-system'
import { Versions } from '../content/versions'

type Props = {
  versions: Versions
}

export function SoftwareSignAccordion({ versions }: Props) {
  return (
    <Accordion type="single">
      <AccordionItem value="steps" variant="ghost">
        <AccordionTrigger variant="ghost">
          <Flex direction="column" gap="3">
            <Paragraph size="18">
              As a reminder, all release binaries are signed. You can download
              the signing key{' '}
              <Link
                onClick={(e) => {
                  e.stopPropagation()
                }}
                target="_blank"
                href={`${webLinks.website}/releases/sia-signing-key.asc`}
              >
                here
              </Link>
              , and the signed hashes for the current release{' '}
              <Link
                onClick={(e) => {
                  e.stopPropagation()
                }}
                target="_blank"
                href={`${webLinks.website}/releases/siad/Sia-v${versions.sia.latest}-SHA256SUMS.txt.asc`}
              >
                here
              </Link>
              .
            </Paragraph>
            <Paragraph size="18">
              <Link>Learn how to verify a release</Link>
            </Paragraph>
          </Flex>
        </AccordionTrigger>
        <AccordionContent css={{ margin: '$3 0' }}>
          <Flex direction="column" gap="1">
            <Paragraph size="14">
              1. Download and import the Sia signing key.
            </Paragraph>
            <Codeblock>
              {`wget -c ${webLinks.website}/releases/sia-signing-key.asc
gpg --import sia-signing-key.asc`}
            </Codeblock>

            <Paragraph size="14">
              2. Download the signed hash file, and verify the signature.
            </Paragraph>
            <Codeblock>
              {`wget -c ${webLinks.website}/releases/siad/Sia-v${versions.sia.latest}-SHA256SUMS.txt.asc
gpg --verify Sia-v${versions.sia.latest}-SHA256SUMS.txt.asc`}
            </Codeblock>

            <Paragraph size="14">
              3. If you downloaded a zip file, unzip that first.
            </Paragraph>
            <Codeblock>
              unzip Sia-v{versions.sia.latest}-linux-amd64.zip
            </Codeblock>

            <Paragraph size="14">
              4. Check that the files you downloaded were signed.
            </Paragraph>
            <Codeblock>
              sha256sum --check --ignore-missing Sia-v
              {versions.sia.latest}-SHA256SUMS.txt.asc
            </Codeblock>

            <Paragraph size="14">
              You should see "OK" next to the files you did download and errors
              for the files you have not downloaded.
            </Paragraph>
          </Flex>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
