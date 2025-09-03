import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

export function Layout({
  table,
  panel,
}: {
  table: React.ReactNode
  panel: React.ReactNode
}) {
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <PanelGroup autoSaveId="data-layout" direction="horizontal">
        <Panel maxSize={75} className="py-4 pl-4 pr-2">
          {table}
        </Panel>
        <PanelResizeHandle />
        <Panel
          defaultSize={25}
          minSize={25}
          maxSize={50}
          className="py-4 pl-2 pr-4"
        >
          {panel}
        </Panel>
      </PanelGroup>
    </div>
  )
}
