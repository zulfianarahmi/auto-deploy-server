# Auto Deploy Server

This project implements an auto-deploy webhook system using Node.js. When a push is made to the GitHub repository, the server automatically pulls the latest code and deploys it. The system listens for GitHub webhook events and performs the necessary actions to update the server.

## Features

- Automatically pulls the latest code from the repository when a push event occurs.
- Restarts necessary services (e.g., npm) if required.
- Keeps a log of deployments (`deploy.log`).
- Configurable for any GitHub repository via webhook.

## Prerequisites

- Node.js (>= 14.x)
- npm (Node Package Manager)
- Git installed on the server
- Access to a GitHub repository and webhook setup

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/auto-deploy-server.git
   cd auto-deploy-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup the GitHub webhook:

   - Go to your GitHub repository.
   - Navigate to `Settings` -> `Webhooks` -> `Add webhook`.
   - Set the payload URL to your server (e.g., `http://<server-ip>:3000/webhook`).
   - Choose **Content type**: `application/json`.
   - Select **Just the push event**.
   - Save the webhook.

4. Run the server:

   ```bash
   node webhook.js
   ```

5. Optionally, use `deploy.sh` for easier deployment (you can modify the script based on your needs):
   ```bash
   ./deploy.sh
   ```

## How It Works

1. The server listens for GitHub webhook events.
2. When a push event is received, it performs a `git pull` on the server.
3. The server restarts necessary services (like `npm run build` or similar commands) to deploy the latest changes.
4. All actions are logged in `deploy.log`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
