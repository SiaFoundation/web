import { StateError } from '../../../components/StateError'

export default function Page() {
  return (
    <StateError message="The contract is either not yet confirmed or may be invalid." />
  )
}
