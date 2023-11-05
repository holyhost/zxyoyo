# 查看所有images:docker images 
# 查看磁盘情况: df -hl
# 构建一个名叫mynode的docker image: docker build -t mynode .
# 从mynode 镜像创建一个名叫zxyoyo的容器：docker run --name zxyoyo -d -p 3000:3000 mynode
# /usr/src/nodejs/hello-docker/Dockerfile
FROM node:20-alpine3.16

# 在容器中创建一个目录
RUN mkdir -p /app/

# 定位到容器的工作目录
WORKDIR /app/

ARG registry=https://registry.npmmirror.com/
RUN npm config set registry $registry

# RUN/COPY 是分层的，package.json 提前，只要没修改，就不会重新安装包
COPY package.json /app/package.json
RUN cd /app/
# RUN npm i

# 把当前目录下的所有文件拷贝到 Image 的 /usr/src/nodejs/ 目录下
COPY . /app/
RUN chmod 777 /app
RUN chmod 777 /app/.next/standalone
RUN chmod 777 /app/.next/static
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE 3000
CMD npm start
