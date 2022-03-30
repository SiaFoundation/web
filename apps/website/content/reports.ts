import { baseAssetPath } from '../config/app'
import path from 'path'
import fs from 'fs'
import { toPairs } from 'lodash'
import { getHref } from '../lib/url'
import { getHosts } from '@siafoundation/env'

const hosts = getHosts()

type Report = {
  year: string
  quarter: string
  link: string
}

export function getReports(): [string, Report[]][] {
  let reports: Report[] = []

  try {
    reports = fs
      .readdirSync(path.join(baseAssetPath, 'transparency'))
      .map((filename) => {
        const [name, ext] = filename.split('.')
        const [year, quarter] = name.split('-')

        if (!(name && ext && year && quarter)) {
          return null
        }

        return {
          year,
          quarter: quarter.toUpperCase(),
          link: getHref(`${hosts.app}/transparency/${filename}`),
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
