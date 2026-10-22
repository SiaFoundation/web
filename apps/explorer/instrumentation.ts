export async function register() {
  const serviceName = process.env.OTEL_SERVICE_NAME
  if (serviceName) {
    // Imported only when tracing is on, because @vercel/otel fails to load on
    // Cloudflare Workers, which do not set OTEL_SERVICE_NAME.
    const { registerOTel } = await import('@vercel/otel')
    registerOTel(serviceName)
  }
}
