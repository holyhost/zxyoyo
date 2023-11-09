# 查看所有images:docker images 
# 查看磁盘情况: df -hl
# 构建一个名叫mynode的docker image: docker build -t mynode .
# 从mynode 镜像创建一个名叫zxyoyo的容器：docker run --name zxyoyo -d -p 3000:3000 -v /home/soft/zxyoyo/next-mantine/.next:/app/.next mynode
# /usr/src/nodejs/hello-docker/Dockerfile
FROM node:20-alpine3.16

# 在容器中创建一个目录
RUN mkdir -p /app/
# Install dependencies only when needed
# FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
ARG registry=https://registry.npmmirror.com/
RUN npm config set registry $registry

# 定位到容器的工作目录
WORKDIR /app
# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
#   else echo "Lockfile not found." && exit 1; \
#   fi

# Rebuild the source code only when needed
# FROM base AS builder
WORKDIR /app
# COPY /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
# FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
# RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD npm start
