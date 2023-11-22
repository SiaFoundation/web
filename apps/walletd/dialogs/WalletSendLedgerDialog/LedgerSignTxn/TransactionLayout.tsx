import { Panel, Text } from '@siafoundation/design-system'

type Props = {
  title: string
  isSigned?: boolean
  isConnected?: boolean
  details?: React.ReactNode
  actions?: React.ReactNode
}

export function TransactionLayout({
  title,
  isSigned,
  isConnected,
  details,
  actions,
}: Props) {
  return (
    <Panel className="mt-1 pl-3 pr-2 py-2">
      <div className="flex flex-col">
        <div className="flex gap-1 justify-between items-center">
          <div className="flex items-center">
            {isSigned ? (
              <div className="relative w-2 h-2 mr-2">
                <div className="absolute w-2 h-2 rounded-full bg-green-400 animate-pingslow" />
                <div className="absolute w-2 h-2 rounded-full bg-green-500 border border-green-400" />
              </div>
            ) : isConnected ? (
              <div className="relative w-2 h-2 mr-2">
                <div className="absolute w-2 h-2 rounded-full bg-amber-400 animate-pingslow" />
                <div className="absolute w-2 h-2 rounded-full bg-amber-500 border border-amber-400" />
              </div>
            ) : (
              <div className="relative w-2 h-2 mr-2">
                <div className="absolute w-2 h-2 rounded-full bg-gray-1000 border border-gray-900" />
              </div>
            )}
            <Text weight="semibold" size="16" className="ml-1">
              {title}
            </Text>
          </div>
          <div className="flex gap-1 justify-between items-center">
            {actions}
          </div>
        </div>
        {details}
      </div>
    </Panel>
  )
}
