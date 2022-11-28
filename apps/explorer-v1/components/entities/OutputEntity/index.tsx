import { useMemo } from 'react'
import { NvgOutputEntity } from '../../../config/navigatorTypes'
import { AnimatedPanel, Badge, Container } from '@siafoundation/design-system'
import { NvgDatum, DatumProps } from '../../NvgDatum'
import { EntityHeading } from '../../EntityHeading'
import { routes } from '../../../config/routes'
import BigNumber from 'bignumber.js'

type Props = {
  entity: NvgOutputEntity
}

export function OutputEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const list: DatumProps[] = [
      {
        label: 'Belongs to address',
        entityType: 'address',
        entityValue: data[1].Address,
      },
      {
        label: 'Created on block',
        entityType: 'block',
        entityValue: String(data[1].CreatedOnBlock || ''),
      },
    ]

    // if (data[1].SpentOnBlock) {
    list.push({
      label: 'Spent on block',
      entityType: 'block',
      entityValue: String(data[1].SpentOnBlock || ''),
    })
    // }

    if (data[1].ScValue) {
      list.push({
        label: 'SC Value',
        sc: new BigNumber(data[1].ScValue),
      })
    }
    if (data[1].SfValue) {
      list.push({
        label: 'SF Value',
        sf: data[1].SfValue,
      })
    }

    return list
  }, [data])

  const output = data[0].MasterHash

  return (
    <Container>
      <div className="flex flex-col gap-16">
        <AnimatedPanel variant="subtle" startTime={0} className="p-6 rounded">
          <div className="flex flex-col gap-10">
            <div className="flex flex-wrap gap-y-2 justify-between items-center">
              <EntityHeading
                label="transaction output"
                type="output"
                value={output}
                href={routes.output.view.replace('[id]', output)}
              />
              <div className="flex gap-2 items-center">
                <Badge variant={data[1].Spent ? 'accent' : 'simple'}>
                  {data[1].Spent ? 'Spent' : 'Unspent'}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-y-6">
              {values.map((item) => (
                <NvgDatum key={item.label} {...item} />
              ))}
            </div>
          </div>
        </AnimatedPanel>
      </div>
    </Container>
  )
}
