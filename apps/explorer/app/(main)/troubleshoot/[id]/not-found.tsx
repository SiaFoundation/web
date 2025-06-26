import { StateError } from '../../../../components/StateError'

export default function Page() {
  return (
    <StateError message="Host not found. Check your public key and network." />
  )
}
