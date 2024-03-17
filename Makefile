.PHONY: install start test build clean dev e2e dep-up dep-down build

export PORT=3000
export JWT_SECRET=r@nd0mS3cr3theR3292833
export DATABASE_URL=postgres://localhost:5433/auth_users
export DATABASE_NAME=primary

DOCKER_COMPOSE = docker-compose
JEST = npx jest
TSC = npx tsc
TS_NODE_DEV = npx ts-node-dev

build:
	$(TSC)

install:
	npm install

dev:
	$(TS_NODE_DEV) src/index.ts --respawn --transpile-only

dep-up:
	$(DOCKER_COMPOSE) up

dep-down:
	$(DOCKER_COMPOSE) down

test:
	$(JEST) --config ./jest.config.js

e2e:
	$(JEST) --config ./jest.e2e.config.js
	

clean:
	rm -rf node_modules
	rm -rf dist
	rm -rf coverage
