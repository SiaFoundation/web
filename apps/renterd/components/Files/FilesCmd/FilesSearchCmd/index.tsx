import { CommandGroup, CommandItemSearch } from '../../../CmdRoot/Item'
import { Page } from '../../../CmdRoot/types'
import { useObjects } from '@siafoundation/renterd-react'
import { isDirectory } from '../../../../lib/paths'
import { Button, Text } from '@siafoundation/design-system'
import { Document16, FolderIcon } from '@siafoundation/react-icons'
import { FileSearchEmpty } from './FileSearchEmpty'
import { useFilesManager } from '../../../../contexts/filesManager'
import { useMemo } from 'react'
import { ObjectsParams } from '@siafoundation/renterd-types'

export const filesSearchAllPage = {
  namespace: 'files/search/all',
  label: 'Search all files',
  prompt: 'Search for files, eg: backups, photo_archive.zip, etc...',
  empty: FileSearchEmpty,
}

export function getFilesSearchBucketPage(activeBucketName: string) {
  return {
    namespace: 'files/search/bucket',
    label: 'Search files in current bucket',
    prompt: 'Search for files, eg: backups, photo_archive.zip, etc...',
    tag: activeBucketName,
    empty: FileSearchEmpty,
  }
}

export function FilesSearchCmd({
  debouncedSearch,
  search,
  currentPage,
  beforeSelect,
  afterSelect,
  mode,
}: {
  mode: 'global' | 'bucket'
  debouncedSearch: string
  search: string
  currentPage?: Page
  beforeSelect?: () => void
  afterSelect?: () => void
}) {
  const { activeBucketName, navigateToModeSpecificFiltering } =
    useFilesManager()
  const activePage =
    mode === 'global'
      ? filesSearchAllPage
      : getFilesSearchBucketPage(activeBucketName)
  const onSearchPage = currentPage?.namespace === activePage.namespace
  const validMode = mode === 'global' || (mode === 'bucket' && activeBucketName)
  const params = useMemo(() => {
    const p: ObjectsParams = {
      prefix: '',
      limit: 10,
      delimiter: '',
      substring: debouncedSearch,
    }
    if (mode === 'bucket' && activeBucketName) {
      p.bucket = activeBucketName
    }
    return p
  }, [mode, activeBucketName, debouncedSearch])

  const results = useObjects({
    disabled: !onSearchPage || !validMode,
    params,
    config: {
      swr: {
        keepPreviousData: true,
      },
    },
  })

  if (!onSearchPage || !results.data?.objects) {
    return null
  }

  return (
    <CommandGroup currentPage={currentPage} commandPage={activePage}>
      {results.data?.objects.map(({ key, bucket }) => {
        const compressedPath = compressPath(key, search, 55)
        const { startIndex, endIndex } = findLastMatch(compressedPath, search)

        return (
          <CommandItemSearch
            commandPage={activePage}
            currentPage={currentPage}
            key={key}
            onSelect={() => {
              beforeSelect()
              navigateToModeSpecificFiltering(bucket + key)
              afterSelect()
            }}
            value={key}
          >
            <div className="flex items-center gap-2 w-full">
              <Text
                color="verySubtle"
                className="group-data-[selected=true]:text-gray-1000 dark:group-data-[selected=true]:text-graydark-1000"
              >
                {isDirectory(key) ? <FolderIcon size={16} /> : <Document16 />}
              </Text>
              <Text className="flex items-center flex-1 overflow-hidden">
                <Text color="verySubtle" ellipsis>
                  {compressedPath.slice(0, startIndex)}
                </Text>
                <Text color="accent" ellipsis>
                  {compressedPath.slice(startIndex, endIndex)}
                </Text>
                <Text color="verySubtle" ellipsis>
                  {compressedPath.slice(endIndex)}
                </Text>
              </Text>
              {mode === 'global' ? (
                <Button
                  variant="inactive"
                  state="waiting"
                  size="small"
                  tabIndex={-1}
                >
                  {bucket}
                </Button>
              ) : null}
            </div>
          </CommandItemSearch>
        )
      })}
    </CommandGroup>
  )
}

function compressPath(path: string, search: string, maxLength: number): string {
  const needToRemoveCount = Math.max(path.length - maxLength, 0)
  if (needToRemoveCount === 0) {
    return path
  }
  const placeholder = '...'
  const revPath = reverseStr(path)
  const revSearch = reverseStr(search)
  // currently assumes only a single match, could be improved
  // but works decently since uses the match furtherest down the path.
  const searchIndexStart = revPath
    .toLowerCase()
    .indexOf(revSearch.toLowerCase())
  const searchIndexEnd = searchIndexStart + revSearch.length - 1

  let removedCount = 0
  let currentIndex = 0
  const segments = revPath.split('/')
  const replacedSegments = segments.map((segment) => {
    if (removedCount >= needToRemoveCount) {
      currentIndex += segment.length
      return reverseStr(segment)
    }
    const segmentStartIndex = currentIndex
    const segmentEndIndex = currentIndex + segment.length + 1
    if (
      segmentStartIndex < searchIndexEnd &&
      segmentEndIndex > searchIndexStart
    ) {
      currentIndex += segment.length
      return reverseStr(segment)
    }
    if (!segment.includes(revSearch) && segment.length > 3) {
      currentIndex += segment.length
      removedCount += segment.length + 1
      return placeholder
    }
    currentIndex += segment.length
    return reverseStr(segment)
  })
  return replacedSegments.reverse().join('/')
}

function reverseStr(str: string): string {
  return str.split('').reverse().join('')
}

function findLastMatch(path: string, search: string) {
  const revPath = reverseStr(path)
  const revSearch = reverseStr(search)
  const startIndex = revPath.toLowerCase().indexOf(revSearch.toLowerCase())
  const endIndex = startIndex + revSearch.length
  return {
    endIndex: path.length - startIndex,
    startIndex: path.length - endIndex,
  }
}
