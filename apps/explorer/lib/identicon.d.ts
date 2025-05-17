declare module 'identicon.js' {
  export default class Identicon {
    constructor(hash: string, options?: IdenticonOptions)

    toString(): string
  }

  interface IdenticonOptions {
    foreground?: number[]
    background?: number[]
    margin?: number
    size?: number
    format?: string
  }
}
