import {
  Button,
  CloudUpload16,
  // FolderAdd16,
} from '@siafoundation/design-system'
import { useDropzone } from 'react-dropzone'
import { useUploads } from '../../contexts/uploads'

export function FilesActions() {
  const { onDrop } = useUploads()

  const { getRootProps, getInputProps } = useDropzone({ noDrag: true, onDrop })

  return (
    <>
      {/* <Button>
        <FolderAdd16 />
        Create folder
      </Button> */}
      <Button {...getRootProps()}>
        <input {...getInputProps()} />
        <CloudUpload16 />
        Add files
      </Button>
    </>
  )
}
