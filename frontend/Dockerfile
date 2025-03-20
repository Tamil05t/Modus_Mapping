# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# ✅ Install tailwindcss-animate and tailwind-merge inside Docker
RUN npm install tailwindcss-animate tailwind-merge

# Copy the application files
COPY . .

# Build the application
RUN npm run build

# Serve the app
EXPOSE 5173
CMD ["npm", "run", "preview"]
