# 🐕 Pet Health Plan Service

## Description

This application is responsible for managing pet health plans.

This project is based on the principles of domain-driven design and clean architecture.

## Overview

This project includes the following languages and libraries:

- Language: [Typescript](https://www.typescriptlang.org/)
- Runtime: [Node](https://nodejs.org/en/)
- Package management: [Npm](https://www.npmjs.com/)
- Web framework: [Nest.js](https://nestjs.com/)
- Cache [Redis](https://redis.io/pt/)
- ODM [Mongoose](https://mongoosejs.com/)
- Formatter: [Prettier](https://prettier.io/)
- Linter: [Eslint](https://eslint.org/)
- Testing: [Vitest](https://vitest.dev/)
- Compiler: [swc](https://swc.rs/)

Auxiliary libraries and plugins were omitted but can be found in the `package.json` file.

## 💻 Development

To start development it is recommended to have these utilities installed in a local development machine:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node v20](https://nodejs.org/en/)
- [Npm v10](https://www.npmjs.com/)
- [NVM](https://github.com/nvm-sh/nvm)

## 🚀 Running the app

### Start

```bash
docker compose up -d 
npm install
npm run start:dev 
```

### Test

```bash
npm run test # unit tests
npm run test:e2e # end-to-end
```

### Lint

```bash
npm run lint
```

### Build

```bash
npm run build
```

### Swagger Docs

[http://localhost:3000/api/v1/docs](http://localhost:3000/api/v1/docs)