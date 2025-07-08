import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { to } from '@siafoundation/request'

import { Output } from '../../../../components/Output'
import { routes } from '../../../../config/routes'
import { getExplored } from '../../../../lib/explored'
import { ExplorerPageProps } from '../../../../lib/pageProps'
import { buildMetadata } from '../../../../lib/utils'

export function generateMetadata({ params }: ExplorerPageProps): Metadata {
  const id = decodeURIComponent((params?.id as string) || '')
  const title = `Output ${id}`
  const description = 'View details for Sia output'
  const url = routes.output.view.replace(':id', id)
  return buildMetadata({
    title,
    description,
    url,
  })
}

export const revalidate = 0

export default async function Page({ params }: ExplorerPageProps) {
  const id = params?.id as string

  const explored = await getExplored()
  const { data: searchResultType } = await explored.searchResultType({
    params: { id },
  })

  if (searchResultType === 'siacoinElement') {
    const [output, outputError, outputResponse] = await to(
      explored.outputSiacoin({ params: { id } })
    )

    if (outputError) {
      if (outputResponse?.status === 404) return notFound()
      throw outputError
    }

    return <Output outputElement={output} />
  } else if (searchResultType === 'siafundElement') {
    const [output, outputError, outputResponse] = await to(
      explored.outputSiafund({ params: { id } })
    )

    if (outputError) {
      if (outputResponse?.status === 404) return notFound()
      throw outputError
    }

    return <Output outputElement={output} />
  } else {
    return notFound()
  }
}
