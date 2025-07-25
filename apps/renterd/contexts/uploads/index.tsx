import React, { createContext, useCallback, useContext, useState } from 'react'
import { useFilesManager } from '../filesManager'
import { useRemoteUploads } from './useRemoteUploads'
import { useLocalUploads } from './useLocalUploads'
import { useResetPagination } from '@siafoundation/design-system'

function useUploadsMain() {
  const { activeBucket } = useFilesManager()
  const [activeView, _setActiveView] = useState<
    'localUploads' | 'globalUploads'
  >('localUploads')
  const resetPagination = useResetPagination()
  const setActiveView = useCallback(
    (view: 'localUploads' | 'globalUploads') => {
      resetPagination()
      _setActiveView(view)
    },
    [resetPagination]
  )
  const remoteUploads = useRemoteUploads()
  const localUploads = useLocalUploads()
  const activePage =
    activeView === 'localUploads'
      ? localUploads.datasetPage
      : remoteUploads.datasetPage

  const abortAll = useCallback(async () => {
    if (!activePage || !activeBucket?.name) {
      return
    }
    return Promise.all(activePage.map((upload) => upload.uploadAbort?.()))
  }, [activePage, activeBucket])

  return {
    activeView,
    setActiveView,
    activeData: activeView === 'localUploads' ? localUploads : remoteUploads,
    remoteUploads,
    localUploads,
    activeDatasetState:
      activeView === 'localUploads'
        ? localUploads.datasetState
        : remoteUploads.datasetState,
    activeTableState:
      activeView === 'localUploads'
        ? localUploads.tableState
        : remoteUploads.tableState,
    abortAll,
  }
}

type State = ReturnType<typeof useUploadsMain>

const UploadsContext = createContext({} as State)
export const useUploads = () => useContext(UploadsContext)

type Props = {
  children: React.ReactNode
}

export function UploadsProvider({ children }: Props) {
  const state = useUploadsMain()
  return (
    <UploadsContext.Provider value={state}>{children}</UploadsContext.Provider>
  )
}
