# Use official Node.js image as the base
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port the app runs on (replace with your port if different)
EXPOSE 3000

# Run the app
CMD ["npx", "tsx", "src/server.ts"]

