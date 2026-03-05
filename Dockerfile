FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the Vite application
RUN npm run build

# Use Nginx to serve the built static files
FROM nginx:alpine

# Copy the built files from the builder stage to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration if needed (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
