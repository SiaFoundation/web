FROM node:20-alpine as runner

WORKDIR /app

ENV PORT 3000
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --chown=nodejs:nodejs ./dist/apps/assets ./

USER nodejs
EXPOSE 3000

CMD node main.js
