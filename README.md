<h1>Task home assignment EBANX</h1>

<h2>Summary</h2>

1. [Description](#description)
2. [Requirements](#requirements)
3. [Deadline](#requirements)
4. [Stacks](#stacks)
5. [Requirements to run local](#requirements-to-run-local)
6. [Run local](#run-local)
7. [Project architecture](#project-architecture)
7. [Tests](#tests)
7. [Production project](#production-project)
7. [Deploy info](#deploy-info)

<h2 id="description">Description</h2>

- The technical challenge consists of creating an API REST that has three endpoints POST /reset, GET /balance and POST /event that respect conditions that stabilished in the routine of tests that was previosly sended.

<h2 id="requirements">Requirements</h2>

- Only pass in routine of tests in this [link](https://ipkiss.pragmazero.com/)

<h2 id="deadline">Deadline</h2>

- The test starts on `📅 14 feb 2024 - Wednesday` with 5 days (calendar days) of time to finish
- Ergo the deadline is `📅 19 feb 2023 - Sunday`

<h2 id="stacks">Stacks</h2>

- Typescript
- NestJS
- PinoLogger
- Render
- Postgres
- Swagger
- Docker

<h2 id="requirements-to-run-local">Requirements to run local</h2>

1. `Docker version 25.0.1` => [install docker](https://docs.docker.com/get-docker/)
2. `Docker Compose version v2.24.2` => [install docker compose](https://docs.docker.com/compose/install/)
3. `Node v20.10.0` (run without docker)
4. All environment variables names that you need are in `./.env.example` file
5. The port that you choose in .env file shold be open

<h2 id="run-local">Run local</h2>

1. Clone repository
- If you choose HTTPS: `https://github.com/aaguero96/task_home_assignment_EBANX.git`
- If you choose SSH: `git@github.com:aaguero96/task_home_assignment_EBANX.git`

2. Install dependencies
- `npm install`

3. .env file
- In root directory has one file named `.env.example`
- copy that file and rename that to `.env` (if you prefer run `cp ./.env.example ./.env`)
- fill up the env vars with correct values

4. Run project with docker-compose
- `docker-compose up` or `docker compose up` (await for message `App running on port: <PORT>` to start)

5. Run project without docker-compose
- `npm start` or `npm run start:dev` but you have to configure .env vars with a online postgres database

<h2 id="project-architecture">Project architecture</h2>

This project is based on conceptis of Hexagonal architecture, DDD, SOLID, clean-code, dependecy injection, decorators, typeORM, ...

<h2 id="tests">Tests</h2>

This project has two tipes of tests:

- Unit tests => run with command `npm test`
- Integration tests => run with command `npm run test:integration`

<h2 id="production-project">Production project</h2>

If you want to see the project in production environment you need to access this link [project](https://aaguero-task-home-assignment-ebanx.onrender.com/), but the enviroment is deployed with free access in render so many access our many values in database not works good, and the expired date of this project is `📅 01 apr 2024 - Monday`, if you want to test many things I recommend you use local enviroment with docker.

<h2 id="deploy-info">Deploy info</h2>

Deploy is automaticaly made by github actions with an new release of this project.