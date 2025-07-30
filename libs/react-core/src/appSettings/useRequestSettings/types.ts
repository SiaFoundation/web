'use client'

export type RequestSettings = {
  api: string
  loginWithCustomApi: boolean
  password?: string
  recentApis: {
    [api: string]: {
      lastUsed: number
    }
  }
  autoLock?: boolean
  autoLockTimeout?: number
}

const defaultRequestSettings: RequestSettings = {
  api: '',
  loginWithCustomApi: false,
  password: undefined,
  recentApis: {},
  autoLock: false,
  autoLockTimeout: 1000 * 60 * 10, // 10 minutes
}

export function getDefaultRequestSettings(
  customDefaults?: Partial<RequestSettings>,
) {
  return {
    ...defaultRequestSettings,
    ...customDefaults,
  }
}
