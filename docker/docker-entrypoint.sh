#!/bin/sh
set -eu

echo "Initializing database..."

node scripts/init-db.mjs

echo "Starting application..."
exec node build
