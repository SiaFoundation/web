FROM node:20-alpine as runner

WORKDIR /app

ENV NODE_ENV production
# requires NOTION_TOKEN

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --chown=nodejs:nodejs ./dist/apps/crons ./

USER nodejs

CMD node main.js
