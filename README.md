# 🚀 n8n Free Cloud Deployment

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Mugeshgithub/n8n-local-setup)
[![GitHub stars](https://img.shields.io/github/stars/Mugeshgithub/n8n-local-setup?style=social)](https://github.com/Mugeshgithub/n8n-local-setup)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Deploy n8n to the cloud for FREE with one click!** No credit card required, no complex setup, just pure automation power in the cloud.

## ✨ Why This Repository?

- 🆓 **100% FREE** - Deploy n8n to Render's free tier
- ⚡ **One-Click Deploy** - No technical knowledge required  
- 🔒 **Secure** - HTTPS enabled by default
- 📱 **Mobile Ready** - Access from anywhere
- 🔄 **Auto-Updates** - Deploy from GitHub automatically
- 🛠️ **Production Ready** - Used by 14+ developers already

## 🎯 What You Get

- **Complete n8n setup** with persistent database
- **Pre-configured environment** for immediate use
- **Webhook support** for external integrations
- **SQLite database** for data persistence
- **Comprehensive documentation** and troubleshooting
- **Local development** scripts included

## 📊 Repository Stats

![GitHub stars](https://img.shields.io/github/stars/Mugeshgithub/n8n-local-setup)
![GitHub forks](https://img.shields.io/github/forks/Mugeshgithub/n8n-local-setup)
![GitHub issues](https://img.shields.io/github/issues/Mugeshgithub/n8n-local-setup)
![GitHub last commit](https://img.shields.io/github/last-commit/Mugeshgithub/n8n-local-setup)

## 🚀 Quick Start

### Option 1: Deploy to Render (Recommended - 100% Free)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Mugeshgithub/n8n-local-setup)

**One-click deployment to Render:**
- ✅ **FREE**: 750 hours/month
- ✅ **24/7**: Always running
- ✅ **HTTPS**: Secure by default
- ✅ **Auto-deploy**: Updates from GitHub
- ✅ **No credit card** required

[📖 Render Deployment Guide](RENDER_DEPLOYMENT.md)

### Option 2: Deploy to Railway (Paid - $5/month)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/Mugeshgithub/n8n-local-setup)

**One-click deployment to Railway:**
- ✅ **FREE**: 500 hours/month
- ✅ **24/7**: Always running
- ✅ **HTTPS**: Secure by default
- ✅ **Auto-deploy**: Updates from GitHub

[📖 Railway Deployment Guide](RAILWAY_DEPLOYMENT.md)

### Option 3: Local Installation

**Prerequisites:**
- Node.js (v18 or higher)
- npm or yarn
- Git

**Installation:**

1. **Clone this repository**
   ```bash
   git clone https://github.com/Mugeshgithub/n8n-local-setup.git
   cd n8n-local-setup
   ```

2. **Make the startup script executable**
   ```bash
   chmod +x start-n8n.sh
   ```

3. **Start n8n**
   ```bash
   ./start-n8n.sh
   ```

4. **Access n8n**
   - Open your browser
   - Go to: http://localhost:5678
   - Complete the one-time setup
   - **Important**: Check your email for the activation key
   - Enter the activation key when prompted to activate your n8n instance

## 📁 Project Structure

```
n8n-local-setup/
├── README.md                 # This guide
├── start-n8n.sh             # Startup script
├── .env.example             # Environment variables template
├── database/                # SQLite database (created automatically)
└── workflows/               # Your workflow files (optional)
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# n8n Configuration
N8N_USER_FOLDER=/path/to/your/n8n/local
N8N_ENCRYPTION_KEY=your-encryption-key-here
N8N_HOST=localhost
WEBHOOK_URL=http://localhost:5678/

# Database Configuration
N8N_DATABASE_TYPE=sqlite
N8N_DATABASE_SQLITE_DATABASE=/path/to/your/n8n/local/database/n8n.db

# Optional: Performance Settings
DB_SQLITE_POOL_SIZE=10
N8N_RUNNERS_ENABLED=true
N8N_BLOCK_ENV_ACCESS_IN_NODE=false
N8N_GIT_NODE_DISABLE_BARE_REPOS=true
```

### Generate Encryption Key

Generate a secure encryption key:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or using OpenSSL
openssl rand -hex 32
```

## 🚀 Usage

### Start n8n
```bash
./start-n8n.sh
```

### Stop n8n
```bash
# Press Ctrl+C in the terminal where n8n is running
# Or find the process and kill it
pkill -f n8n
```

### Restart n8n
```bash
pkill -f n8n
./start-n8n.sh
```

## 📊 Features

- ✅ **Persistent Database**: SQLite database for data persistence
- ✅ **Easy Startup**: One-command startup script
- ✅ **Clean Configuration**: Environment-based configuration
- ✅ **Cross-Platform**: Works on macOS, Linux, and Windows
- ✅ **No Docker Required**: Direct Node.js installation

## 🔍 Troubleshooting

### Common Issues

1. **Port 5678 already in use**
   ```bash
   # Find and kill the process using port 5678
   lsof -ti:5678 | xargs kill -9
   ```

2. **Permission denied on startup script**
   ```bash
   chmod +x start-n8n.sh
   ```

3. **Database permission issues**
   ```bash
   # Make sure the database directory is writable
   chmod 755 database/
   ```

4. **n8n asks for setup every time**
   - Make sure you're using the startup script
   - Check that the database path is correct
   - Verify the N8N_USER_FOLDER is set properly

5. **Activation key issues**
   - Check your email (including spam folder) for the activation key
   - The activation key is sent to the email you used during setup
   - If you don't receive it, check your email settings or try a different email
   - You can also try restarting n8n and going through setup again

### Reset Everything

If you want to start fresh:

```bash
# Stop n8n
pkill -f n8n

# Remove database and config
rm -rf database/ .n8n/

# Start fresh
./start-n8n.sh
```

## 📚 Next Steps

After setting up n8n locally:

1. **Complete the initial setup** in the web interface
2. **Check your email** for the activation key and enter it when prompted
3. **Create your first workflow** or import existing ones
4. **Set up API credentials** for external services
5. **Configure webhooks** for external triggers
6. **Schedule workflows** for automation

## 🛠️ Advanced Configuration

### Custom Port
To use a different port, modify the startup script:

```bash
# Change N8N_HOST and WEBHOOK_URL in start-n8n.sh
N8N_HOST=localhost
WEBHOOK_URL=http://localhost:8080/
```

### Custom Database Location
To use a different database location:

```bash
# Modify N8N_DATABASE_SQLITE_DATABASE in start-n8n.sh
N8N_DATABASE_SQLITE_DATABASE=/custom/path/to/database/n8n.db
```

### Production Settings
For production use, consider:

- Using PostgreSQL instead of SQLite
- Setting up proper SSL certificates
- Configuring reverse proxy (nginx/Apache)
- Setting up monitoring and logging
- Using environment-specific configurations

## 📖 Resources

- [n8n Documentation](https://docs.n8n.io/)
- [n8n Community](https://community.n8n.io/)
- [n8n GitHub](https://github.com/n8n-io/n8n)
- [n8n Workflow Examples](https://n8n.io/workflows/)

## 👨‍💻 Created By

**Mugesh M**
- 🔗 **GitHub:** [@Mugeshgithub](https://github.com/Mugeshgithub)
- 💼 **LinkedIn:** [Connect with me](https://linkedin.com/in/your-profile)
- 📧 **Email:** your.email@domain.com

## ⭐ How to Support This Project

**If this helped you, please:**
- ⭐ **Star this repository** - it really helps!
- 🍴 **Fork it** - create your own version
- 🐛 **Report issues** - help improve it
- 💬 **Share it** - tell others about it
- 💡 **Suggest features** - what would you add?

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

**Ways to contribute:**
- 🐛 Fix bugs and issues
- ✨ Add new features
- 📝 Improve documentation
- 🧪 Add tests
- 💡 Suggest improvements

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This is a local development setup. For production use, please refer to the official n8n documentation for proper deployment and security considerations.

---

**Happy automating with n8n! 🚀**
