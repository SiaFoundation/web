import { initSDK } from '@siafoundation/sdk'
import { createContext, useContext, useEffect } from 'react'

function useAppMain() {
  // Initialize the SDK on app load
  useEffect(() => {
    const func = async () => {
      await initSDK()
    }
    func()
  }, [])
  return {}
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
