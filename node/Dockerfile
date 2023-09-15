# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install any necessary dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .

# Expose port 3000 (or whichever port your app listens on)
EXPOSE 4000

# Start the Node.js application
CMD ["npm", "start"]
