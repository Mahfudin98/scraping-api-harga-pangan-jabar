FROM oven/bun:latest

WORKDIR /app

# install curl (buat healthcheck)
RUN apk add --no-cache curl

# copy package & lock
COPY package.json bun.lock tsconfig.json ./

# copy source
COPY src ./src

# install dependencies
RUN bun install --production

# build TypeScript
RUN bun build src/index.ts --outdir dist --target=bun

ENV NODE_ENV=production

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# run hasil build
CMD ["bun", "run", "dist/index.js"]
