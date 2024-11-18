'use client'

import React, { useCallback, useState } from 'react'
import { HardDrive, Upload, Download } from 'lucide-react'
import CostSlider from './CostSlider'
import { CostVisualization3D } from './CostVisualization3D'
import {
  Heading,
  Option,
  Panel,
  PoolCombo,
  Select,
} from '@siafoundation/design-system'
import { dataset } from '../lib/dataset'
import { ProviderList } from './ProviderList'
import { without } from 'lodash'

const filterOptions = [
  {
    label: 'object storage',
    value: 'object',
  },
  {
    label: 'e2ee',
    value: 'e2ee',
  },
  {
    label: 'x',
    value: 'x',
  },
]

export function CostComparison() {
  const [sortBy, setSortBy] = useState<'cost' | 'speed'>('cost')
  const [filters, setFilters] = useState<string[]>([])
  const toggleFilter = useCallback((value: string) => {
    setFilters((filters) => {
      if (filters.includes(value)) {
        return without(filters, value)
      }
      return filters.concat(value)
    })
  }, [])
  console.log(filters)
  const [expectedStorage, setExpectedStorage] = useState<number | undefined>(10)
  const [expectedUpload, setExpectedUpload] = useState<number | undefined>(1)
  const [expectedDownload, setExpectedDownload] = useState<number | undefined>(
    1
  )

  const handlePointClick = (
    expectedStorage: number,
    expectedUpload: number,
    expectedDownload: number
  ) => {
    setExpectedStorage(expectedStorage)
    setExpectedUpload(expectedUpload)
    setExpectedDownload(expectedDownload)
  }

  return (
    <div className="flex flex-col gap-5">
      <Panel className="flex gap-2 p-3">
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'cost' | 'speed')}
        >
          <Option value="cost">Cost</Option>
          <Option value="speed">Speed</Option>
        </Select>
        <PoolCombo
          options={filterOptions}
          values={filters}
          onChange={toggleFilter}
        />
        {/* <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Cloud Storage Cost Comparison
        </h2>
        <p className="text-gray-600 mb-6">
          Compare expectedStorage costs across popular providers
        </p> */}
        <CostSlider
          icon={HardDrive}
          label="Storage"
          value={expectedStorage}
          onChange={setExpectedStorage}
        />
        <CostSlider
          icon={Upload}
          label="Upload"
          value={expectedUpload}
          onChange={setExpectedUpload}
        />
        <CostSlider
          icon={Download}
          label="Download"
          value={expectedDownload}
          onChange={setExpectedDownload}
        />
      </Panel>
      <div className="flex gap-5">
        <Panel className="flex-3 flex flex-col gap-2 p-3">
          <ProviderList
            dataset={dataset}
            expectedStorage={expectedStorage || 0}
            expectedDownload={expectedDownload || 0}
            expectedUpload={expectedUpload || 0}
            sortBy={sortBy}
            filters={filters}
          />
        </Panel>
        <Panel className="flex-1 flex flex-col gap-2 p-3">
          <Heading>Optimal Provider by Workload</Heading>
          <CostVisualization3D
            dataset={dataset}
            currentStorage={expectedStorage || 0}
            currentUpload={expectedUpload || 0}
            currentDownload={expectedDownload || 0}
            onPointClick={handlePointClick}
          />
        </Panel>
      </div>
    </div>
  )
}
