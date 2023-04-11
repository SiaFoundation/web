import React, { createContext, useContext } from 'react'
import { useAutopilot } from '../hooks/useAutopilot'

function useRenterdMain() {
  const autopilotMode = useAutopilot()
  return {
    autopilotMode,
  }
}

type State = ReturnType<typeof useRenterdMain>

const RenterdContext = createContext({} as State)
export const useRenterd = () => useContext(RenterdContext)

type Props = {
  children: React.ReactNode
}

export function RenterdProvider({ children }: Props) {
  const state = useRenterdMain()
  return (
    <RenterdContext.Provider value={state}>{children}</RenterdContext.Provider>
  )
}
