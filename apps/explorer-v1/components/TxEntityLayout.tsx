import {
  AnimatedPanel,
  Box,
  Container,
  Flex,
  Grid,
  EntityList,
  EntityListItemProps,
} from '@siafoundation/design-system'
import { NvgDatum, DatumProps } from './NvgDatum'
import { NvgEntityTx } from '../config/navigatorTypes'
import { TxEntityHeader } from './TxEntityHeader'

type Props = {
  entity: NvgEntityTx
  values: DatumProps[]
  details?: React.ReactNode
  inputs: EntityListItemProps[]
  outputs: EntityListItemProps[]
  relatedOperations?: EntityListItemProps[]
}

export function TxEntityLayout({
  entity,
  values,
  details,
  inputs,
  outputs,
  relatedOperations,
}: Props) {
  return (
    <>
      <Container>
        <AnimatedPanel
          variant="subtle"
          startTime={0}
          css={{
            padding: '$3',
            borderRadius: '$2',
          }}
        >
          <Flex direction="column" gap="8">
            <TxEntityHeader entity={entity} />
            <Flex direction="column" gapY="3">
              {values.map((item) => (
                <NvgDatum key={item.label} {...item} />
              ))}
            </Flex>
            {details}
          </Flex>
        </AnimatedPanel>
      </Container>
      <Container>
        <Flex direction="column" gap="5">
          <Grid
            columns={{
              '@initial': 1,
              '@bp2': 2,
            }}
            gap="2"
            gapY="4"
          >
            <Box>
              <EntityList
                title={`Inputs (${inputs.length})`}
                entities={inputs}
              />
            </Box>
            <Box>
              <EntityList
                title={`Outputs (${outputs.length})`}
                entities={outputs}
              />
            </Box>
          </Grid>
          {!!relatedOperations?.length && (
            <EntityList
              title={`Related operations (${relatedOperations.length})`}
              entities={relatedOperations}
            />
          )}
        </Flex>
      </Container>
    </>
  )
}
