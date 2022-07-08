/* eslint-disable react/no-unescaped-entities */
import { Datum, DatumProps } from './Datum'
import { getContractConditions } from '../lib/transaction'
import { NvgContractEntity, NvgRevisionEntity } from '../config/navigatorTypes'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Flex,
  Grid,
  Heading,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'

type Props = {
  entity: NvgContractEntity | NvgRevisionEntity
}

export function ContractConditionsSection({ entity }: Props) {
  const conditions = getContractConditions(entity)

  const success: DatumProps[] = [
    {
      label: 'Returned allowance',
      sc: new BigNumber(conditions.success.returnedAllowance),
    },
    {
      label: 'Payout + collateral',
      sc: new BigNumber(conditions.success.payoutCollateral),
    },
  ]

  const failure: DatumProps[] = [
    {
      label: 'Returned allowance',
      sc: new BigNumber(conditions.fail.returnedAllowance),
    },
    {
      label: 'Burnt collateral',
      sc: new BigNumber(conditions.fail.burntCollateral),
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
              '@bp2': 2,
            }}
            gap="3"
            css={{ padding: '$2 0' }}
          >
            <Flex direction="column" gap="3">
              <Heading size="20">Success</Heading>
              <Flex direction="column" gap="3">
                {success.map((item) => (
                  <Datum key={item.label} {...item} />
                ))}
              </Flex>
            </Flex>
            <Flex direction="column" gap="3">
              <Heading size="20">Failure</Heading>
              <Flex direction="column" gap="3">
                {failure.map((item) => (
                  <Datum key={item.label} {...item} />
                ))}
              </Flex>
            </Flex>
          </Grid>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
