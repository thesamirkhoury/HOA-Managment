# Build stage
FROM node:17-alpine AS build
WORKDIR /managers
COPY package*.json .
RUN npm ci --only=production
COPY . .
RUN npm run build

# Run Stage
FROM nginx
COPY --from=build /managers/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
