import { Avatar, Separator, Skeleton, Text } from '@siafoundation/design-system'
import {
  CloudDownload16,
  CloudUpload16,
  VmdkDisk16,
} from '@siafoundation/react-icons'

export function HostHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-x-4 gap-y-4">
      <div className="flex gap-x-4 gap-y-4 items-center">
        <Avatar shape="square" size="4" />
        <div className="flex flex-wrap gap-3 items-start justify-between w-full">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-[220px]" />
            <Skeleton className="h-5 w-[150px]" />
            <Separator
              className="w-full mt-0.5 !border-gray-200/70 dark:!border-graydark-100"
              color="verySubtle"
            />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[130px]" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex gap-1 items-center">
                <Text color="verySubtle">
                  <VmdkDisk16 />
                </Text>
                <Skeleton className="h-5 w-[100px]" />
              </div>
              <div className="flex gap-1 items-center">
                <Text color="verySubtle">
                  <CloudDownload16 />
                </Text>
                <Skeleton className="h-5 w-[100px]" />
              </div>
              <div className="flex gap-1 items-center">
                <Text color="verySubtle">
                  <CloudUpload16 />
                </Text>
                <Skeleton className="h-5 w-[100px]" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex justify-end">
                <Skeleton className="h-5 w-[50px]" />
              </div>
              <div className="flex justify-end">
                <Skeleton className="h-5 w-[50px]" />
              </div>
              <div className="flex justify-end">
                <Skeleton className="h-5 w-[50px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
