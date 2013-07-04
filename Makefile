.PHONY: help test benchmark-empty benchmark-normal benchmark-one run-test run-dev run-prod setup

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  setup               Setup required dependencies"
	@echo "  run-prod            Run Web API server in production mode"
	@echo "  run-test            Run Web API server in testing mode"
	@echo "  run-dev             Run Web API server in development mode"
	@echo "  benchmark-empty     Load testing Web API in Empty Resource scenario"
	@echo "  benchmark-normal    Load testing Web API in Normal Resource scenario"
	@echo "  benchmark-one       Load testing Web API in Normal Resource scenario"
	@echo "  test                Run the test againts  Web API server"


benchmark-normal:
	mongo ghanozjson --eval "db.dropDatabase()"
	mongoimport --jsonArray --host localhost --db ghanozjson --collection events --file test/db/normal-events-resource.json
	ab -c 1 -t 90 -H "Accept: application/json" -g benchmark/normal-json.dat http://localhost:3000/events
	ab -c 1 -t 90 -H "Accept: application/xml" -g benchmark/normal-xml.dat http://localhost:3000/events
	gnuplot benchmark/ghanoz-json-benchmark-normal.p
	mv ghanoz-json-benchmark* benchmark

benchmark-empty:
	mongo ghanozjson --eval "db.dropDatabase()"
	mongoimport --jsonArray --host localhost --db ghanozjson --collection events --file test/db/empty-events-resource.json
	ab -c 1 -t 90 -H "Accept: application/json" -g benchmark/empty-json.dat http://localhost:3000/events
	ab -c 1 -t 90 -H "Accept: application/xml" -g benchmark/empty-xml.dat http://localhost:3000/events
	gnuplot benchmark/ghanoz-json-benchmark-empty.p
	mv ghanoz-json-benchmark* benchmark

benchmark-one:
	mongo ghanozjson --eval "db.dropDatabase()"
	mongoimport --jsonArray --host localhost --db ghanozjson --collection events --file test/db/normal-events-resource.json
	ab -c 1 -n 1 -H "Accept: application/json" http://localhost:3000/events
	ab -c 1 -n 1 -H "Accept: application/xml" http://localhost:3000/events

run-test:
	NODE_ENV=testing npm start

run-dev:
	mongo ghanozjson --eval "db.dropDatabase()"
	mongoimport --jsonArray --host localhost --db ghanozjson --collection events --file test/db/events.json
	NODE_ENV=development npm start

run-prod:
	mongo ghanozjson --eval "db.dropDatabase()"
	mongoimport --jsonArray --host localhost --db ghanozjson --collection events --file test/db/events.json
	NODE_ENV=production npm start

test:
	mongo ghanozjson_test --eval "db.dropDatabase()"
	mongoimport --jsonArray --host localhost --db ghanozjson_test --collection events --file test/db/events.json
	NODE_ENV=testing npm test
	mongodump --db ghanozjson_test
	mongo ghanozjson_test --eval "db.dropDatabase()"

setup:
	npm install && npm install -d
