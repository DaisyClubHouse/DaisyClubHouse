FROM node:16 as builder
ENV NODE_ENV=producation
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
COPY ./ ./
RUN npm build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
