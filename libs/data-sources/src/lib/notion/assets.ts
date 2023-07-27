import { fetchAllPages } from './notion'

const assetsDatabaseId = '7a6838f835d645d1a53ea6651e3dbd4a'

export type Asset = {
  name: string
  folder: string
  fileUrl: string
  fileType: string
}

export async function fetchAllAssets() {
  const allPages = await fetchAllPages({ database_id: assetsDatabaseId })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return allPages.map((i: any): Asset => {
    return {
      name: i.properties.name?.title[0]?.plain_text,
      folder: i.properties.folder?.rich_text[0]?.plain_text || null,
      fileType: getFileExtention(i.properties.file?.files[0]?.name),
      fileUrl: i.properties.file?.files[0]?.file.url || null,
    }
  })
}

function getFileExtention(filePath: string): string {
  if (!filePath) return ''
  return filePath.split('.').pop() || ''
}
