# Use an official node runtime as a parent image
FROM node:20-alpine3.19

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 6006

# Run the app
CMD ["npm", "run", "dev:sb"]
