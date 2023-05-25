FROM node:18-slim

# production enviorment
ENV NODE_ENV=production

# workdirectory
WORKDIR /backend

# Caching the packages
COPY package.json .
COPY package-lock.json .
RUN npm ci --only=production
COPY . ./

# Create a folder for uploads if not created, and change the permissions for it to read and write
RUN mkdir -p ./uploads 
RUN chmod -R 0777 ./uploads

# open port
EXPOSE 4000

# Run the node app as node instead of root
USER node 
CMD [ "node", "server.js" ]