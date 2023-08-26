#!/bin/sh     
git pull origin $1
npm run write-secrets --app_secrets=$2
yarn install
cd client
yarn install
npm run-script build
cd ..
sudo systemctl restart nginx
pm2 restart all