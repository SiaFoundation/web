import { Container, Heading, Panel, Text } from '@siafoundation/design-system'
import { FaucetIcon } from '@siafoundation/react-icons'
import { networkName } from '../../config'

export function FaucetSkeleton() {
  return (
    <Container size="1">
      <div className="flex flex-col gap-12 min-h-[60vh]">
        <Panel className="p-4 md:p-4 !rounded-lg !border-3 !border-gray-1100 dark:!border-graydark-500 h-[510px]">
          <div className="flex flex-col gap-2 items-center w-full">
            <Text>
              <FaucetIcon size={100} />
            </Text>
            <Heading className="mb-2">{networkName} Faucet</Heading>
          </div>
        </Panel>
      </div>
    </Container>
  )
}
