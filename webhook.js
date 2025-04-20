// webhook.js
const http = require("http");
const { exec } = require("child_process");
const fs = require("fs");

const PORT = 3000; // Port untuk menerima webhook
const LOG_FILE = "deploy.log"; // File log untuk deploy
const REPO_DIR = "C:\\apps\\auto-deploy-server"; // Lokasi folder project kamu

// Membuat server untuk mendengarkan webhook
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/webhook") {
    exec(`cd ${REPO_DIR} && git pull`, (err, stdout, stderr) => {
      const log = `[${new Date().toISOString()}] Pull triggered\n${
        stdout || ""
      }${stderr || ""}\n`;
      fs.appendFileSync(LOG_FILE, log); // Simpan log ke deploy.log
      console.log(log);

      // Jika ada perintah restart, bisa ditambahkan di sini
      // exec(`npm run restart`);

      res.writeHead(200);
      res.end("Pulled!");
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Webhook server running on port ${PORT}`);
});
