import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  NLink,
  Paragraph,
  Section,
  Text,
} from '@siafoundation/design-system'
import { times } from 'lodash'
import { Fragment } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Colors() {
  return (
    <Section size="2">
      <Flex direction="column" gap="5">
        <SectionHeading>Colors</SectionHeading>
        <Legend />
        <Section>
          <SubsectionHeading>Brand color system</SubsectionHeading>
          <Paragraph size="1" css={{ pb: '$4' }}>
            <NLink
              href="https://support.sia.tech/sia-integrations/sia-brand-guidelines"
              target="_blank"
            >
              Learn more about the Sia brand guidelines (OUTDATED) →
            </NLink>
          </Paragraph>
          <Flex direction="column" gap="2">
            <Grid
              css={{
                gridTemplateColumns: 'repeat(13, minmax(0, 1fr))',
                gap: 2,
                ai: 'center',
              }}
            >
              <Headers />
              <Box>
                <Text size="2">Accent</Text>
              </Box>
              <Box css={{ height: 35, backgroundColor: '$brandAccent1' }} />
              <Box css={{ height: 35, backgroundColor: '$brandAccent2' }} />
              <Box css={{ height: 35, backgroundColor: '$brandAccent3' }} />
              <Box css={{ height: 35, backgroundColor: '$brandAccent4' }} />
              <Box css={{ height: 35, backgroundColor: '$brandAccent5' }} />
              <Box css={{ height: 35, backgroundColor: '$brandAccent6' }} />
              <Box css={{ height: 35, backgroundColor: '$brandAccent7' }} />
              <Box css={{ height: 35, backgroundColor: '$brandAccent8' }} />
              <Box css={{ height: 35, backgroundColor: '$brandAccent9' }} />
              <Box css={{ height: 35, backgroundColor: '$brandAccent10' }} />
              <Box css={{ height: 35, backgroundColor: '$brandAccent11' }} />
              <Box css={{ height: 35, backgroundColor: '$brandAccent12' }} />
              <Box>
                <Text css={{ fontSize: '$2' }}>Gray</Text>
              </Box>
              <Box css={{ height: 35, backgroundColor: '$brandGray1' }} />
              <Box css={{ height: 35, backgroundColor: '$brandGray2' }} />
              <Box css={{ height: 35, backgroundColor: '$brandGray3' }} />
              <Box css={{ height: 35, backgroundColor: '$brandGray4' }} />
              <Box css={{ height: 35, backgroundColor: '$brandGray5' }} />
              <Box css={{ height: 35, backgroundColor: '$brandGray6' }} />
              <Box css={{ height: 35, backgroundColor: '$brandGray7' }} />
              <Box css={{ height: 35, backgroundColor: '$brandGray8' }} />
              <Box css={{ height: 35, backgroundColor: '$brandGray9' }} />
              <Box css={{ height: 35, backgroundColor: '$brandGray10' }} />
              <Box css={{ height: 35, backgroundColor: '$brandGray11' }} />
              <Box css={{ height: 35, backgroundColor: '$brandGray12' }} />
            </Grid>
          </Flex>
        </Section>
        <Section>
          <SubsectionHeading>
            Semantic color system (@radix-ui/colors)
          </SubsectionHeading>
          <Paragraph size="1" css={{ pb: '$4' }}>
            <NLink
              href="https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale"
              target="_blank"
            >
              Learn more about the Radix color scales →
            </NLink>
          </Paragraph>
          <Grid
            css={{
              gridTemplateColumns: 'repeat(13, minmax(0, 1fr))',
              gap: 2,
              ai: 'center',
            }}
          >
            <Headers />
            <Box>
              <Text css={{ fontSize: '$2' }}>Gray</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$gray1' }} />
            <Box css={{ height: 35, backgroundColor: '$gray2' }} />
            <Box css={{ height: 35, backgroundColor: '$gray3' }} />
            <Box css={{ height: 35, backgroundColor: '$gray4' }} />
            <Box css={{ height: 35, backgroundColor: '$gray5' }} />
            <Box css={{ height: 35, backgroundColor: '$gray6' }} />
            <Box css={{ height: 35, backgroundColor: '$gray7' }} />
            <Box css={{ height: 35, backgroundColor: '$gray8' }} />
            <Box css={{ height: 35, backgroundColor: '$gray9' }} />
            <Box css={{ height: 35, backgroundColor: '$gray10' }} />
            <Box css={{ height: 35, backgroundColor: '$gray11' }} />
            <Box css={{ height: 35, backgroundColor: '$gray12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Mauve</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$mauve1' }} />
            <Box css={{ height: 35, backgroundColor: '$mauve2' }} />
            <Box css={{ height: 35, backgroundColor: '$mauve3' }} />
            <Box css={{ height: 35, backgroundColor: '$mauve4' }} />
            <Box css={{ height: 35, backgroundColor: '$mauve5' }} />
            <Box css={{ height: 35, backgroundColor: '$mauve6' }} />
            <Box css={{ height: 35, backgroundColor: '$mauve7' }} />
            <Box css={{ height: 35, backgroundColor: '$mauve8' }} />
            <Box css={{ height: 35, backgroundColor: '$mauve9' }} />
            <Box css={{ height: 35, backgroundColor: '$mauve10' }} />
            <Box css={{ height: 35, backgroundColor: '$mauve11' }} />
            <Box css={{ height: 35, backgroundColor: '$mauve12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Slate</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$slate1' }} />
            <Box css={{ height: 35, backgroundColor: '$slate2' }} />
            <Box css={{ height: 35, backgroundColor: '$slate3' }} />
            <Box css={{ height: 35, backgroundColor: '$slate4' }} />
            <Box css={{ height: 35, backgroundColor: '$slate5' }} />
            <Box css={{ height: 35, backgroundColor: '$slate6' }} />
            <Box css={{ height: 35, backgroundColor: '$slate7' }} />
            <Box css={{ height: 35, backgroundColor: '$slate8' }} />
            <Box css={{ height: 35, backgroundColor: '$slate9' }} />
            <Box css={{ height: 35, backgroundColor: '$slate10' }} />
            <Box css={{ height: 35, backgroundColor: '$slate11' }} />
            <Box css={{ height: 35, backgroundColor: '$slate12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Sage</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$sage1' }} />
            <Box css={{ height: 35, backgroundColor: '$sage2' }} />
            <Box css={{ height: 35, backgroundColor: '$sage3' }} />
            <Box css={{ height: 35, backgroundColor: '$sage4' }} />
            <Box css={{ height: 35, backgroundColor: '$sage5' }} />
            <Box css={{ height: 35, backgroundColor: '$sage6' }} />
            <Box css={{ height: 35, backgroundColor: '$sage7' }} />
            <Box css={{ height: 35, backgroundColor: '$sage8' }} />
            <Box css={{ height: 35, backgroundColor: '$sage9' }} />
            <Box css={{ height: 35, backgroundColor: '$sage10' }} />
            <Box css={{ height: 35, backgroundColor: '$sage11' }} />
            <Box css={{ height: 35, backgroundColor: '$sage12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Olive</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$olive1' }} />
            <Box css={{ height: 35, backgroundColor: '$olive2' }} />
            <Box css={{ height: 35, backgroundColor: '$olive3' }} />
            <Box css={{ height: 35, backgroundColor: '$olive4' }} />
            <Box css={{ height: 35, backgroundColor: '$olive5' }} />
            <Box css={{ height: 35, backgroundColor: '$olive6' }} />
            <Box css={{ height: 35, backgroundColor: '$olive7' }} />
            <Box css={{ height: 35, backgroundColor: '$olive8' }} />
            <Box css={{ height: 35, backgroundColor: '$olive9' }} />
            <Box css={{ height: 35, backgroundColor: '$olive10' }} />
            <Box css={{ height: 35, backgroundColor: '$olive11' }} />
            <Box css={{ height: 35, backgroundColor: '$olive12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Sand</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$sand1' }} />
            <Box css={{ height: 35, backgroundColor: '$sand2' }} />
            <Box css={{ height: 35, backgroundColor: '$sand3' }} />
            <Box css={{ height: 35, backgroundColor: '$sand4' }} />
            <Box css={{ height: 35, backgroundColor: '$sand5' }} />
            <Box css={{ height: 35, backgroundColor: '$sand6' }} />
            <Box css={{ height: 35, backgroundColor: '$sand7' }} />
            <Box css={{ height: 35, backgroundColor: '$sand8' }} />
            <Box css={{ height: 35, backgroundColor: '$sand9' }} />
            <Box css={{ height: 35, backgroundColor: '$sand10' }} />
            <Box css={{ height: 35, backgroundColor: '$sand11' }} />
            <Box css={{ height: 35, backgroundColor: '$sand12' }} />

            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Tomato</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$tomato1' }} />
            <Box css={{ height: 35, backgroundColor: '$tomato2' }} />
            <Box css={{ height: 35, backgroundColor: '$tomato3' }} />
            <Box css={{ height: 35, backgroundColor: '$tomato4' }} />
            <Box css={{ height: 35, backgroundColor: '$tomato5' }} />
            <Box css={{ height: 35, backgroundColor: '$tomato6' }} />
            <Box css={{ height: 35, backgroundColor: '$tomato7' }} />
            <Box css={{ height: 35, backgroundColor: '$tomato8' }} />
            <Box css={{ height: 35, backgroundColor: '$tomato9' }} />
            <Box css={{ height: 35, backgroundColor: '$tomato10' }} />
            <Box css={{ height: 35, backgroundColor: '$tomato11' }} />
            <Box css={{ height: 35, backgroundColor: '$tomato12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Red</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$red1' }} />
            <Box css={{ height: 35, backgroundColor: '$red2' }} />
            <Box css={{ height: 35, backgroundColor: '$red3' }} />
            <Box css={{ height: 35, backgroundColor: '$red4' }} />
            <Box css={{ height: 35, backgroundColor: '$red5' }} />
            <Box css={{ height: 35, backgroundColor: '$red6' }} />
            <Box css={{ height: 35, backgroundColor: '$red7' }} />
            <Box css={{ height: 35, backgroundColor: '$red8' }} />
            <Box css={{ height: 35, backgroundColor: '$red9' }} />
            <Box css={{ height: 35, backgroundColor: '$red10' }} />
            <Box css={{ height: 35, backgroundColor: '$red11' }} />
            <Box css={{ height: 35, backgroundColor: '$red12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Crimson</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$crimson1' }} />
            <Box css={{ height: 35, backgroundColor: '$crimson2' }} />
            <Box css={{ height: 35, backgroundColor: '$crimson3' }} />
            <Box css={{ height: 35, backgroundColor: '$crimson4' }} />
            <Box css={{ height: 35, backgroundColor: '$crimson5' }} />
            <Box css={{ height: 35, backgroundColor: '$crimson6' }} />
            <Box css={{ height: 35, backgroundColor: '$crimson7' }} />
            <Box css={{ height: 35, backgroundColor: '$crimson8' }} />
            <Box css={{ height: 35, backgroundColor: '$crimson9' }} />
            <Box css={{ height: 35, backgroundColor: '$crimson10' }} />
            <Box css={{ height: 35, backgroundColor: '$crimson11' }} />
            <Box css={{ height: 35, backgroundColor: '$crimson12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Pink</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$pink1' }} />
            <Box css={{ height: 35, backgroundColor: '$pink2' }} />
            <Box css={{ height: 35, backgroundColor: '$pink3' }} />
            <Box css={{ height: 35, backgroundColor: '$pink4' }} />
            <Box css={{ height: 35, backgroundColor: '$pink5' }} />
            <Box css={{ height: 35, backgroundColor: '$pink6' }} />
            <Box css={{ height: 35, backgroundColor: '$pink7' }} />
            <Box css={{ height: 35, backgroundColor: '$pink8' }} />
            <Box css={{ height: 35, backgroundColor: '$pink9' }} />
            <Box css={{ height: 35, backgroundColor: '$pink10' }} />
            <Box css={{ height: 35, backgroundColor: '$pink11' }} />
            <Box css={{ height: 35, backgroundColor: '$pink12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Plum</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$plum1' }} />
            <Box css={{ height: 35, backgroundColor: '$plum2' }} />
            <Box css={{ height: 35, backgroundColor: '$plum3' }} />
            <Box css={{ height: 35, backgroundColor: '$plum4' }} />
            <Box css={{ height: 35, backgroundColor: '$plum5' }} />
            <Box css={{ height: 35, backgroundColor: '$plum6' }} />
            <Box css={{ height: 35, backgroundColor: '$plum7' }} />
            <Box css={{ height: 35, backgroundColor: '$plum8' }} />
            <Box css={{ height: 35, backgroundColor: '$plum9' }} />
            <Box css={{ height: 35, backgroundColor: '$plum10' }} />
            <Box css={{ height: 35, backgroundColor: '$plum11' }} />
            <Box css={{ height: 35, backgroundColor: '$plum12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Purple</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$purple1' }} />
            <Box css={{ height: 35, backgroundColor: '$purple2' }} />
            <Box css={{ height: 35, backgroundColor: '$purple3' }} />
            <Box css={{ height: 35, backgroundColor: '$purple4' }} />
            <Box css={{ height: 35, backgroundColor: '$purple5' }} />
            <Box css={{ height: 35, backgroundColor: '$purple6' }} />
            <Box css={{ height: 35, backgroundColor: '$purple7' }} />
            <Box css={{ height: 35, backgroundColor: '$purple8' }} />
            <Box css={{ height: 35, backgroundColor: '$purple9' }} />
            <Box css={{ height: 35, backgroundColor: '$purple10' }} />
            <Box css={{ height: 35, backgroundColor: '$purple11' }} />
            <Box css={{ height: 35, backgroundColor: '$purple12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Violet</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$violet1' }} />
            <Box css={{ height: 35, backgroundColor: '$violet2' }} />
            <Box css={{ height: 35, backgroundColor: '$violet3' }} />
            <Box css={{ height: 35, backgroundColor: '$violet4' }} />
            <Box css={{ height: 35, backgroundColor: '$violet5' }} />
            <Box css={{ height: 35, backgroundColor: '$violet6' }} />
            <Box css={{ height: 35, backgroundColor: '$violet7' }} />
            <Box css={{ height: 35, backgroundColor: '$violet8' }} />
            <Box css={{ height: 35, backgroundColor: '$violet9' }} />
            <Box css={{ height: 35, backgroundColor: '$violet10' }} />
            <Box css={{ height: 35, backgroundColor: '$violet11' }} />
            <Box css={{ height: 35, backgroundColor: '$violet12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Indigo</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$indigo1' }} />
            <Box css={{ height: 35, backgroundColor: '$indigo2' }} />
            <Box css={{ height: 35, backgroundColor: '$indigo3' }} />
            <Box css={{ height: 35, backgroundColor: '$indigo4' }} />
            <Box css={{ height: 35, backgroundColor: '$indigo5' }} />
            <Box css={{ height: 35, backgroundColor: '$indigo6' }} />
            <Box css={{ height: 35, backgroundColor: '$indigo7' }} />
            <Box css={{ height: 35, backgroundColor: '$indigo8' }} />
            <Box css={{ height: 35, backgroundColor: '$indigo9' }} />
            <Box css={{ height: 35, backgroundColor: '$indigo10' }} />
            <Box css={{ height: 35, backgroundColor: '$indigo11' }} />
            <Box css={{ height: 35, backgroundColor: '$indigo12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Blue</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$blue1' }} />
            <Box css={{ height: 35, backgroundColor: '$blue2' }} />
            <Box css={{ height: 35, backgroundColor: '$blue3' }} />
            <Box css={{ height: 35, backgroundColor: '$blue4' }} />
            <Box css={{ height: 35, backgroundColor: '$blue5' }} />
            <Box css={{ height: 35, backgroundColor: '$blue6' }} />
            <Box css={{ height: 35, backgroundColor: '$blue7' }} />
            <Box css={{ height: 35, backgroundColor: '$blue8' }} />
            <Box css={{ height: 35, backgroundColor: '$blue9' }} />
            <Box css={{ height: 35, backgroundColor: '$blue10' }} />
            <Box css={{ height: 35, backgroundColor: '$blue11' }} />
            <Box css={{ height: 35, backgroundColor: '$blue12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Cyan</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$cyan1' }} />
            <Box css={{ height: 35, backgroundColor: '$cyan2' }} />
            <Box css={{ height: 35, backgroundColor: '$cyan3' }} />
            <Box css={{ height: 35, backgroundColor: '$cyan4' }} />
            <Box css={{ height: 35, backgroundColor: '$cyan5' }} />
            <Box css={{ height: 35, backgroundColor: '$cyan6' }} />
            <Box css={{ height: 35, backgroundColor: '$cyan7' }} />
            <Box css={{ height: 35, backgroundColor: '$cyan8' }} />
            <Box css={{ height: 35, backgroundColor: '$cyan9' }} />
            <Box css={{ height: 35, backgroundColor: '$cyan10' }} />
            <Box css={{ height: 35, backgroundColor: '$cyan11' }} />
            <Box css={{ height: 35, backgroundColor: '$cyan12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Teal</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$teal1' }} />
            <Box css={{ height: 35, backgroundColor: '$teal2' }} />
            <Box css={{ height: 35, backgroundColor: '$teal3' }} />
            <Box css={{ height: 35, backgroundColor: '$teal4' }} />
            <Box css={{ height: 35, backgroundColor: '$teal5' }} />
            <Box css={{ height: 35, backgroundColor: '$teal6' }} />
            <Box css={{ height: 35, backgroundColor: '$teal7' }} />
            <Box css={{ height: 35, backgroundColor: '$teal8' }} />
            <Box css={{ height: 35, backgroundColor: '$teal9' }} />
            <Box css={{ height: 35, backgroundColor: '$teal10' }} />
            <Box css={{ height: 35, backgroundColor: '$teal11' }} />
            <Box css={{ height: 35, backgroundColor: '$teal12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Green</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$green1' }} />
            <Box css={{ height: 35, backgroundColor: '$green2' }} />
            <Box css={{ height: 35, backgroundColor: '$green3' }} />
            <Box css={{ height: 35, backgroundColor: '$green4' }} />
            <Box css={{ height: 35, backgroundColor: '$green5' }} />
            <Box css={{ height: 35, backgroundColor: '$green6' }} />
            <Box css={{ height: 35, backgroundColor: '$green7' }} />
            <Box css={{ height: 35, backgroundColor: '$green8' }} />
            <Box css={{ height: 35, backgroundColor: '$green9' }} />
            <Box css={{ height: 35, backgroundColor: '$green10' }} />
            <Box css={{ height: 35, backgroundColor: '$green11' }} />
            <Box css={{ height: 35, backgroundColor: '$green12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Grass</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$grass1' }} />
            <Box css={{ height: 35, backgroundColor: '$grass2' }} />
            <Box css={{ height: 35, backgroundColor: '$grass3' }} />
            <Box css={{ height: 35, backgroundColor: '$grass4' }} />
            <Box css={{ height: 35, backgroundColor: '$grass5' }} />
            <Box css={{ height: 35, backgroundColor: '$grass6' }} />
            <Box css={{ height: 35, backgroundColor: '$grass7' }} />
            <Box css={{ height: 35, backgroundColor: '$grass8' }} />
            <Box css={{ height: 35, backgroundColor: '$grass9' }} />
            <Box css={{ height: 35, backgroundColor: '$grass10' }} />
            <Box css={{ height: 35, backgroundColor: '$grass11' }} />
            <Box css={{ height: 35, backgroundColor: '$grass12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Brown</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$brown1' }} />
            <Box css={{ height: 35, backgroundColor: '$brown2' }} />
            <Box css={{ height: 35, backgroundColor: '$brown3' }} />
            <Box css={{ height: 35, backgroundColor: '$brown4' }} />
            <Box css={{ height: 35, backgroundColor: '$brown5' }} />
            <Box css={{ height: 35, backgroundColor: '$brown6' }} />
            <Box css={{ height: 35, backgroundColor: '$brown7' }} />
            <Box css={{ height: 35, backgroundColor: '$brown8' }} />
            <Box css={{ height: 35, backgroundColor: '$brown9' }} />
            <Box css={{ height: 35, backgroundColor: '$brown10' }} />
            <Box css={{ height: 35, backgroundColor: '$brown11' }} />
            <Box css={{ height: 35, backgroundColor: '$brown12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Orange</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$orange1' }} />
            <Box css={{ height: 35, backgroundColor: '$orange2' }} />
            <Box css={{ height: 35, backgroundColor: '$orange3' }} />
            <Box css={{ height: 35, backgroundColor: '$orange4' }} />
            <Box css={{ height: 35, backgroundColor: '$orange5' }} />
            <Box css={{ height: 35, backgroundColor: '$orange6' }} />
            <Box css={{ height: 35, backgroundColor: '$orange7' }} />
            <Box css={{ height: 35, backgroundColor: '$orange8' }} />
            <Box css={{ height: 35, backgroundColor: '$orange9' }} />
            <Box css={{ height: 35, backgroundColor: '$orange10' }} />
            <Box css={{ height: 35, backgroundColor: '$orange11' }} />
            <Box css={{ height: 35, backgroundColor: '$orange12' }} />

            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Sky</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$sky1' }} />
            <Box css={{ height: 35, backgroundColor: '$sky2' }} />
            <Box css={{ height: 35, backgroundColor: '$sky3' }} />
            <Box css={{ height: 35, backgroundColor: '$sky4' }} />
            <Box css={{ height: 35, backgroundColor: '$sky5' }} />
            <Box css={{ height: 35, backgroundColor: '$sky6' }} />
            <Box css={{ height: 35, backgroundColor: '$sky7' }} />
            <Box css={{ height: 35, backgroundColor: '$sky8' }} />
            <Box css={{ height: 35, backgroundColor: '$sky9' }} />
            <Box css={{ height: 35, backgroundColor: '$sky10' }} />
            <Box css={{ height: 35, backgroundColor: '$sky11' }} />
            <Box css={{ height: 35, backgroundColor: '$sky12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Mint</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$mint1' }} />
            <Box css={{ height: 35, backgroundColor: '$mint2' }} />
            <Box css={{ height: 35, backgroundColor: '$mint3' }} />
            <Box css={{ height: 35, backgroundColor: '$mint4' }} />
            <Box css={{ height: 35, backgroundColor: '$mint5' }} />
            <Box css={{ height: 35, backgroundColor: '$mint6' }} />
            <Box css={{ height: 35, backgroundColor: '$mint7' }} />
            <Box css={{ height: 35, backgroundColor: '$mint8' }} />
            <Box css={{ height: 35, backgroundColor: '$mint9' }} />
            <Box css={{ height: 35, backgroundColor: '$mint10' }} />
            <Box css={{ height: 35, backgroundColor: '$mint11' }} />
            <Box css={{ height: 35, backgroundColor: '$mint12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Lime</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$lime1' }} />
            <Box css={{ height: 35, backgroundColor: '$lime2' }} />
            <Box css={{ height: 35, backgroundColor: '$lime3' }} />
            <Box css={{ height: 35, backgroundColor: '$lime4' }} />
            <Box css={{ height: 35, backgroundColor: '$lime5' }} />
            <Box css={{ height: 35, backgroundColor: '$lime6' }} />
            <Box css={{ height: 35, backgroundColor: '$lime7' }} />
            <Box css={{ height: 35, backgroundColor: '$lime8' }} />
            <Box css={{ height: 35, backgroundColor: '$lime9' }} />
            <Box css={{ height: 35, backgroundColor: '$lime10' }} />
            <Box css={{ height: 35, backgroundColor: '$lime11' }} />
            <Box css={{ height: 35, backgroundColor: '$lime12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Yellow</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$yellow1' }} />
            <Box css={{ height: 35, backgroundColor: '$yellow2' }} />
            <Box css={{ height: 35, backgroundColor: '$yellow3' }} />
            <Box css={{ height: 35, backgroundColor: '$yellow4' }} />
            <Box css={{ height: 35, backgroundColor: '$yellow5' }} />
            <Box css={{ height: 35, backgroundColor: '$yellow6' }} />
            <Box css={{ height: 35, backgroundColor: '$yellow7' }} />
            <Box css={{ height: 35, backgroundColor: '$yellow8' }} />
            <Box css={{ height: 35, backgroundColor: '$yellow9' }} />
            <Box css={{ height: 35, backgroundColor: '$yellow10' }} />
            <Box css={{ height: 35, backgroundColor: '$yellow11' }} />
            <Box css={{ height: 35, backgroundColor: '$yellow12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Amber</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$amber1' }} />
            <Box css={{ height: 35, backgroundColor: '$amber2' }} />
            <Box css={{ height: 35, backgroundColor: '$amber3' }} />
            <Box css={{ height: 35, backgroundColor: '$amber4' }} />
            <Box css={{ height: 35, backgroundColor: '$amber5' }} />
            <Box css={{ height: 35, backgroundColor: '$amber6' }} />
            <Box css={{ height: 35, backgroundColor: '$amber7' }} />
            <Box css={{ height: 35, backgroundColor: '$amber8' }} />
            <Box css={{ height: 35, backgroundColor: '$amber9' }} />
            <Box css={{ height: 35, backgroundColor: '$amber10' }} />
            <Box css={{ height: 35, backgroundColor: '$amber11' }} />
            <Box css={{ height: 35, backgroundColor: '$amber12' }} />

            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />
            <Box css={{ height: 35 }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Gold</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$gold1' }} />
            <Box css={{ height: 35, backgroundColor: '$gold2' }} />
            <Box css={{ height: 35, backgroundColor: '$gold3' }} />
            <Box css={{ height: 35, backgroundColor: '$gold4' }} />
            <Box css={{ height: 35, backgroundColor: '$gold5' }} />
            <Box css={{ height: 35, backgroundColor: '$gold6' }} />
            <Box css={{ height: 35, backgroundColor: '$gold7' }} />
            <Box css={{ height: 35, backgroundColor: '$gold8' }} />
            <Box css={{ height: 35, backgroundColor: '$gold9' }} />
            <Box css={{ height: 35, backgroundColor: '$gold10' }} />
            <Box css={{ height: 35, backgroundColor: '$gold11' }} />
            <Box css={{ height: 35, backgroundColor: '$gold12' }} />

            <Box>
              <Text css={{ fontSize: '$2' }}>Bronze</Text>
            </Box>
            <Box css={{ height: 35, backgroundColor: '$bronze1' }} />
            <Box css={{ height: 35, backgroundColor: '$bronze2' }} />
            <Box css={{ height: 35, backgroundColor: '$bronze3' }} />
            <Box css={{ height: 35, backgroundColor: '$bronze4' }} />
            <Box css={{ height: 35, backgroundColor: '$bronze5' }} />
            <Box css={{ height: 35, backgroundColor: '$bronze6' }} />
            <Box css={{ height: 35, backgroundColor: '$bronze7' }} />
            <Box css={{ height: 35, backgroundColor: '$bronze8' }} />
            <Box css={{ height: 35, backgroundColor: '$bronze9' }} />
            <Box css={{ height: 35, backgroundColor: '$bronze10' }} />
            <Box css={{ height: 35, backgroundColor: '$bronze11' }} />
            <Box css={{ height: 35, backgroundColor: '$bronze12' }} />
          </Grid>
        </Section>
      </Flex>
    </Section>
  )
}

function Legend() {
  return (
    <Grid
      columns={{
        '@initial': '2',
        '@bp2': '3',
        '@bp3': '4',
      }}
      gap="2"
    >
      <Flex gap="1" align="center">
        <Text size="1" css={{ color: '$brandGray11' }}>
          1
        </Text>
        <Text size="0" css={{ color: '$brandGray11' }}>
          App background
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" css={{ color: '$brandGray11' }}>
          2
        </Text>
        <Text size="0" css={{ color: '$brandGray11' }}>
          Subtle background
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" css={{ color: '$brandGray11' }}>
          3
        </Text>
        <Text size="0" css={{ color: '$brandGray11' }}>
          UI element background
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" css={{ color: '$brandGray11' }}>
          4
        </Text>
        <Text size="0" css={{ color: '$brandGray11' }}>
          Hovered UI element background
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" css={{ color: '$brandGray11' }}>
          5
        </Text>
        <Text size="0" css={{ color: '$brandGray11' }}>
          Active / selected UI element background
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" css={{ color: '$brandGray11' }}>
          6
        </Text>
        <Text size="0" css={{ color: '$brandGray11' }}>
          Subtle borders and separators
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" css={{ color: '$brandGray11' }}>
          7
        </Text>
        <Text size="0" css={{ color: '$brandGray11' }}>
          UI element border and focus rings
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" css={{ color: '$brandGray11' }}>
          8
        </Text>
        <Text size="0" css={{ color: '$brandGray11' }}>
          Hovered UI element border
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" css={{ color: '$brandGray11' }}>
          9
        </Text>
        <Text size="0" css={{ color: '$brandGray11' }}>
          Solid backgrounds
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" css={{ color: '$brandGray11' }}>
          10
        </Text>
        <Text size="0" css={{ color: '$brandGray11' }}>
          Hovered solid backgrounds
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" css={{ color: '$brandGray11' }}>
          11
        </Text>
        <Text size="0" css={{ color: '$brandGray11' }}>
          Low-contrast text
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1" css={{ color: '$brandGray11' }}>
          12
        </Text>
        <Text size="0" css={{ color: '$brandGray11' }}>
          High-contrast text
        </Text>
      </Flex>
    </Grid>
  )
}

function Headers() {
  return (
    <Fragment>
      <Box />
      <Box css={{ ta: 'center', pb: '$2' }}>
        <Text size="2" css={{ color: '$brandGray11' }}>
          1
        </Text>
      </Box>
      <Box css={{ ta: 'center', pb: '$2' }}>
        <Text size="2" css={{ color: '$brandGray11' }}>
          2
        </Text>
      </Box>
      <Box css={{ ta: 'center', pb: '$2' }}>
        <Text size="2" css={{ color: '$brandGray11' }}>
          3
        </Text>
      </Box>
      <Box css={{ ta: 'center', pb: '$2' }}>
        <Text size="2" css={{ color: '$brandGray11' }}>
          4
        </Text>
      </Box>
      <Box css={{ ta: 'center', pb: '$2' }}>
        <Text size="2" css={{ color: '$brandGray11' }}>
          5
        </Text>
      </Box>
      <Box css={{ ta: 'center', pb: '$2' }}>
        <Text size="2" css={{ color: '$brandGray11' }}>
          6
        </Text>
      </Box>
      <Box css={{ ta: 'center', pb: '$2' }}>
        <Text size="2" css={{ color: '$brandGray11' }}>
          7
        </Text>
      </Box>
      <Box css={{ ta: 'center', pb: '$2' }}>
        <Text size="2" css={{ color: '$brandGray11' }}>
          8
        </Text>
      </Box>
      <Box css={{ ta: 'center', pb: '$2' }}>
        <Text size="2" css={{ color: '$brandGray11' }}>
          9
        </Text>
      </Box>
      <Box css={{ ta: 'center', pb: '$2' }}>
        <Text size="2" css={{ color: '$brandGray11' }}>
          10
        </Text>
      </Box>
      <Box css={{ ta: 'center', pb: '$2' }}>
        <Text size="2" css={{ color: '$brandGray11' }}>
          11
        </Text>
      </Box>
      <Box css={{ ta: 'center', pb: '$2' }}>
        <Text size="2" css={{ color: '$brandGray11' }}>
          12
        </Text>
      </Box>
    </Fragment>
  )
}
