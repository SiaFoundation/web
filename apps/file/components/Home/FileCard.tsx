'use client'

import { Document16 } from '@siafoundation/react-icons'
import React from 'react'

interface FileCardProps {
  file: {
    name: string
    content: Blob & { type: string }
  }
}

const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const isImage = file.content.type.includes('image')

  return (
    <div key={file.name} className="border p-4 shadow rounded-lg">
      {isImage ? (
        <img
          src={URL.createObjectURL(file.content)}
          alt={file.name}
          className="w-full h-64 object-cover object-center mb-4 rounded"
        />
      ) : (
        <div className="flex justify-center items-center h-64">
          <Document16 />
        </div>
      )}
      <div className="text-lg font-semibold truncate">{file.name}</div>
      <div className="text-sm text-gray-500">CID: {file.cid}</div>
      <div className="text-gray-500">
        {(file.content.size / 1024).toFixed(2)} KB
      </div>
    </div>
  )
}

export default FileCard
