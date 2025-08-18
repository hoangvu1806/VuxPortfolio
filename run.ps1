param(
    [string]$Branch = "main",
    [string]$ImageName = "portfolio",
    [string]$Tag = "latest",
    [string]$ContainerName = "portfolio-container",
    [int]$Port = 8888
)

$ErrorActionPreference = "Stop"

function Write-Section {
    param([string]$Message)
    Write-Host "=== $Message ===" -ForegroundColor Cyan
}

try {
    Write-Section "Checking Docker availability"
    docker version | Out-Null
} catch {
    Write-Error "Docker does not seem to be running or installed. Please start Docker Desktop and try again."
    exit 1
}

Write-Section "Pulling latest changes from GitHub"
git pull origin $Branch

Write-Host "`nBuilding and running Do Hoang Vu's Portfolio in Docker`n"

# Remove existing container if present
Write-Section "Cleaning up existing container if any"
$existing = docker ps -aq -f "name=$ContainerName"
if ($existing) {
    Write-Host "Removing existing container..."
    docker stop $ContainerName | Out-Null
    docker rm $ContainerName | Out-Null
}

# Build image
Write-Section "Building Docker image"
docker build -t "${ImageName}:${Tag}" .
if ($LASTEXITCODE -ne 0) { Write-Error "Docker build failed"; exit 1 }

# Prune old images
Write-Section "Pruning old images"
docker image prune -f | Out-Null

# Run container
Write-Section "Running Docker container"
docker run -p "${Port}:${Port}" -d --restart unless-stopped --name $ContainerName "${ImageName}:${Tag}" | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Error "Docker run failed"; exit 1 }

# Verify container is running
$running = docker ps -q -f "name=$ContainerName"
if ($running) {
    Write-Host "`nPortfolio is now running on http://localhost:$Port"
    Write-Host "Container logs: docker logs $ContainerName"
    Write-Host "To stop: docker stop $ContainerName"
    Write-Host "To restart: docker restart $ContainerName"
    Write-Host "To remove: docker rm -f $ContainerName"
} else {
    Write-Error "Failed to start the container. Check logs with: docker logs $ContainerName"
    exit 1
}


