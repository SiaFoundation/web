import { FileContractIcon, Text } from '@siafoundation/design-system'

export function StateNoneYet() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <FileContractIcon className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        There are currently no active contracts. Configure and announce host to
        start forming contracts.
      </Text>
    </div>
  )
}
