// webhook.js
const http = require("http");
const { exec } = require("child_process");
const fs = require("fs");

const PORT = 3000;
const LOG_FILE = "deploy.log"; 
const REPO_DIR = "C:\\apps\\auto-deploy-server"; 


const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/webhook") {
    exec(`cd ${REPO_DIR} && git pull`, (err, stdout, stderr) => {
      const log = `[${new Date().toISOString()}] Pull triggered\n${
        stdout || ""
      }${stderr || ""}\n`;
      fs.appendFileSync(LOG_FILE, log); 
      console.log(log);

      
    

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
