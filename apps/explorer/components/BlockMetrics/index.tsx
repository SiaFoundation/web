'use client'

import { ContentLayout } from '../ContentLayout'
import { DifficultyMetrics } from './DifficultyMetrics'

type Props = {
  currentTip: number
}

export function BlockMetrics({ currentTip }: Props) {
  return (
    <ContentLayout className="flex flex-col gap-4">
      <DifficultyMetrics currentTip={currentTip} />
    </ContentLayout>
  )
}
