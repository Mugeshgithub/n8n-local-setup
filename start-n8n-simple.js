#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting n8n on Render...');

// Create directories
const dataFolder = process.env.N8N_DATA_FOLDER || '/opt/render/project/src';
const dirs = ['database', 'logs'];

dirs.forEach(dir => {
  const fullPath = path.join(dataFolder, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created directory: ${fullPath}`);
  }
});

// Set environment variables
const env = {
  ...process.env,
  N8N_USER_FOLDER: dataFolder,
  N8N_DATA_FOLDER: dataFolder,
  N8N_ENCRYPTION_KEY: process.env.N8N_ENCRYPTION_KEY || 'your-encryption-key-here',
  N8N_HOST: '0.0.0.0',
  N8N_PORT: process.env.PORT || '10000',
  PORT: process.env.PORT || '10000',
  WEBHOOK_URL: process.env.WEBHOOK_URL || `https://${process.env.RENDER_EXTERNAL_URL || 'localhost:10000'}`,
  N8N_DATABASE_TYPE: 'sqlite',
  N8N_DATABASE_SQLITE_DATABASE: `${dataFolder}/database/n8n.db`,
  N8N_LOG_LEVEL: 'info',
  N8N_LOG_OUTPUT: 'console',
  N8N_DISABLE_UI: 'false',
  N8N_USER_MANAGEMENT_DISABLED: 'false'
};

console.log(`✅ Environment configured`);
console.log(`📁 Data folder: ${dataFolder}`);
console.log(`🗄️ Database: ${env.N8N_DATABASE_SQLITE_DATABASE}`);
console.log(`🌐 Webhook URL: ${env.WEBHOOK_URL}`);

// Start n8n
console.log('🔄 Starting n8n process...');

const n8nProcess = spawn('npx', ['n8n', 'start'], {
  env: env,
  stdio: 'inherit',
  shell: false,
  cwd: dataFolder
});

n8nProcess.on('error', (error) => {
  console.error(`❌ Failed to start n8n: ${error.message}`);
  process.exit(1);
});

n8nProcess.on('exit', (code) => {
  console.log(`🔄 n8n process exited with code ${code}`);
  if (code !== 0) {
    process.exit(code);
  }
});

// Keep process running
process.on('SIGTERM', () => {
  console.log('🔄 Received SIGTERM, shutting down...');
  n8nProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('🔄 Received SIGINT, shutting down...');
  n8nProcess.kill('SIGINT');
});
