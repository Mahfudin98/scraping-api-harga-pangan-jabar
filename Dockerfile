FROM oven/bun:latest

WORKDIR /app

# copy package & lock
COPY package.json bun.lock tsconfig.json ./

# copy source
COPY src ./src

# copy RSA keys
COPY private.pem public.pem ./

# install dependencies
RUN bun install --production

# build TypeScript
RUN bun build src/index.ts --outdir dist --target=bun

ENV NODE_ENV=production

EXPOSE 3000

# run hasil build (bukan .ts)
CMD ["bun", "run", "dist/index.js"]