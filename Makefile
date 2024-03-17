.PHONY: install start test build clean dev e2e

install:
	npm install

start:
	npm start

dev:
	npm run dev

test:
	npm test

e2e:
	npm run test:e2e

build:
	npm run build

clean:
	rm -rf node_modules
	rm -rf build
