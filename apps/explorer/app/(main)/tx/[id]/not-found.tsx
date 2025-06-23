import { StateError } from '../../../../components/StateError'

export default function Page() {
  return (
    <StateError message="The transaction is either not yet confirmed or may be invalid." />
  )
}
