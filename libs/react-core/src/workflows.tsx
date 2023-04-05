import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

export type WorkflowPayload = Record<string, unknown> | undefined
type PendingMap = Record<string, WorkflowPayload>

function useWorkflowsMain() {
  const [workflowsMap, setWorkflowsMap] = useState<PendingMap>({})

  const setWorkflow = useCallback(
    (key: string, item?: WorkflowPayload) => {
      setWorkflowsMap((workflows) => {
        return {
          ...workflows,
          [key]: {
            key,
            ...item,
          },
        }
      })
    },
    [setWorkflowsMap]
  )

  const removeWorkflow = useCallback(
    (key: string) => {
      setWorkflowsMap((workflows) => {
        delete workflows[key]
        return {
          ...workflows,
        }
      })
    },
    [setWorkflowsMap]
  )

  const resetWorkflows = useCallback(() => {
    setWorkflowsMap({})
  }, [setWorkflowsMap])

  const workflows = useMemo(
    () => Object.entries(workflowsMap).map((i) => i[1]),
    [workflowsMap]
  )

  return {
    setWorkflow,
    removeWorkflow,
    resetWorkflows,
    workflows,
  }
}

type State = ReturnType<typeof useWorkflowsMain>

const WorkflowsContext = createContext({} as State)
export const useWorkflows = () => useContext(WorkflowsContext)

type Props = {
  children: React.ReactNode
}

export function WorkflowsProvider({ children }: Props) {
  const state = useWorkflowsMain()
  return (
    <WorkflowsContext.Provider value={state}>
      {children}
    </WorkflowsContext.Provider>
  )
}
