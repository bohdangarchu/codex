npm init -y

npm i --save-dev @types/node
npm install --save express@4.17.1
npm install -save-dev @types/express@4.17.1
npm i ts-node-dev --save-dev
// compile
npx tsc
// run
node dist/App.js
// linter 
npm install --save-dev eslint
npx eslint --init
// run the linter to check all ts files
npx eslint . --ext .ts

// to automate compilation 
npm i -D ts-node-dev
// add script "dev": "ts-node-dev --respawn --pretty --transpile-only src/App.ts"
// to keep watching for changes

// mongodb in docker 
docker run --name test-mongo -d -p 27017:27017 mongo
docker start test-mongo

docker run --name rmq -p 5672:5672 rabbitmq

