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

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 8080

# Start command (overridden in docker-compose)
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["npm", "start"]

