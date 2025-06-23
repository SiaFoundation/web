import { StateError } from '../../../../components/StateError'

export default function Page() {
  return (
    <StateError message="Not found, double check the host key or address and try again." />
  )
}
