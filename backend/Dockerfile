# Use the official Ubuntu base image
FROM ubuntu:latest

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y nodejs npm && \
    apt-get clean

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json to the app directory
COPY package.json package-lock.json /app/

# Install app dependencies
RUN npm install

# Copy the rest of the backend files into the container
COPY . /app

# Expose the port your app runs on
EXPOSE 5001

# Command to start the server
CMD ["node", "server.js"]
