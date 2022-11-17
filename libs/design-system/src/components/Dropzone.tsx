import { cx } from 'class-variance-authority'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
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
    <div
      className={cx(
        'w-full',
        'h-[100px]',
        'rounded',
        'p-4',
        'flex justify-center items-center text-center',
        'border-2 border-dashed',
        'border-green-600 dark:border-accentdark-500',
        'hover:border-green-700 hover:dark:border-accentdark-600',
        isDragActive
          ? 'border-green-700 dark:border-accentdark-600 bg-green-100 dark:bg-green-100/20'
          : ''
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Paragraph size="14">
        {title || 'Drop your files here or click to to open the file picker.'}
      </Paragraph>
    </div>
  )
}
