import { cx } from 'class-variance-authority'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { Paragraph } from '../core/Paragraph'

type Props = {
  title?: React.ReactNode
  children?: React.ReactNode
  className?: string
  message?: boolean
  showBorderInactive?: boolean
} & DropzoneOptions

export function Dropzone({
  title,
  children,
  className,
  message,
  showBorderInactive,
  ...props
}: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(props)

  return (
    <div {...getRootProps()} className="outline-none">
      <div
        className={cx(
          isDragActive ? 'z-20' : '',
          'absolute',
          'top-0',
          'left-0',
          'w-full',
          'h-full',
          'pointer-events-none',
          'rounded',
          'p-4',
          'flex justify-center items-center text-center',
          'border-2 border-dashed',
          showBorderInactive
            ? [
                'border-green-600 dark:border-green-500',
                'hover:border-green-700 hover:dark:border-green-500',
              ]
            : 'border-transparent',
          isDragActive
            ? [
                'border-green-500 dark:border-green-600 bg-green-100/20 dark:bg-green-100/20',
                'hover:border-green-500 hover:dark:border-green-600 hover:bg-green-100/20 hover:dark:bg-green-100/20',
              ]
            : '',
          className
        )}
      >
        <input {...getInputProps()} />
        {message && (
          <Paragraph size="14">
            {title ||
              'Drop your files here or click to to open the file picker.'}
          </Paragraph>
        )}
      </div>
      {children}
    </div>
  )
}
