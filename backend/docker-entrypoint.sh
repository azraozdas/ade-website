#!/bin/sh
set -e

# Fix node_modules issue: volume mount from Windows overwrites Linux binaries
echo "🔧 Fixing node_modules for Linux..."
cd /app
# Remove Windows-compiled argon2 and reinstall for Linux
rm -rf node_modules/argon2
npm install argon2 --no-save --force || true

# Run migrations
echo "📊 Running database migrations..."
npx prisma migrate deploy

# Seed database
echo "🌱 Seeding database..."
npm run prisma:seed || true

# Start the server
echo "🚀 Starting server..."
exec npm run dev

