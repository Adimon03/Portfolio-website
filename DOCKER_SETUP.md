# 🐳 Docker Setup Guide

## Prerequisites

1. **Install Docker Desktop**:
   - Windows: https://docs.docker.com/desktop/install/windows-install/
   - Mac: https://docs.docker.com/desktop/install/mac-install/
   - Linux: https://docs.docker.com/desktop/install/linux-install/

2. **Verify Docker Installation**:
   ```powershell
   docker --version
   docker-compose --version
   ```

## 🚀 Quick Start (3 Commands)

### Option 1: Development Mode (Recommended for Development)

```powershell
# Start development server with hot reload
docker-compose up dev
```

Then open: http://localhost:5173

**Features**:
- ✅ Hot module replacement
- ✅ Instant updates on file changes
- ✅ Full development experience
- ✅ Source maps for debugging

### Option 2: Production Mode (Test Production Build)

```powershell
# Build and run production version
docker-compose up prod
```

Then open: http://localhost:3000

**Features**:
- ✅ Optimized production build
- ✅ Minified assets
- ✅ Fast loading
- ✅ Production-ready

## 📋 Detailed Commands

### Development

```powershell
# Start in foreground (see logs)
docker-compose up dev

# Start in background (detached)
docker-compose up -d dev

# Stop the container
docker-compose down

# View logs
docker-compose logs -f dev

# Rebuild after dependency changes
docker-compose up --build dev
```

### Production

```powershell
# Build production image
docker-compose build prod

# Run production container
docker-compose up prod

# Run in background
docker-compose up -d prod

# Stop production container
docker-compose down
```

### Using Dockerfile Directly

#### Development:
```powershell
# Build development image
docker build -f Dockerfile.dev -t portfolio-dev .

# Run development container
docker run -it --rm -p 5173:5173 -v ${PWD}:/app -v /app/node_modules portfolio-dev
```

#### Production:
```powershell
# Build production image
docker build -t portfolio-prod .

# Run production container
docker run -d -p 3000:3000 portfolio-prod
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```env
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_SITE_URL=https://yourdomain.com
```

Docker Compose will automatically load these.

### Port Configuration

**Development**: Port 5173 (Vite default)
**Production**: Port 3000 (serve default)

To change ports, edit `docker-compose.yml`:
```yaml
ports:
  - "YOUR_PORT:5173"  # Development
  - "YOUR_PORT:3000"  # Production
```

## 🛠️ Common Tasks

### Install New Dependencies

```powershell
# Stop containers
docker-compose down

# Rebuild with new dependencies
docker-compose up --build dev
```

### Clear Everything and Start Fresh

```powershell
# Stop and remove containers
docker-compose down

# Remove volumes
docker-compose down -v

# Remove images
docker rmi portfolio-dev portfolio-prod

# Rebuild from scratch
docker-compose up --build dev
```

### Access Container Shell

```powershell
# Development container
docker-compose exec dev sh

# Production container
docker-compose exec prod sh
```

### View Container Logs

```powershell
# All logs
docker-compose logs

# Follow logs (live)
docker-compose logs -f

# Specific service
docker-compose logs -f dev
```

## 📊 Performance

### Image Sizes
- **Development**: ~500MB (includes all dev dependencies)
- **Production**: ~150MB (optimized, multi-stage build)

### Build Times
- **First build**: 2-5 minutes (downloads dependencies)
- **Subsequent builds**: 30-60 seconds (uses cache)
- **With changes**: 10-30 seconds (rebuilds only changed layers)

## 🐛 Troubleshooting

### Port Already in Use

**Error**: `Bind for 0.0.0.0:5173 failed: port is already allocated`

**Solution**:
```powershell
# Find process using the port
netstat -ano | findstr :5173

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
```

### Permission Denied

**Error**: `permission denied while trying to connect to the Docker daemon`

**Solution**:
- Ensure Docker Desktop is running
- Run PowerShell as Administrator
- Restart Docker Desktop

### Module Not Found

**Error**: `Cannot find module 'xyz'`

**Solution**:
```powershell
# Rebuild with no cache
docker-compose build --no-cache dev
docker-compose up dev
```

### Changes Not Reflecting

**Solution**:
```powershell
# Ensure volume mounting is working
docker-compose down
docker-compose up dev

# Check if files are mounted
docker-compose exec dev ls -la /app
```

### Build Fails

**Solution**:
```powershell
# Clean Docker cache
docker system prune -a

# Rebuild
docker-compose build --no-cache dev
```

## 🚀 Deployment with Docker

### Deploy to Cloud

#### 1. Build Production Image
```powershell
docker build -t your-registry/portfolio:latest .
```

#### 2. Push to Registry
```powershell
# Docker Hub
docker push your-registry/portfolio:latest

# AWS ECR
aws ecr get-login-password | docker login --username AWS --password-stdin your-registry
docker push your-registry/portfolio:latest

# Google Container Registry
docker tag portfolio gcr.io/your-project/portfolio
docker push gcr.io/your-project/portfolio
```

#### 3. Deploy
- **AWS ECS**: Use the pushed image
- **Google Cloud Run**: Deploy from GCR
- **Azure Container Instances**: Deploy from ACR
- **DigitalOcean App Platform**: Connect to registry

### Docker Compose on Server

```bash
# On your server
git clone your-repo
cd your-repo

# Create .env file
nano .env

# Start production
docker-compose up -d prod

# Check logs
docker-compose logs -f prod
```

## 📝 Best Practices

### Development
- ✅ Use `docker-compose up dev` for development
- ✅ Keep containers running for hot reload
- ✅ Use volume mounts for instant updates
- ✅ Check logs regularly

### Production
- ✅ Use multi-stage builds (already configured)
- ✅ Minimize image size
- ✅ Use specific Node.js versions
- ✅ Don't include dev dependencies
- ✅ Use `.dockerignore`

### Security
- ✅ Don't commit `.env` files
- ✅ Use secrets management in production
- ✅ Keep base images updated
- ✅ Scan images for vulnerabilities

## 🎯 Quick Reference

```powershell
# Start development
docker-compose up dev

# Start production
docker-compose up prod

# Stop all
docker-compose down

# Rebuild
docker-compose up --build

# View logs
docker-compose logs -f

# Clean up
docker-compose down -v
docker system prune -a
```

## ✅ Verification

After starting the container, verify:

1. **Container is running**:
   ```powershell
   docker-compose ps
   ```

2. **Logs show no errors**:
   ```powershell
   docker-compose logs dev
   ```

3. **Port is accessible**:
   - Development: http://localhost:5173
   - Production: http://localhost:3000

4. **Hot reload works** (dev mode):
   - Edit a file
   - See changes instantly in browser

## 🎉 You're Ready!

Your portfolio is now running in Docker with:
- ✅ Isolated environment
- ✅ Consistent across machines
- ✅ Easy to deploy
- ✅ Production-ready

---

**Need help?** Check the main README.md or DEPLOYMENT.md
