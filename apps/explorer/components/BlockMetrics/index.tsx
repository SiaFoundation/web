'use client'

import { ContentLayout } from '../ContentLayout'
import { DifficultyMetrics } from './DifficultyMetrics'

export function BlockMetrics() {
  return (
    <ContentLayout className="flex flex-col gap-4">
      <DifficultyMetrics />
    </ContentLayout>
  )
}
