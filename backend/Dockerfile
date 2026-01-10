FROM node:20-alpine AS base

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy prisma schema
COPY prisma ./prisma

# Generate Prisma Client
RUN npm run prisma:generate

# Copy source code
COPY . .

# Copy entrypoint script to a location outside /app to avoid volume mount issues
# Fix line endings (Windows CRLF -> Linux LF) and make it executable
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/docker-entrypoint.sh && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 8080

# Start command (overridden in docker-compose)
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["npm", "start"]

