import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box } from '../core/Box'
import { Paragraph } from '../core/Paragraph'

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
        border: '3px dashed $accent9',
        width: '100%',
        height: '100px',
        borderRadius: '$2',
        padding: '$2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        '&:hover': {
          border: '3px dashed $accent10',
        },
        ...(isDragActive && {
          border: '3px dashed $accent10',
          backgroundColor: '$accent2',
        }),
      }}
    >
      <input {...getInputProps()} />
      <Paragraph size="14">
        {title || 'Drop your files here or click to to open the file picker.'}
      </Paragraph>
    </Box>
  )
}
