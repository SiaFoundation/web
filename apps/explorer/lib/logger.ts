export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

type ReservedKeys = 'ts' | 'level' | 'scope' | 'msg'
export type LogData = { [K in ReservedKeys]?: never } & Record<string, unknown>

function serializeValue(value: unknown): unknown {
  if (value instanceof Error) {
    return { name: value.name, message: value.message }
  }
  return value
}

function serializeData(data: LogData | undefined): Record<string, unknown> {
  if (!data) return {}
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    result[key] = serializeValue(value)
  }
  return result
}

function log(level: LogLevel, scope: string, msg: string, data?: LogData) {
  const entry = {
    ts: new Date().toISOString(),
    level,
    scope,
    msg,
    ...serializeData(data),
  }
  console.log(JSON.stringify(entry))
}

// Wrapper to avoid tripping react-hooks/purity in server components.
export const getTime = () => Date.now()

export const logger = {
  debug: (scope: string, msg: string, data?: LogData) =>
    log('debug', scope, msg, data),
  info: (scope: string, msg: string, data?: LogData) =>
    log('info', scope, msg, data),
  warn: (scope: string, msg: string, data?: LogData) =>
    log('warn', scope, msg, data),
  error: (scope: string, msg: string, data?: LogData) =>
    log('error', scope, msg, data),
}
