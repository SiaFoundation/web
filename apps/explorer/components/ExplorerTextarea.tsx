'use client'

import { Button } from '@siafoundation/design-system'
import { useEffect, useRef, useState } from 'react'

type ExplorerTextareaProps = {
  value: string
}

export function ExplorerTextarea({ value }: ExplorerTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [copied, setCopied] = useState(false)

  // Render the textarea at the height of the dynamic content within it.
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = `${ref.current.scrollHeight}px`
    }
  }, [value])

  function handleCopy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative">
      <textarea
        readOnly
        ref={ref}
        value={value}
        className="w-full p-4 text-sm bg-gray-100 dark:bg-graydark-50 text-gray-1000 dark:text-graydark-1000 border border-gray-300 dark:border-gray-700 rounded font-mono whitespace-pre"
      />
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
