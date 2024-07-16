import type React from 'react'
import { createContext, useContext } from 'react'
import { useAutopilot } from './useAutopilot'
import { useBusSdk } from './useBusSdk'

function useAppMain() {
  const autopilot = useAutopilot()
  const bus = useBusSdk()

  return {
    bus,
    autopilot,
  }
}

type State = ReturnType<typeof useAppMain>

const AppContext = createContext({} as State)
export const useApp = () => useContext(AppContext)

type Props = {
  children: React.ReactNode
}

export function AppProvider({ children }: Props) {
  const state = useAppMain()
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}
