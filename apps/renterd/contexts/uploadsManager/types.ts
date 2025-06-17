import { ObjectData } from '../filesManager/types'
import { MultipartUpload } from '../../lib/multipartUpload'

export type UploadStatus =
  | 'queued'
  // Uploading from the browser to the renterd daemon.
  | 'uploading to daemon'
  // Uploading from the renterd daemon to the hosts.
  | 'uploading to hosts'

export type ObjectUploadData = ObjectData & {
  multipartId?: string
  multipartUpload?: MultipartUpload
  uploadStatus: UploadStatus
  uploadAbort?: () => Promise<void>
  uploadFile?: File
  remote?: boolean
  createdAt: string
}

export type UploadsMap = Record<string, ObjectUploadData>
