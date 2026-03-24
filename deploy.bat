@echo off
echo ====================================
echo 🚀 Starting Deployment...
echo ====================================

cd /d C:\app\featuretail

echo 📥 Pulling latest code from GitHub...
git pull origin main

echo 📦 Installing dependencies...
call npm install

echo 🏗️ Building project...
call npm run build

echo 🔁 Restarting PM2 process...
pm2 restart all

echo ✅ Deployment completed successfully!
echo ====================================

pause