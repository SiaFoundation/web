'use client'

// FileListItem.tsx
import React from 'react'
import { FileIcon } from 'react-file-icon'

interface FileListItemProps {
  file: {
    name: string
    content: Blob & { type: string }
  }
}

const FileListItem: React.FC<FileListItemProps> = ({ file }) => {
  const isImage = file.content.type.includes('image')

  return (
    <div className="flex items-center p-4 border-b last:border-b-0">
      <div className="flex-grow">
        <div className="text-lg font-semibold">{file.name}</div>
        <div className="text-gray-500">
          {(file.content.size / 1024).toFixed(2)} KB
        </div>
      </div>
      {isImage ? (
        <img
          src={URL.createObjectURL(file.content)}
          alt={file.name}
          className="w-16 h-16 object-cover rounded"
        />
      ) : (
        <div className="flex justify-center items-center w-16 h-16">
          <FileIcon extension={file.name.split('.').pop()} size={30} />
        </div>
      )}
    </div>
  )
}

export default FileListItem
