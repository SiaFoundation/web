'use client'

import { Button } from '@siafoundation/design-system'
import { useState } from 'react'

type ExplorerCopyableCodeBlockProps = {
  value: string
}

export function ExplorerCopyableCodeBlock({ value }: ExplorerCopyableCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative">
      <pre className="w-full p-4 text-sm bg-gray-100 dark:bg-graydark-50 text-gray-1000 dark:text-graydark-1000 border border-gray-300 dark:border-gray-700 rounded overflow-x-auto">
        <code className="font-mono whitespace-pre">{value}</code>
      </pre>
      <Button
        onClick={handleCopy}
        variant="gray"
        className="absolute top-3 right-6"
      >
        {copied ? 'Copied' : 'Copy'}
      </Button>
    </div>
  )
}
