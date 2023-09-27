FROM node:18-alpine as runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=nextjs:nodejs ./dist/apps/walletd/.next/standalone ./
COPY --chown=nextjs:nodejs ./dist/apps/walletd/.next/static ./dist/apps/walletd/.next/static
COPY --chown=nextjs:nodejs ./dist/apps/walletd/public ./apps/walletd/public

USER nextjs
EXPOSE 3000

CMD node apps/walletd/server.js
