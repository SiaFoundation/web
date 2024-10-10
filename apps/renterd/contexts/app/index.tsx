import React, { createContext, useContext } from 'react'
import { useAutopilotInfo } from './useAutopilotInfo'
import { useBusSdk } from './useBusSdk'

function useAppMain() {
  const autopilotInfo = useAutopilotInfo()
  const bus = useBusSdk()
  const isAutopilotEnabled = !!autopilotInfo.data?.isAutopilotEnabled

  return {
    bus,
    autopilotInfo,
    isAutopilotEnabled,
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
