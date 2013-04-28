benchmark-normal:
	mongo ghanozjson_test --eval "db.dropDatabase()"
	mongoimport --jsonArray --host localhost --db ghanozjson_test --collection events --file test/db/normal-events-resource.json
	ab -c 100 -t 180 -H "Accept: application/json" -g benchmark/json.dat http://localhost:3000/events
	ab -c 100 -t 180 -H "Accept: application/xml" -g benchmark/xml.dat http://localhost:3000/events
	gnuplot benchmark/ghanoz-json-benchmark-normal.p
	mv ghanoz-json-benchmark* benchmark

benchmark-empty:
	mongo ghanozjson_test --eval "db.dropDatabase()"
	mongoimport --jsonArray --host localhost --db ghanozjson_test --collection events --file test/db/empty-events-resource.json
	ab -c 100 -t 180 -H "Accept: application/json" -g benchmark/json.dat http://localhost:3000/events
	ab -c 100 -t 180 -H "Accept: application/xml" -g benchmark/xml.dat http://localhost:3000/events
	gnuplot benchmark/ghanoz-json-benchmark-empty.p
	mv ghanoz-json-benchmark* benchmark

run-test:
	NODE_ENV=testing npm start

run-dev:
	mongo ghanozjson --eval "db.dropDatabase()"
	mongoimport --jsonArray --host localhost --db ghanozjson --collection events --file test/db/events.json
	NODE_ENV=development npm start

run-prod:
	mongo ghanozjson --eval "db.dropDatabase()"
	mongoimport --jsonArray --host localhost --db ghanozjson --collection eve$
	NODE_ENV=production npm start

test:
	npm install
	npm install -d
	mongo ghanozjson_test --eval "db.dropDatabase()"
	mongoimport --jsonArray --host localhost --db ghanozjson_test --collection events --file test/db/events.json
	NODE_ENV=testing npm test
	mongodump --db ghanozjson_test
	mongo ghanozjson_test --eval "db.dropDatabase()"

.PHONY: test benchmark-empty benchmark-normal run-test run-dev run-prod
