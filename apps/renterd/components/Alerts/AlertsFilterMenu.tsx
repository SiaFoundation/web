'use client'

import { Button, PaginatorKnownTotal, Text } from '@siafoundation/design-system'
import { useAlerts } from '../../contexts/alerts'
import { Checkmark16 } from '@carbon/icons-react'

export function AlertsFilterMenu() {
  const {
    severityFilter,
    setSeverityFilter,
    offset,
    limit,
    totals,
    pageCount,
    dataState,
    datasetPage,
    dismissMany,
  } = useAlerts()

  return (
    <div className="flex gap-2 w-full items-center">
      <Text weight="medium">Filter</Text>
      <div className="flex gap-1 items-center">
        <Button
          variant={severityFilter === undefined ? 'active' : 'inactive'}
          onClick={() => setSeverityFilter(undefined)}
        >
          all ({totals.all})
        </Button>
        <Button
          variant={severityFilter === 'info' ? 'active' : 'inactive'}
          onClick={() => setSeverityFilter('info')}
        >
          info ({totals.info})
        </Button>
        <Button
          variant={severityFilter === 'warning' ? 'active' : 'inactive'}
          onClick={() => setSeverityFilter('warning')}
        >
          warning ({totals.warning})
        </Button>
        <Button
          variant={severityFilter === 'error' ? 'active' : 'inactive'}
          onClick={() => setSeverityFilter('error')}
        >
          error ({totals.error})
        </Button>
        <Button
          variant={severityFilter === 'critical' ? 'active' : 'inactive'}
          onClick={() => setSeverityFilter('critical')}
        >
          critical ({totals.critical})
        </Button>
      </div>
      <div className="flex-1" />
      {!dataState && !!pageCount && (
        <Button
          tip={severityFilter ? `dismiss ${pageCount}` : 'dismiss all'}
          onClick={() => dismissMany(datasetPage.map((a) => a.id))}
        >
          <Checkmark16 />
          Dismiss ({pageCount})
        </Button>
      )}
      <PaginatorKnownTotal
        offset={offset}
        limit={limit}
        isLoading={dataState === 'loading'}
        datasetTotal={totals.all}
        pageTotal={pageCount}
      />
    </div>
  )
}
