#!/bin/bash

# Exit on any cmd failure
set -e

echo "Building shared"
cd ./shared || exit
npm ci
npm run build
cd ..
echo "Successfully build shared"

echo "Building frontend"
cd ./frontend || exit
npm ci
npm run test && npm run build
cd ..
echo "Successfully build frontend"

# build backend on server, so that correct node's linux modules are resolved and nestjs utilities are installed

echo "Stopping surnameforge.service"
ssh root@188.245.154.139 'systemctl stop surnameforge.service'

echo "Deleting old server"
ssh root@188.245.154.139 'rm -rf ~/surnameforge/shared ~/surnameforge/frontend ~/surnameforge/backend'
echo "Deleted old server"

echo "Copying new server"
tar -czf - ./shared/dist ./shared/package.json ./frontend/dist/ $(git ls-files ./backend) | ssh root@188.245.154.139 'tar -xzf - -C ~/surnameforge' 
echo "Copied new server"

echo "Installing server"
ssh root@188.245.154.139 << 'EOF'
  cd ~/surnameforge/backend
  npm i
  npm run build
EOF
echo "Installed server"

echo "Reloading and restarting surnameforge.service"
ssh root@188.245.154.139 << 'EOF'
  systemctl daemon-reload
  systemctl restart surnameforge.service
EOF

echo "Successfully deployed"
