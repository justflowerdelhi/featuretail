const http = require("http");
const { exec } = require("child_process");

const PORT = 4000;

http.createServer((req, res) => {
  if (req.method === "POST") {
    console.log("📩 Webhook received. Deploying...");

    exec("node deploy.js", (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });

    res.end("✅ Deploy triggered");
  } else {
    res.end("Server running");
  }
}).listen(PORT, () => {
  console.log(`🚀 Webhook server running on port ${PORT}`);
});