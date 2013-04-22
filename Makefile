test:
	npm install
	npm install -d
	mongo ghanozjson_test --eval "db.dropDatabase()"
	mongoimport --jsonArray --host localhost --db ghanozjson_test --collection events --file test/db/events.json
	NODE_ENV=testing npm test
	mongo ghanozjson_test --eval "db.dropDatabase()"

.PHONY: test
