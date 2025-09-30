#!/usr/bin/env node

// Railway-compatible n8n startup script
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Colors for output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStatus(message) {
  log(`✅ ${message}`, 'green');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

// Main startup function
async function startN8n() {
  try {
    log('🚀 Starting n8n on Railway...', 'cyan');
    
    // Create necessary directories
    const initialDirs = ['database', 'logs', 'generated-reports'];
    initialDirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        logInfo(`Created directory: ${dir}`);
      }
    });

    // Generate encryption key if not exists
    let encryptionKey = process.env.N8N_ENCRYPTION_KEY;
    if (!encryptionKey) {
      encryptionKey = crypto.randomBytes(32).toString('hex');
      logInfo('Generated new encryption key');
    }

    // Set environment variables
    const dataFolder = process.env.N8N_DATA_FOLDER || '/opt/render/project/src';
    const env = {
      ...process.env,
      N8N_USER_FOLDER: dataFolder,
      N8N_DATA_FOLDER: dataFolder,
      N8N_ENCRYPTION_KEY: encryptionKey,
      N8N_HOST: process.env.N8N_HOST || '0.0.0.0',
      N8N_PORT: process.env.PORT || '10000',
      WEBHOOK_URL: process.env.WEBHOOK_URL || `https://${process.env.RENDER_EXTERNAL_URL || 'localhost:10000'}`,
      N8N_DATABASE_TYPE: 'sqlite',
      N8N_DATABASE_SQLITE_DATABASE: `${dataFolder}/database/n8n.db`,
      DB_SQLITE_POOL_SIZE: '10',
      N8N_RUNNERS_ENABLED: 'true',
      N8N_BLOCK_ENV_ACCESS_IN_NODE: 'false',
      N8N_GIT_NODE_DISABLE_BARE_REPOS: 'true',
      N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS: 'true',
      N8N_LOG_LEVEL: 'info',
      N8N_LOG_OUTPUT: 'console,file',
      N8N_LOG_FILE_LOCATION: `${dataFolder}/logs/`,
      // Additional variables to prevent /app usage
      N8N_CUSTOM_EXTENSIONS: `${dataFolder}/custom`,
      N8N_TEMPLATES_ENABLED: 'true',
      N8N_TEMPLATES_HOST: 'https://api.n8n.io',
      N8N_VERSION_NOTIFICATIONS_ENABLED: 'true',
      N8N_VERSION_NOTIFICATIONS_ENDPOINT: 'https://api.n8n.io/versions/',
      N8N_PERSONALIZATION_ENABLED: 'true'
    };

    logStatus('Environment configured');
    logInfo(`Webhook URL: ${env.WEBHOOK_URL}`);
    logInfo(`Database: ${env.N8N_DATABASE_SQLITE_DATABASE}`);

    // Start n8n
    logInfo('Starting n8n process...');
    
    const n8nProcess = spawn('npx', ['n8n', 'start'], {
      env: env,
      stdio: 'inherit',
      shell: true,
      cwd: env.N8N_DATA_FOLDER
    });

    // Handle process events
    n8nProcess.on('error', (error) => {
      logError(`Failed to start n8n: ${error.message}`);
      process.exit(1);
    });

    n8nProcess.on('exit', (code) => {
      if (code !== 0) {
        logError(`n8n exited with code ${code}`);
        process.exit(code);
      }
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logInfo('Received SIGTERM, shutting down gracefully...');
      n8nProcess.kill('SIGTERM');
    });

    process.on('SIGINT', () => {
      logInfo('Received SIGINT, shutting down gracefully...');
      n8nProcess.kill('SIGINT');
    });

    // Keep the process running
    await new Promise((resolve, reject) => {
      n8nProcess.on('exit', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Process exited with code ${code}`));
        }
      });
    });

  } catch (error) {
    logError(`Startup failed: ${error.message}`);
    process.exit(1);
  }
}

// Start the application
if (require.main === module) {
  startN8n().catch(error => {
    logError(`Fatal error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { startN8n };
