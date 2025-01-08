import { ObjectData } from '../filesManager/types'
import { MultipartUpload } from '../../lib/multipartUpload'

export type UploadStatus = 'queued' | 'uploading' | 'processing'

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
