import {
  ConfigFields,
  TipNumber,
  formSetField,
} from '@siafoundation/design-system'
import React from 'react'
import { Categories, RecommendationItem, SettingsData } from '../types'
import { toHastings } from '@siafoundation/units'
import { UseFormReturn } from 'react-hook-form'
import { recommendationTipContent } from './Tip'

export function MaxRPCPriceTips({
  form,
  fields,
  recommendations,
}: {
  form: UseFormReturn<SettingsData>
  fields: ConfigFields<SettingsData, Categories>
  recommendations: Partial<Record<keyof SettingsData, RecommendationItem>>
}) {
  const recommendationPrice = recommendations?.maxRPCPriceMillion?.targetValue

  return (
    recommendationPrice && (
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
            name: 'maxRPCPriceMillion',
            value: recommendationPrice,
            options: true,
          })
        }
      />
    )
  )
}
