#!/bin/bash

# Exit on error
set -e
echo "Pulling latest changes from GitHub..."
git pull origin main

echo "🚀 Building and running Do Hoang Vu's Portfolio in Docker"

# Check if the container already exists and remove it if it does
if [ "$(docker ps -aq -f name=portfolio-container)" ]; then
    echo "🧹 Removing existing container..."
    docker stop portfolio-container || true
    docker rm portfolio-container || true
fi

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t portfolio:latest .

# Check for existing images and prune old ones
echo "🧹 Pruning old images..."
docker image prune -f

# Run the container
echo "🔄 Running Docker container..."
docker run -p 8888:8888 -d --restart unless-stopped --name portfolio-container portfolio:latest

# Check if container is running
if [ "$(docker ps -q -f name=portfolio-container)" ]; then
    echo "✅ Portfolio is now running on http://localhost:8888"
    echo "📋 Container logs: docker logs portfolio-container"
    echo "🛑 To stop: docker stop portfolio-container"
    echo "🔁 To restart: docker restart portfolio-container"
    echo "🗑️ To remove: docker rm -f portfolio-container"
else
    echo "❌ Failed to start the container. Check the logs with: docker logs portfolio-container"
    exit 1
fi 