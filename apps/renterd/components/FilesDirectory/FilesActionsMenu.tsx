import { Button } from '@siafoundation/design-system'
import {
  Add16,
  CloudUpload16,
  FolderAdd16,
  Search16,
} from '@siafoundation/react-icons'
import * as reactDropzone from 'react-dropzone'
import { useFilesManager } from '../../contexts/filesManager'
import { FilesViewDropdownMenu } from '../Files/FilesViewDropdownMenu'
import { useDialog } from '../../contexts/dialog'
import { useCanUpload } from '../Files/useCanUpload'
// esm compat
const { useDropzone } = reactDropzone

export function FilesActionsMenu() {
  const { openDialog } = useDialog()
  const { uploadFiles, isViewingBuckets } = useFilesManager()

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
          <Button
            onClick={() => openDialog('filesSearch')}
            tip="Search files"
            aria-label="search files"
          >
            <Search16 />
          </Button>
          <Button
            aria-label="Upload files"
            {...getRootProps()}
            tip="Upload files"
            disabled={!canUpload}
          >
            <input {...getInputProps()} />
            <CloudUpload16 />
          </Button>
          <Button
            aria-label="Create directory"
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
