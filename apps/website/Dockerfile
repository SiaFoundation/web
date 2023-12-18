FROM node:20-alpine as runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=nextjs:nodejs ./dist/apps/website/.next/standalone ./
COPY --chown=nextjs:nodejs ./dist/apps/website/.next/static ./dist/apps/website/.next/static
COPY --chown=nextjs:nodejs ./dist/apps/website/public ./apps/website/public

USER nextjs
EXPOSE 3000

CMD node apps/website/server.js
