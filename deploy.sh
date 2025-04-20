#!/bin/bash

echo "Starting deployment..."
git pull origin main
npm install
npm run build
systemctl restart your-service  # Ganti dengan service yang sesuai
echo "Deployment complete!"
