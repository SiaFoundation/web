import { Panel, Text, Tooltip } from '@siafoundation/design-system'
import { MicaIndicatorObject } from '../content/mica'
import {
  CloudUpload32,
  Earth32,
  Flash32,
  Information16,
  TrashCan32,
} from '@carbon/icons-react'
import { cx } from 'class-variance-authority'

type MicaComplianceTableCellGroupLayoutProps = {
  indicatorData: {
    title: string
    description: string
    unit: string
    result: {
      value: number
      year: number
    }
  }
  displayValue: string
  customTitle?: string
  last?: boolean
}

function MicaComplianceTableCellGroupLayout({
  indicatorData,
  displayValue,
  customTitle,
  last,
}: MicaComplianceTableCellGroupLayoutProps) {
  const { title, description } = indicatorData
  return (
    <>
      <td
        className={cx(
          'text-left py-4',
          !last && 'border-b-2 border-gray-100 dark:border-b-graydark-100'
        )}
      >
        <Text size="16" weight="light" className="pl-2 md:pl-0">
          {customTitle || title}
        </Text>
      </td>
      <td
        className={cx(
          'text-left py-4',
          !last && 'border-b-2 border-gray-100 dark:border-b-graydark-100'
        )}
      >
        <div className="flex justify-end items-center gap-2 pr-2">
          <Text size="16" weight="light" noWrap>
            {displayValue}
          </Text>
          <Tooltip content={description}>
            <Information16 className="hover:cursor-pointer fill-emerald-700 dark:fill-emerald-500" />
          </Tooltip>
        </div>
      </td>
    </>
  )
}

type MicaComplianceTableProps = {
  micaIndicators: MicaIndicatorObject
  lastUpdated: string
}

export function MicaComplianceTable({
  micaIndicators,
  lastUpdated,
}: MicaComplianceTableProps) {
  return (
    <>
      <Panel>
        <table className="table-auto border-collapse w-full">
          <thead className="bg-slate-50 dark:bg-black">
            <tr className="border-b-2 border-gray-100 dark:border-b-graydark-100">
              <th className="py-6 hidden md:table-cell">
                <Text tag="span" size="16">
                  Domain
                </Text>
              </th>
              <th className="text-left py-6">
                <Text tag="span" size="16" className="pl-2 md:pl-0">
                  Sustainability Indicator
                </Text>
              </th>
              <th className="py-6"></th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td
                className="py-4 border-b-2 border-gray-100 dark:border-b-graydark-100 hidden md:table-cell "
                rowSpan={3}
              >
                <div className="flex flex-col justify-content items-center gap-4">
                  <Flash32 className="fill-emerald-700 dark:fill-emerald-500" />
                  <Text size="16" weight="light" color="subtle">
                    Energy
                  </Text>
                </div>
              </td>
              <MicaComplianceTableCellGroupLayout
                indicatorData={micaIndicators['indicator_1']}
                displayValue={`${Math.round(
                  micaIndicators['indicator_1'].result.value
                ).toLocaleString()}${' '}${micaIndicators[
                  'indicator_1'
                ].unit.replace('kwh', 'kWh')}`}
              />
            </tr>
            <tr>
              <MicaComplianceTableCellGroupLayout
                indicatorData={micaIndicators['indicator_2']}
                displayValue={`${micaIndicators[
                  'indicator_2'
                ].result.value.toFixed(2)}%`}
              />
            </tr>
            <tr>
              <MicaComplianceTableCellGroupLayout
                indicatorData={micaIndicators['indicator_3']}
                displayValue={`${micaIndicators[
                  'indicator_3'
                ].result.value.toFixed(6)}${' '}
                  ${micaIndicators['indicator_3'].unit.replace('kwh', 'kWh')}`}
              />
            </tr>
            <tr>
              <td
                className="py-4 border-b-2 border-gray-100 dark:border-b-graydark-100 hidden md:table-cell"
                rowSpan={3}
              >
                <div className="flex flex-col justify-content items-center gap-4">
                  <CloudUpload32 className="fill-emerald-700 dark:fill-emerald-500" />
                  <Text size="16" weight="light" color="subtle">
                    GHG Emissions
                  </Text>
                </div>
              </td>
              <MicaComplianceTableCellGroupLayout
                indicatorData={micaIndicators['indicator_4']}
                customTitle="Scope 1 - Controlled"
                displayValue={`${
                  micaIndicators['indicator_4'].result.value
                }${' '}
                  ${micaIndicators['indicator_4'].unit}`}
              />
            </tr>
            <tr>
              <MicaComplianceTableCellGroupLayout
                indicatorData={micaIndicators['indicator_5']}
                customTitle="Scope 2 - Purchased"
                displayValue={`${micaIndicators[
                  'indicator_5'
                ].result.value.toLocaleString()}${' '}
                  ${micaIndicators['indicator_5'].unit}`}
              />
            </tr>
            <tr>
              <MicaComplianceTableCellGroupLayout
                indicatorData={micaIndicators['indicator_6']}
                displayValue={`${micaIndicators[
                  'indicator_6'
                ].result.value.toFixed(6)}${' '}
                  ${micaIndicators['indicator_6'].unit}`}
              />
            </tr>
            <tr>
              <td
                className="py-4 border-b-2 border-gray-100 dark:border-b-graydark-100 hidden md:table-cell"
                rowSpan={3}
              >
                <div className="flex flex-col justify-content items-center gap-4">
                  <TrashCan32 className="fill-emerald-700 dark:fill-emerald-500" />
                  <Text size="16" weight="light" color="subtle">
                    Waste Production
                  </Text>
                </div>
              </td>
              <MicaComplianceTableCellGroupLayout
                indicatorData={micaIndicators['indicator_7']}
                displayValue={`${micaIndicators[
                  'indicator_7'
                ].result.value.toFixed(2)}${' '}
                  ${micaIndicators['indicator_7'].unit}`}
              />
            </tr>
            <tr>
              <MicaComplianceTableCellGroupLayout
                indicatorData={micaIndicators['indicator_8']}
                displayValue={`${micaIndicators[
                  'indicator_8'
                ].result.value.toFixed(2)}%`}
              />
            </tr>
            <tr>
              <MicaComplianceTableCellGroupLayout
                indicatorData={micaIndicators['indicator_9']}
                displayValue={`${micaIndicators[
                  'indicator_9'
                ].result.value.toFixed(6)}${' '}
                  ${micaIndicators['indicator_9'].unit}`}
              />
            </tr>
            <tr>
              <td className="py-4 hidden md:table-cell">
                <div className="flex flex-col justify-content items-center gap-4">
                  <Earth32 className="fill-emerald-700 dark:fill-emerald-500" />
                  <Text size="16" weight="light" color="subtle">
                    Natural resources
                  </Text>
                </div>
              </td>
              <MicaComplianceTableCellGroupLayout
                indicatorData={micaIndicators['indicator_10']}
                displayValue={`${Math.round(
                  micaIndicators['indicator_10'].result.value
                ).toLocaleString()}${' '}
                  ${micaIndicators['indicator_10'].unit}`}
                last
              />
            </tr>
          </tbody>
        </table>
      </Panel>
      <div className="w-full flex justify-end py-2">
        <Text size="12" weight="light">
          Last updated {lastUpdated.slice(0, lastUpdated.indexOf('T'))}
        </Text>
      </div>
    </>
  )
}
