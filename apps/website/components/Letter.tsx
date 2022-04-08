import { Box, Section } from '@siafoundation/design-system'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type Props = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  onDone: () => void
}

export default function Letter({ source, onDone }: Props) {
  const { ref, inView } = useInView({
    // delay: 1000,
  })

  useEffect(() => {
    if (inView) {
      onDone()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <Section size="3">
      <Box
        css={{
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <MDXRemote {...source} />
      </Box>
      <Box ref={ref} css={{ marginTop: '50vh' }} />
    </Section>
  )
}
