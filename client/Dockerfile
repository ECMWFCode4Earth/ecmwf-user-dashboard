# Dockerfile - Client

# Base image
FROM node:14

# Create app directory
WORKDIR /usr/src/client

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Set env variables
ENV NODE_ENV=production
# Server URL below
ENV NEXT_PUBLIC_SERVER_URL=http://127.0.0.1:8000

# Build app
RUN npm run build

# Expose port
EXPOSE 3000

# Start command
CMD [ "npm", "run", "start" ]
