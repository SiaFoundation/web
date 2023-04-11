import { CmdEmptyProps } from './CmdEmpty'

export type Page = {
  namespace: string
  label: string
  prompt?: string
  empty?: (props: CmdEmptyProps) => JSX.Element
}
