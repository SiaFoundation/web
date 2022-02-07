import { Flex, RLink, Text } from '@siafoundation/design-system'
import { capitalize } from 'lodash'
import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom'

export function SwapNav() {
  const location = useLocation()
  return (
    <Flex gap="1">
      <RLink to="/" css={{ fontSize: '$6' }}>
        Swap
      </RLink>
      {location?.pathname.length > 1 && (
        <Fragment>
          <Text size="6">/</Text>
          <Text size="6">{capitalize(location.pathname.slice(1))}</Text>
        </Fragment>
      )}
    </Flex>
  )
}
