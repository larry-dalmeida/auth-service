.PHONY: install start test build clean dev e2e dep-up dep-down build lint format-fix format-staged start

export PORT=3000
export JWT_SECRET=r@nd0mS3cr3theR3292833
export DATABASE_INSTANCE_NAME=primary
export DATABASE_NAME=auth_users
export DATABASE_HOST=localhost
export DATABASE_USER=postgres
export DATABASE_PASSWORD=postgres
export DATABASE_PORT=5433

DOCKER_COMPOSE = docker-compose
JEST = npx jest
TSC = npx tsc
TS_NODE_DEV = npx ts-node-dev
ESLINT = npx eslint
PRETTIER = npx prettier
PRETTY_QUICK = npx pretty-quick

start:
	node dist/index.js

build:
	$(TSC)

install:
	npm install

dev:
	$(TS_NODE_DEV) src/index.ts --respawn --transpile-only

dep-up:
	$(DOCKER_COMPOSE) --verbose up -d --remove-orphans

dep-down:
	$(DOCKER_COMPOSE) down

test:
	$(JEST) --config ./jest.config.js

e2e:
	make dep-up
	$(JEST) --config ./jest.e2e.config.js
	

clean:
	rm -rf node_modules
	rm -rf dist
	rm -rf coverage

lint:
	$(ESLINT) src/

format-fix:
	$(PRETTIER) . --write

format-staged:
	$(PRETTY_QUICK) --staged