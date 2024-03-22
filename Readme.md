##Backend in Typescript initiate commands

- npm init -y
- npm i express dotenv
- npm i -D typescript @types/express @types/node
- npx tsc --init

- "outDir": "./dist"

- npx ts-node src/index.ts
- npm i -D nodemon ts-node

- "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts"
  }

- nodemon.json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "concurrently \"npx tsc --watch\" \"ts-node src/index.ts\""
}

