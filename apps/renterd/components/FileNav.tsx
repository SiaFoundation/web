import { Fragment } from 'react'
import {
  Flex,
  Text,
  NextLink,
  ChevronRight16,
} from '@siafoundation/design-system'

export function FileNav() {
  const parts = ['files', 'backups', 'random']

  return (
    <Flex gap="0-5" align="center">
      {parts.map((part, i) => {
        return (
          <Fragment key={part + i}>
            {i > 0 && (
              <Text
                size="16"
                color="verySubtle"
                css={{ display: 'flex', alignItems: 'center' }}
              >
                <ChevronRight16 />
              </Text>
            )}
            <Text
              size="16"
              color="subtle"
              css={{ display: 'flex', alignItems: 'center' }}
            >
              <NextLink href="/" underline="none">
                {part}
              </NextLink>
            </Text>
          </Fragment>
        )
      })}
    </Flex>
  )
}
