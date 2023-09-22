import { CommandGroup, CommandItemSearch } from '../../../CmdRoot/Item'
import { Page } from '../../../CmdRoot/types'
import { useObjectSearch } from '@siafoundation/react-renterd'
import {
  getDirectorySegmentsFromPath,
  isDirectory,
} from '../../../../contexts/files/paths'
import { useFiles } from '../../../../contexts/files'
import { Text } from '@siafoundation/design-system'
import { Document16, FolderIcon } from '@siafoundation/react-icons'
import { FileSearchEmpty } from './FileSearchEmpty'

export const filesSearchPage = {
  namespace: 'files/search',
  label: 'File search',
  prompt: 'Search for files, eg: backups, photo_archive.zip, etc...',
  empty: FileSearchEmpty,
}

export function FilesSearchCmd({
  debouncedSearch,
  search,
  currentPage,
  beforeSelect,
  afterSelect,
}: {
  debouncedSearch: string
  search: string
  currentPage?: Page
  beforeSelect?: () => void
  afterSelect?: () => void
}) {
  const { activeBucket, setActiveDirectory } = useFiles()
  const onSearchPage = currentPage?.namespace === filesSearchPage.namespace
  const results = useObjectSearch({
    disabled: !onSearchPage,
    params: {
      bucket: activeBucket || 'default',
      key: debouncedSearch,
      skip: 0,
      limit: 10,
    },
    config: {
      swr: {
        keepPreviousData: true,
      },
    },
  })

  if (!onSearchPage || !results.data) {
    return null
  }

  return (
    <CommandGroup currentPage={currentPage} commandPage={filesSearchPage}>
      {results.data.map(({ name: path }) => {
        const compressedPath = compressPath(path, search, 55)
        const { startIndex, endIndex } = findLastMatch(compressedPath, search)

        return (
          <CommandItemSearch
            commandPage={filesSearchPage}
            currentPage={currentPage}
            key={path}
            onSelect={() => {
              beforeSelect()
              setActiveDirectory(() => getDirectorySegmentsFromPath(path))
              afterSelect()
            }}
            value={path}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <Text
                color="verySubtle"
                className="group-data-[selected=true]:text-gray-1000 dark:group-data-[selected=true]:text-graydark-1000"
              >
                {isDirectory(path) ? <FolderIcon size={16} /> : <Document16 />}
              </Text>
              <Text className="flex items-center">
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
