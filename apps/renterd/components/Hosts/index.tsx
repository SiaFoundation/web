import { ScrollArea, Table } from '@siafoundation/design-system'
import { useHosts } from '../../contexts/hosts'
import { StateEmpty } from './StateEmpty'
import { HostMap } from './HostMap'
import { cx } from 'class-variance-authority'
import { getHostStatus } from '../../contexts/hosts/status'

export function Hosts() {
  const {
    datasetPage,
    activeHost,
    columns,
    limit,
    datasetState,
    tableContext,
    viewMode,
  } = useHosts()

  return (
    <div className="relative flex flex-col overflow-hidden h-full w-full">
      <div
        className={cx(
          'absolute h-[70%] w-full',
          viewMode === 'map' ? 'block' : 'invisible',
          'transition-all'
        )}
      >
        <HostMap />
      </div>
      <div
        className={cx(
          'absolute overflow-hidden transition-all w-full',
          'duration-300',
          'overflow-hidden'
        )}
        style={{
          bottom: 0,
          height:
            viewMode === 'map'
              ? datasetPage && datasetPage.length
                ? 400 - Math.max((2 - datasetPage.length) * 100, 0)
                : 400
              : '100%',
        }}
      >
        <ScrollArea className="z-0" id="scroll-hosts">
          <div
            className={cx(
              viewMode === 'map' ? 'pb-6 px-6' : 'p-6',
              'min-w-fit'
            )}
          >
            <Table
              testId="hostsTable"
              focusId={activeHost?.publicKey}
              focusColor={
                activeHost ? getHostStatus(activeHost).colorName : undefined
              }
              isLoading={datasetState === 'loading'}
              emptyState={<StateEmpty />}
              context={tableContext}
              pageSize={limit}
              data={datasetPage}
              columns={columns}
              rowSize="default"
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
