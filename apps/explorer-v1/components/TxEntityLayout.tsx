import {
  AnimatedPanel,
  Container,
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
        <AnimatedPanel variant="subtle" startTime={0} className="p-6 rounded">
          <div className="flex flex-col gap-16">
            <TxEntityHeader entity={entity} />
            <div className="flex flex-col gap-y-6">
              {values.map((item) => (
                <NvgDatum key={item.label} {...item} />
              ))}
            </div>
            {details}
          </div>
        </AnimatedPanel>
      </Container>
      <Container>
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
            <div>
              <EntityList
                title={`Inputs (${inputs.length})`}
                entities={inputs}
              />
            </div>
            <div>
              <EntityList
                title={`Outputs (${outputs.length})`}
                entities={outputs}
              />
            </div>
          </div>
          {!!relatedOperations?.length && (
            <EntityList
              title={`Related operations (${relatedOperations.length})`}
              entities={relatedOperations}
            />
          )}
        </div>
      </Container>
    </>
  )
}
