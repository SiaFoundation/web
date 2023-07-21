import fs from 'fs'
import { toPairs } from 'lodash'
import { webLinks } from '@siafoundation/design-system'
import { getMinutesInSeconds } from '../lib/time'
import { getCacheValue } from '../lib/cache'
import { getContentPath } from '@siafoundation/env'

type Report = {
  year: string
  quarter: string
  link: string
}
type ReportPair = [string, Report[]]

const maxAge = getMinutesInSeconds(5)

export async function getReports(): Promise<ReportPair[]> {
  return getCacheValue('transparencyReports', async () => readReports(), maxAge)
}

function readReports(): ReportPair[] {
  let reports: Report[] = []

  try {
    reports = fs
      .readdirSync(getContentPath('transparency'))
      .map((filename) => {
        const [name, ext] = filename.split('.')
        const [year, quarter] = name.split('-')

        if (!(name && ext && year && quarter)) {
          return null
        }

        return {
          year,
          quarter: quarter.toUpperCase(),
          link: `${webLinks.website}/transparency/${filename}`,
        }
      })
      .filter((i) => i)
  } catch (e) {
    return []
  }

  const reportsMap = reports.reduce((acc, report) => {
    const year = acc[report.year] || []
    return {
      ...acc,
      [report.year]: year
        .concat(report)
        .sort((a, b) => (a.quarter > b.quarter ? 1 : -1)),
    }
  }, {} as Record<string, Report[]>)

  return toPairs(reportsMap).sort((a, b) => (a[0] < b[0] ? 1 : -1))
}
