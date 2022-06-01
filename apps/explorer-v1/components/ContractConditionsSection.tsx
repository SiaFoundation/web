/* eslint-disable react/no-unescaped-entities */
import { Datum, ValueItemProps } from './Datum'
import { getContractConditions } from '../lib/transaction'
import { ContractEntity, RevisionEntity } from '../config/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Flex,
  Grid,
  Heading,
} from '@siafoundation/design-system'

type Props = {
  entity: ContractEntity | RevisionEntity
}

export function ContractConditionsSection({ entity }: Props) {
  const conditions = getContractConditions(entity)

  const success: ValueItemProps[] = [
    {
      label: 'Returned allowance',
      sc: BigInt(conditions.success.returnedAllowance),
    },
    {
      label: 'Payout + collateral',
      sc: BigInt(conditions.success.payoutCollateral),
    },
  ]

  const failure: ValueItemProps[] = [
    {
      label: 'Returned allowance',
      sc: BigInt(conditions.fail.returnedAllowance),
    },
    {
      label: 'Burnt collateral',
      sc: BigInt(conditions.fail.burntCollateral),
    },
  ]

  return (
    <Accordion type="single">
      <AccordionItem value="details" variant="ghost">
        <AccordionTrigger variant="ghost">
          <Heading size="20">Conditions</Heading>
        </AccordionTrigger>
        <AccordionContent>
          <Grid
            columns={{
              '@initial': 1,
              '@bp1': 2,
              '@bp2': 3,
            }}
            gap="3"
            css={{ padding: '$2 0' }}
          >
            <Flex direction="column" gap="3">
              <Heading size="20">Success</Heading>
              <Flex direction="column" gap="3">
                {success.map((item) => (
                  <Datum size="14" key={item.label} {...item} />
                ))}
              </Flex>
            </Flex>
            <Flex direction="column" gap="3">
              <Heading size="20">Failure</Heading>
              <Flex direction="column" gap="3">
                {failure.map((item) => (
                  <Datum size="14" key={item.label} {...item} />
                ))}
              </Flex>
            </Flex>
          </Grid>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
