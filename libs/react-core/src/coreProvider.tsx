import { SWRConfig as BaseSWRConfig } from 'swr'
import { WorkflowsProvider } from './workflows'

type Props = {
  fallback?: Record<string, unknown>
  children: React.ReactNode
}

export function CoreProvider({ fallback, children }: Props) {
  return (
    <WorkflowsProvider>
      <BaseSWRConfig
        value={{
          fallback: fallback || {},
        }}
      >
        {children}
      </BaseSWRConfig>
    </WorkflowsProvider>
  )
}
