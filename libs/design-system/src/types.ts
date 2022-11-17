/* eslint-disable @typescript-eslint/no-explicit-any */
type OmitUndefined<T> = T extends undefined ? never : T
export type VariantProps<Component extends (...args: any) => any> = Omit<
  OmitUndefined<Parameters<Component>[0]>,
  'class'
>
