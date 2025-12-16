FROM oven/bun:latest

WORKDIR /app

# install curl (Debian based)
RUN apt-get update \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*

# copy package & lock
COPY package.json bun.lock tsconfig.json ./

# install deps
RUN bun install --production

# copy source
COPY src ./src

# build TypeScript
RUN bun build src/index.ts --outdir dist --target=bun

ENV NODE_ENV=production

EXPOSE 3000

# Healthcheck untuk Coolify
HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 \
    CMD curl -fs http://localhost:3000/health || exit 1

CMD ["bun", "run", "dist/index.js"]
