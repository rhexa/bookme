# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# API URL
ENV VITE_API_URL=https://bookme-app-1331.fly.dev

# Install packages needed to build node modules
FROM base as build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Throw-away build stage to reduce size of final image
FROM build as build-fe

# Install node modules
COPY frontend/ .
RUN npm ci --include=dev

# Build application
RUN npm run build

# Throw-away build stage to reduce size of final image
FROM build as build-be

# Install node modules
COPY backend/ .

RUN npm ci --include=dev

# Build application
RUN npm run build

RUN npm prune --production

# Final stage for app image
FROM base

# Copy built application
COPY --from=build-be /app/package*.json /app/
COPY --from=build-be /app/build /app/
COPY --from=build-be /app/node_modules/ /app/node_modules/

COPY --from=build-fe /app/dist/ /app/dist/

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]