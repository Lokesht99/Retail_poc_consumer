# Use an official Node.js runtime as a parent image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Stage 2: Use a minimal server for the final image
FROM nginx:alpine

# Copy the build output to replace the default Nginx contents
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the server
CMD ["nginx", "-g", "daemon off;"]