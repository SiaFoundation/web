import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box } from '../primitives/Box'
import { Paragraph } from '../primitives/Paragraph'

type Props = {
  title?: React.ReactNode
  onFiles: (files: File[]) => void
}

export function Dropzone({ title, onFiles }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFiles(acceptedFiles)
    },
    [onFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Box
      {...getRootProps()}
      css={{
        border: '3px solid $primary4',
        width: '100%',
        height: '100px',
        borderRadius: '$3',
        borderStyle: 'dashed',
        padding: '$3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        ...(isDragActive && {
          border: '3px solid $primary10',
          backgroundColor: '$primary1',
        }),
      }}
    >
      <input {...getInputProps()} />
      <Paragraph size="1">
        {title || 'Drop your files here or click to to open the file picker.'}
      </Paragraph>
    </Box>
  )
}
