# #!/bin/sh
# cd client/
# npm run-script build
# cd ..
# npm start


npm run write-secrets --app_secrets=$1
yarn install
cd client
yarn install
npm run-script build
cd ..