import { truncate } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'
import { humanSiacoin } from '@siafoundation/units'

import { getOGImage } from '../../../components/OGImageEntity'
import { getExplored } from '../../../lib/explored'
import { ExplorerPageProps } from '../../../lib/pageProps'

export const revalidate = 0

export const alt = 'Output'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

const formatOGImage = (id: string) => {
  return getOGImage(
    {
      id,
      title: truncate(id, 30),
      subtitle: 'Output',
      initials: 'O',
    },
    size
  )
}

export default async function Image({ params }: ExplorerPageProps) {
  const id = params.id

  try {
    const { data: searchResultType } = await getExplored().searchResultType({
      params: { id },
    })

    if (!searchResultType) return formatOGImage(id)

    if (searchResultType === 'siacoinElement') {
      const [output] = await to(getExplored().outputSiacoin({ params: { id } }))

      if (!output) return formatOGImage(id)

      const values = [
        { label: 'address', value: truncate(output.siacoinOutput.address, 10) },
        {
          label: 'sc',
          value: humanSiacoin(output.siacoinOutput.value),
        },
      ]

      return getOGImage(
        {
          id,
          title: truncate(id, 30),
          subtitle: 'Output',
          initials: 'O',
          values,
        },
        size
      )
    } else if (searchResultType === 'siafundElement') {
      const [output] = await to(getExplored().outputSiafund({ params: { id } }))

      if (!output) return formatOGImage(id)

      const values = [
        { label: 'address', value: truncate(output.siafundOutput.address, 10) },
        {
          label: 'sf',
          value: String(output.siafundOutput.value),
        },
      ]

      return getOGImage(
        {
          id,
          title: truncate(id, 30),
          subtitle: 'Output',
          initials: 'O',
          values,
        },
        size
      )
    } else {
      return formatOGImage(id)
    }
  } catch (e) {
    return formatOGImage(id)
  }
}
