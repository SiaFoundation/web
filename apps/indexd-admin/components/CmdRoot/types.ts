import { CmdEmptyProps } from './CmdEmpty'

export type Page = {
  namespace: string
  label: string
  prompt?: string
  tag?: string
  empty?: (props: CmdEmptyProps) => React.JSX.Element
}
