#!/bin/bash

# n8n Local Setup Script
# This script sets up n8n locally with persistent database

echo "🚀 Setting up n8n locally..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js v18 or higher."
    print_info "Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version $NODE_VERSION is too old. Please install Node.js v18 or higher."
    exit 1
fi

print_status "Node.js $(node -v) is installed"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

print_status "npm $(npm -v) is installed"

# Get current directory
CURRENT_DIR=$(pwd)
print_info "Setting up n8n in: $CURRENT_DIR"

# Create necessary directories
print_info "Creating directories..."
mkdir -p database
mkdir -p workflows
mkdir -p logs

print_status "Directories created"

# Generate encryption key if not exists
if [ ! -f ".env" ]; then
    print_info "Generating encryption key..."
    ENCRYPTION_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
    
    # Create .env file
    cat > .env << EOF
# n8n Configuration
N8N_USER_FOLDER=$CURRENT_DIR
N8N_ENCRYPTION_KEY=$ENCRYPTION_KEY
N8N_HOST=localhost
WEBHOOK_URL=http://localhost:5678/

# Database Configuration
N8N_DATABASE_TYPE=sqlite
N8N_DATABASE_SQLITE_DATABASE=$CURRENT_DIR/database/n8n.db

# Performance Settings
DB_SQLITE_POOL_SIZE=10
N8N_RUNNERS_ENABLED=true
N8N_BLOCK_ENV_ACCESS_IN_NODE=false
N8N_GIT_NODE_DISABLE_BARE_REPOS=true

# Security Settings
N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true

# Logging
N8N_LOG_LEVEL=info
N8N_LOG_OUTPUT=console,file
N8N_LOG_FILE_LOCATION=$CURRENT_DIR/logs/
EOF
    
    print_status "Environment file created with generated encryption key"
else
    print_info "Environment file already exists, skipping key generation"
fi

# Make startup script executable
chmod +x start-n8n.sh

print_status "Startup script made executable"

# Install n8n if not already installed
if ! command -v n8n &> /dev/null; then
    print_info "Installing n8n globally..."
    npm install -g n8n
    if [ $? -eq 0 ]; then
        print_status "n8n installed successfully"
    else
        print_error "Failed to install n8n globally. Trying local installation..."
        npm install n8n
        if [ $? -eq 0 ]; then
            print_status "n8n installed locally"
        else
            print_error "Failed to install n8n. Please install manually: npm install -g n8n"
            exit 1
        fi
    fi
else
    print_status "n8n is already installed"
fi

# Create a simple test workflow
print_info "Creating sample workflow..."
cat > workflows/sample-workflow.json << 'EOF'
{
  "name": "Sample Workflow",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "minute",
              "value": 1
            }
          ]
        }
      },
      "id": "schedule-trigger",
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [240, 200]
    },
    {
      "parameters": {
        "jsCode": "return {\n  message: 'Hello from n8n!',\n  timestamp: new Date().toISOString()\n};"
      },
      "id": "code-node",
      "name": "Code Node",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [460, 200]
    }
  ],
  "connections": {
    "Schedule Trigger": {
      "main": [
        [
          {
            "node": "Code Node",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "settings": {
    "executionOrder": "v1"
  },
  "staticData": null,
  "tags": [],
  "triggerCount": 1,
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "versionId": "1"
}
EOF

print_status "Sample workflow created"

# Final instructions
echo ""
print_status "Setup completed successfully! 🎉"
echo ""
print_info "Next steps:"
echo "1. Start n8n: ./start-n8n.sh"
echo "2. Open browser: http://localhost:5678"
echo "3. Complete the one-time setup"
echo "4. Import workflows from the workflows/ folder"
echo ""
print_info "Your n8n data will be saved in:"
echo "  - Database: $CURRENT_DIR/database/"
echo "  - Config: $CURRENT_DIR/.n8n/"
echo "  - Logs: $CURRENT_DIR/logs/"
echo ""
print_warning "Keep your encryption key safe:"
echo "  - File: $CURRENT_DIR/.env"
echo "  - Key: N8N_ENCRYPTION_KEY"
echo ""
print_info "To stop n8n: Press Ctrl+C in the terminal"
print_info "To restart n8n: ./start-n8n.sh"
echo ""
print_status "Happy automating! 🚀"
