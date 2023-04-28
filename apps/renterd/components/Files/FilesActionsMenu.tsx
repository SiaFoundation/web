import {
  Button,
  CloudUpload16,
  FolderAdd16,
  PaginatorKnownTotal,
  Search16,
} from '@siafoundation/design-system'
import { useFiles } from '../../contexts/files'
import { useDropzone } from 'react-dropzone'
import { FilesViewDropdownMenu } from './FilesViewDropdownMenu'
import { useDialog } from '../../contexts/dialog'

export function FilesActionsMenu() {
  const { openDialog } = useDialog()
  const { uploadFiles, dataState, offset, limit, datasetCount, pageCount } =
    useFiles()

  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    onDrop: uploadFiles,
  })

  return (
    <div className="flex gap-2">
      <Button onClick={() => openDialog('filesSearch')} tip="Search files">
        <Search16 />
      </Button>
      <Button {...getRootProps()} tip="Upload files">
        <input {...getInputProps()} />
        <CloudUpload16 />
      </Button>
      <Button
        onClick={() => openDialog('filesCreateDirectory')}
        tip="Create directory"
      >
        <FolderAdd16 />
      </Button>
      <FilesViewDropdownMenu />
    </div>
  )
}
