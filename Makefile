.PHONY: install start test build clean dev e2e

export PORT=3000
export JWT_SECRET=r@nd0mS3cr3theR3292833
export DATABASE_URL=postgres://localhost:5432/auth_users
export DATABASE_NAME=primary

install:
	npm install

start:

dev:
	npm run dev

test:
	npm test

e2e:
	export JWT_SECRET=jao29S#@9%ajwa1342893
	export DATABASE_URL=postgres://localhost:5432/auth_users_test
	export DATABASE_NAME=primary_test
	npm run test:e2e

build:
	npm run build

clean:
	rm -rf node_modules
	rm -rf build
