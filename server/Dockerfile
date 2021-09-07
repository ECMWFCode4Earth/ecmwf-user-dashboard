# Dockerfile - Server

# Base image
FROM node:14

# Create app directory
WORKDIR /usr/src/server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Set env variables
ENV NODE_ENV=production

# Build app
RUN npm run build

# Expose port
EXPOSE 8000

# Start command
CMD [ "npm", "run", "start" ]
