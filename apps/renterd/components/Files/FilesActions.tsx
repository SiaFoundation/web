import {
  Button,
  CloudUpload16,
  // FolderAdd16,
} from '@siafoundation/design-system'
import { useFiles } from '../../contexts/files'
import { useDropzone } from 'react-dropzone'

export function FilesActions() {
  const { onDrop } = useFiles()

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
