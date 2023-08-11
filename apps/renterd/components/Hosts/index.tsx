import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { ScrollArea, Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useHosts } from '../../contexts/hosts'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { StateEmpty } from './StateEmpty'
import { HostsActionsMenu } from './HostsActionsMenu'
import { HostsFilterBar } from './HostsFilterBar'
import { HostMap } from './HostMap'
import { cx } from 'class-variance-authority'

export function Hosts() {
  const { openDialog } = useDialog()
  const {
    dataset,
    activeHost,
    columns,
    limit,
    dataState,
    tableContext,
    viewMode,
  } = useHosts()

  return (
    <RenterdAuthedLayout
      title="Hosts"
      routes={routes}
      sidenav={<RenterdSidenav />}
      openSettings={() => openDialog('settings')}
      size="full"
      actions={<HostsActionsMenu />}
      stats={<HostsFilterBar />}
      scroll={false}
    >
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
                ? dataset && dataset.length
                  ? 400 - Math.max((2 - dataset.length) * 100, 0)
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
                focusId={activeHost?.publicKey}
                focusColor={
                  activeHost?.activeContractsCount.gt(0) && !activeHost?.usable
                    ? 'red'
                    : activeHost?.activeContractsCount.gt(0)
                    ? 'blue'
                    : 'green'
                }
                isLoading={dataState === 'loading'}
                emptyState={<StateEmpty />}
                context={tableContext}
                pageSize={limit}
                data={dataset}
                columns={columns}
                rowSize="default"
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </RenterdAuthedLayout>
  )
}
