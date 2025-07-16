import { createContext, useContext } from 'react'
import { useBusSdk } from './useBusSdk'

function useAppMain() {
  const bus = useBusSdk()

  return {
    bus,
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
