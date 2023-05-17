FROM node:17-alpine AS build
WORKDIR /frontend/managers
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx
COPY --from=build /frontend/managers/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
