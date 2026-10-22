---
'explorer': patch
---

The explorer can now run on Cloudflare Workers. Link preview images read their fonts and pictures from the Worker's static files there, and tracing loads only when OTEL_SERVICE_NAME is set.
