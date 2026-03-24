const { exec } = require("child_process");

console.log("🚀 Starting deployment...");

exec("cd C:\\app\\featuretail && git pull origin main", (err, stdout, stderr) => {
  if (err) {
    console.error(`❌ Git Pull Error: ${err.message}`);
    return;
  }

  console.log(`✅ Git Pull Output:\n${stdout}`);

  exec("cd C:\\app\\featuretail && npm install", (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ NPM Install Error: ${err.message}`);
      return;
    }

    console.log("📦 Dependencies installed");

    exec("cd C:\\app\\featuretail && npm run build", (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ Build Error: ${err.message}`);
        return;
      }

      console.log("🏗️ Build completed");

      exec("pm2 restart all", (err, stdout, stderr) => {
        if (err) {
          console.error(`❌ PM2 Restart Error: ${err.message}`);
          return;
        }

        console.log("✅ PM2 Restarted Successfully");
      });
    });
  });
});