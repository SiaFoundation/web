import { useCallback, useState } from 'react'
import { triggerErrorToast } from '@siafoundation/design-system'
import { useApp } from '../app'
import { FileContractID } from '@siafoundation/types'

type PrunableSizeData = { id: FileContractID; size: number; prunable: number }
type PrunableSizes = Record<FileContractID, PrunableSizeData>

export function usePrunableContractSizes() {
  const { bus } = useApp()

  const [prunableSizes, setPrunableSizes] = useState<PrunableSizes>({})
  const [isFetchingPrunableSizeById, setIsFetchingPrunableById] = useState<
    Record<FileContractID, boolean>
  >({})
  const [isFetchingPrunableSizeAll, setIsFetchingPrunableAll] = useState(false)

  const fetchPrunableSizeAll = useCallback(async () => {
    try {
      setIsFetchingPrunableAll(true)
      const prunable = await bus?.contractsPrunable()
      setPrunableSizes((data) => ({
        ...data,
        ...prunable?.data?.contracts.reduce(
          (acc, contract) => ({
            ...acc,
            [contract.id]: {
              id: contract.id,
              size: contract.size,
              prunable: contract.prunable,
            },
          }),
          {},
        ),
      }))
    } catch (err) {
      triggerErrorToast({ title: 'Error', body: (err as Error).message })
    } finally {
      setIsFetchingPrunableAll(false)
    }
  }, [bus])

  const fetchPrunableSize = useCallback(
    async (id: string) => {
      try {
        setIsFetchingPrunableById((data) => ({
          ...data,
          [id]: true,
        }))
        const prunable = await bus?.contractSize({ params: { id } })
        if (!prunable) {
          return
        }
        setPrunableSizes((data) => ({
          ...data,
          [id]: {
            id,
            ...prunable.data,
          },
        }))
      } catch (err) {
        triggerErrorToast({ title: 'Error', body: (err as Error).message })
      } finally {
        setIsFetchingPrunableById((data) => ({
          ...data,
          [id]: false,
        }))
      }
    },
    [bus],
  )

  return {
    prunableSizes,
    isFetchingPrunableSizeAll,
    isFetchingPrunableSizeById,
    fetchPrunableSize,
    fetchPrunableSizeAll,
  }
}
