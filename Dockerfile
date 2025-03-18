# Use Node.js base image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire frontend source code
COPY . .

# Build the React app
RUN npm run build

# Expose React port
EXPOSE 3000

# Serve the React app using serve
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
