FROM node:18-alpine as runner

RUN npm i -g sharp

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --chown=nextjs:nodejs ./dist/apps/renterd/.next ./

USER nextjs
EXPOSE 3000

CMD node apps/renterd/server.js
