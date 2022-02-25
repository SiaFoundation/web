import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export async function getMdxFile(filePath) {
  const markdownWithMeta = fs.readFileSync(
    path.join('apps/website', filePath),
    'utf-8'
  )

  const { data, content } = matter(markdownWithMeta)
  const source = await serialize(content)

  return {
    ...data,
    source,
  }
}
