import { Button } from '@siafoundation/design-system'
import {
  Add16,
  CloudUpload16,
  FolderAdd16,
  Search16,
} from '@siafoundation/react-icons'
import { useFiles } from '../../contexts/files'
import { useDropzone } from 'react-dropzone'
import { FilesViewDropdownMenu } from './FilesViewDropdownMenu'
import { useDialog } from '../../contexts/dialog'
import { useCanUpload } from './useCanUpload'

export function FilesActionsMenu() {
  const { openDialog } = useDialog()
  const { uploadFiles, isViewingBuckets } = useFiles()

  const canUpload = useCanUpload()

  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    noClick: !canUpload,
    onDrop: uploadFiles,
  })

  return (
    <div className="flex gap-2">
      {isViewingBuckets ? (
        <Button
          onClick={() => openDialog('filesCreateBucket')}
          tip="Create bucket"
        >
          <Add16 />
          Create bucket
        </Button>
      ) : (
        <>
          <Button onClick={() => openDialog('filesSearch')} tip="Search files">
            <Search16 />
          </Button>
          <Button {...getRootProps()} tip="Upload files" disabled={!canUpload}>
            <input {...getInputProps()} />
            <CloudUpload16 />
          </Button>
          <Button
            disabled={!canUpload}
            onClick={() => openDialog('filesCreateDirectory')}
            tip="Create directory"
          >
            <FolderAdd16 />
          </Button>
        </>
      )}
      <FilesViewDropdownMenu />
    </div>
  )
}
