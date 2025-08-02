# Use Node.js LTS version as base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install express mongoose dotenv nodemon

# Bundle app source
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "run","start"]