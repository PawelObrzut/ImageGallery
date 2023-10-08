FROM node:14-slim as build

ARG RAILWAY_ENVIRONMENT

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]