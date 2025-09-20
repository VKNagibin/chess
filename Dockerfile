FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build


FROM nginx:alpine AS production-stage

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]