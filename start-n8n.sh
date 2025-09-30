#!/bin/bash

# n8n Startup Script with Persistent Database
cd "/Users/mugesh/n8n local"

# Create database directory if it doesn't exist
mkdir -p database

# Start n8n with persistent database
N8N_USER_FOLDER="/Users/mugesh/n8n local" \
N8N_ENCRYPTION_KEY="0f5de54f82541d5970f922290cd0fe0e4d7c7c70471d0170" \
N8N_HOST="localhost" \
WEBHOOK_URL="http://localhost:5678/" \
N8N_DATABASE_TYPE="sqlite" \
N8N_DATABASE_SQLITE_DATABASE="/Users/mugesh/n8n local/database/n8n.db" \
npx -y n8n start

echo "n8n started with persistent database!"
echo "Access at: http://localhost:5678"
