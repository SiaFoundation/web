import { Flex, Skeleton } from '@siafoundation/design-system'
import { times } from 'lodash'

export function EntityListSkeleton() {
  return (
    <>
      {times(10, (i) => (
        <Flex
          key={i}
          css={{ padding: '$2 $2', borderTop: '1px solid $gray3' }}
          gap="2"
        >
          <Skeleton css={{ width: '60px', height: '50px' }} />
          <Flex direction="column" gap="1" css={{ width: '100%' }}>
            <Skeleton css={{ width: '90%', height: '20px' }} />
            <Skeleton css={{ width: '140px', height: '14px' }} />
          </Flex>
        </Flex>
      ))}
    </>
  )
}
