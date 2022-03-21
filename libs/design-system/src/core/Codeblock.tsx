import React from 'react'
import { styled } from '../config/theme'

export const SCodeblock = styled('code', {
  fontFamily: '$mono',
  fontSize: '$12',
  lineHeight: '150%',
  display: 'block',
  padding: '$1-5',
  backgroundColor: '$brandGray3',
  color: '$hiContrast',
  textAlign: 'left',
  borderRadius: '$1',
})

type Props = React.ComponentProps<typeof SCodeblock>

export const Codeblock = React.forwardRef<
  React.ElementRef<typeof SCodeblock>,
  Props
>((props, forwardedRef) => {
  return (
    <pre>
      <SCodeblock {...props} ref={forwardedRef} />
    </pre>
  )
})
