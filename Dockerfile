FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./
# RUN npm ci --omit=dev
RUN npm ci

COPY --from=base /app/dist ./dist

CMD ["node", "dist/server.js"]