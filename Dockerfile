# VERSION 1.0
# Author: acdzh <acdzh@outlook.com>
FROM node:alpine

WORKDIR /data/app
VOLUME /cache
ENV CACHE_DIR /cache

COPY package.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD ["node", "app.js"]