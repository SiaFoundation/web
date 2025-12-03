import { Button } from '@siafoundation/design-system'
import { CloudUpload16, Search16 } from '@siafoundation/react-icons'
import * as reactDropzone from 'react-dropzone'
import { useDialog } from '../../contexts/dialog'
import { FilesViewDropdownMenu } from '../Files/FilesViewDropdownMenu'
import { useFilesFlat } from '../../contexts/filesFlat'
import { useCanUpload } from '../Files/useCanUpload'
import { useUploadsManager } from '../../contexts/uploadsManager'
// esm compat
const { useDropzone } = reactDropzone

export function FilesFlatActionsMenu() {
  const { openDialog } = useDialog()
  const { tableState } = useFilesFlat()
  const { uploadFiles } = useUploadsManager()
  const canUpload = useCanUpload()

  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    noClick: !canUpload,
    onDrop: uploadFiles,
  })

  return (
    <div className="flex gap-2">
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
      <FilesViewDropdownMenu tableState={tableState} />
    </div>
  )
}
