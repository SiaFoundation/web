import React, { createContext, useContext } from 'react'
import { useAutopilot } from './useAutopilot'

function useAppMain() {
  const autopilot = useAutopilot()
  return {
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
