'use client'

import Navbar from './Navbar'
import FileCard from './FileCard'
import FileListItem from './FileListItem'
import { useFiles } from '../../contexts/files'

export function FilePicker() {
  const { handleFileSelect, files, formattedSize, viewMode, setViewMode } =
    useFiles()
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-end items-center mb-4">
          <div>
            <span>Total Files: {files.data?.length}</span>,
            <span> Used Space: {formattedSize} KB</span>
          </div>
          <button
            onClick={() => setViewMode('card')}
            className={`px-4 py-2 ${
              viewMode === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Card View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`ml-2 px-4 py-2 ${
              viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            List View
          </button>
        </div>
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="file-input mb-4 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:border-0 file:text-sm file:font-semibold
                     file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
        />
        {files.isValidating ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-400 h-12 w-12"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-gray-400 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-gray-400 rounded col-span-2"></div>
                    <div className="h-2 bg-gray-400 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
          ))
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.data?.map((file, index) => (
              <FileCard key={index} file={file} />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {files.data?.map((file, index) => (
              <FileListItem key={index} file={file} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
