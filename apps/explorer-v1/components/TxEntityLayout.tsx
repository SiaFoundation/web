import {
  AnimatedPanel,
  Box,
  Container,
  Flex,
  Grid,
  Panel,
} from '@siafoundation/design-system'
import { Datum, ValueItemProps } from './Datum'
import { EntityTx } from '../config/types'
import { EntityListItem, EntityList } from './EntityList'
import { TxEntityHeader } from './TxEntityHeader'

type Props = {
  entity: EntityTx
  values: ValueItemProps[]
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
        <Flex direction="column" gap="8">
          <AnimatedPanel
            variant="subtle"
            startTime={0}
            css={{
              padding: '$3',
              borderRadius: '$2',
            }}
          >
            <Flex direction="column" gap="5">
              <TxEntityHeader entity={entity} />
              <Grid columns="3" gap="6">
                {values.map((item) => (
                  <Datum key={item.label} {...item} />
                ))}
              </Grid>
              {details}
            </Flex>
          </AnimatedPanel>
        </Flex>
      </Container>
      <Container>
        <Flex direction="column" gap="5">
          <Grid columns="2" gap="2">
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
