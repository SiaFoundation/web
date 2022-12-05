/* eslint-disable react/no-unescaped-entities */
import { NvgDatum, DatumProps } from './NvgDatum'
import { getContractConditions } from '../lib/transaction'
import { NvgContractEntity, NvgRevisionEntity } from '../config/navigatorTypes'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Heading,
  Label,
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
        <AccordionTrigger>
          <Heading size="20">Conditions</Heading>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 pb-4">
            <div className="flex flex-col gap-3">
              <Label size="20">Success</Label>
              <div className="flex flex-col">
                {success.map((item) => (
                  <NvgDatum key={item.label} {...item} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label size="20">Failure</Label>
              <div className="flex flex-col">
                {failure.map((item) => (
                  <NvgDatum key={item.label} {...item} />
                ))}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
