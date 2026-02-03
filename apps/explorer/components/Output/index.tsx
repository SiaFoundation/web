'use client'

import { useMemo } from 'react'
import BigNumber from 'bignumber.js'

import {
  ExplorerSiacoinOutput,
  ExplorerSiafundOutput,
} from '@siafoundation/explored-types'
import { Text } from '@siafoundation/design-system'

import { routes } from '../../config/routes'

import { ContentLayout } from '../ContentLayout'
import { EntityHeading } from '../EntityHeading'
import { DatumProps, ExplorerDatum } from '../ExplorerDatum'
import { ExplorerAccordion } from '../ExplorerAccordion'
import { ExplorerCopyableCodeBlock } from '../ExplorerCopyableCodeBlock'

type Props = {
  outputElement: ExplorerSiacoinOutput | ExplorerSiafundOutput
}

export function Output({ outputElement: output }: Props) {
  const outputDatums: DatumProps[] = useMemo(() => {
    if ('siacoinOutput' in output) {
      return [
        {
          label: 'Address',
          entityType: 'address',
          entityValue: output.siacoinOutput.address,
        },
        { label: 'Value', sc: new BigNumber(output.siacoinOutput.value) },
        output.spentIndex
          ? {
              label: 'Spent block',
              entityType: 'block',
              entityValue: output.spentIndex.id,
              copyable: true,
            }
          : {
              label: 'Spent Block',
              value: '-',
              copyable: false,
            },
        {
          label: 'Source',
          value: <Text>{output.source}</Text>,
          copyable: false,
        },
      ]
    } else {
      return [
        {
          label: 'Address',
          entityType: 'address',
          entityValue: output.siafundOutput.address,
        },
        { label: 'Value', sc: new BigNumber(output.siafundOutput.value) },
        output.spentIndex
          ? {
              label: 'Spent block',
              entityType: 'block',
              entityValue: output.spentIndex.id,
              copyable: true,
            }
          : {
              label: 'Spent Block',
              value: '-',
              copyable: false,
            },
      ]
    }
  }, [output])

  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-5">
          <EntityHeading
            label="output"
            type="output"
            value={output.id}
            href={routes.block.view.replace(':id', output.id)}
          />
          <div className="flex flex-col gap-y-2 md:gap-y-4">
            {outputDatums.map((item) => (
              <ExplorerDatum key={item.label} {...item} />
            ))}
          </div>
        </div>
      }
    >
      <ExplorerAccordion title="State">
        <div className="p-2">
          <ExplorerCopyableCodeBlock
            value={JSON.stringify(output.stateElement, null, 2)}
          />
        </div>
      </ExplorerAccordion>
    </ContentLayout>
  )
}
