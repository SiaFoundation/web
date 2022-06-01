import { useMemo } from 'react'
import { OutputEntity } from '../../../config/types'
import {
  AnimatedPanel,
  Badge,
  Container,
  Flex,
  Heading,
} from '@siafoundation/design-system'
import { Datum, ValueItemProps } from '../../Datum'

type Props = {
  entity: OutputEntity
}

export function OutputEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const list: ValueItemProps[] = [
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
        sc: BigInt(data[1].ScValue),
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

  return (
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
            <Flex justify="between" align="center" wrap="wrap" gapY="1">
              <Heading>
                Transaction output {data[0].MasterHash.slice(0, 20)}...
              </Heading>
              <Flex gap="1" align="center">
                <Badge variant={data[1].Spent ? 'accent' : 'simple'}>
                  {data[1].Spent ? 'Spent' : 'Unspent'}
                </Badge>
              </Flex>
            </Flex>
            <Flex gap="6" wrap="wrap">
              {values.map((item) => (
                <Datum key={item.label} {...item} />
              ))}
            </Flex>
          </Flex>
        </AnimatedPanel>
      </Flex>
    </Container>
  )
}
