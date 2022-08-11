
install:
	npm ci
	npx sls dynamodb install

start:
	npm run start

stop:
	docker-compose stop