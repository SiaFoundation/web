import {
  AnimatedPanel,
  Box,
  Container,
  Flex,
  Grid,
  Panel,
} from '@siafoundation/design-system'
import { Datum, DatumProps } from './Datum'
import { NvgEntityTx } from '../config/navigatorTypes'
import { EntityListItem, EntityList } from './EntityList'
import { TxEntityHeader } from './TxEntityHeader'

type Props = {
  entity: NvgEntityTx
  values: DatumProps[]
  details?: React.ReactNode
  inputs: EntityListItem[]
  outputs: EntityListItem[]
  relatedOperations?: EntityListItem[]
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
                <Datum key={item.label} {...item} />
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
              <Panel>
                <EntityList
                  title={`Inputs (${inputs.length})`}
                  entities={inputs}
                />
              </Panel>
            </Box>
            <Box>
              <Panel>
                <EntityList
                  title={`Outputs (${outputs.length})`}
                  entities={outputs}
                />
              </Panel>
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
