import { registerOTel } from '@vercel/otel'

export function register() {
  const serviceName = process.env.OTEL_SERVICE_NAME
  if (serviceName) {
    registerOTel(serviceName)
  }
}
