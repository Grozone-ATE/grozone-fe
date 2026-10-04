#!/bin/bash
set -e

echo "=== Deploying grozone-fe ==="

# 1. Pull latest code
echo "Pulling latest git changes..."
git pull origin main

# 2. Sync Caddy site config into central bookforge-proxy sites directory
if [ -f "deploy/grozone.caddy" ]; then
    echo "Updating Caddy site config..."
    cp deploy/grozone.caddy /opt/bookforge/infra/shared/configs/caddy/sites/grozone.caddy
    docker exec bookforge-proxy caddy validate --config /etc/caddy/Caddyfile
    docker exec bookforge-proxy caddy reload --config /etc/caddy/Caddyfile
fi

# 3. Build and restart container on bookforge-internal network
echo "Building and starting container..."
docker compose up -d --build

# 4. Clean up dangling images to save VPS disk space
echo "Pruning dangling docker images..."
docker image prune -f

echo "=== Deployment successful! ==="
