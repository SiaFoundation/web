import {
  ConfigFields,
  TipNumber,
  formSetField,
} from '@siafoundation/design-system'
import { Categories, RecommendationItem, InputValues } from '../types'
import { toHastings } from '@siafoundation/units'
import { UseFormReturn } from 'react-hook-form'
import { recommendationTipContent } from './Tip'

export function MaxContractPriceTips({
  form,
  fields,
  recommendations,
}: {
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
  recommendations: Partial<Record<keyof InputValues, RecommendationItem>>
}) {
  const recommendationPrice = recommendations?.maxContractPrice?.targetValue

  return (
    <>
      {recommendationPrice && (
        <TipNumber
          type="siacoin"
          label="Match with more hosts"
          tip={recommendationTipContent}
          decimalsLimit={0}
          value={toHastings(recommendationPrice)}
          onClick={() =>
            formSetField({
              form,
              fields,
              name: 'maxContractPrice',
              value: recommendationPrice,
              options: true,
            })
          }
        />
      )}
    </>
  )
}
