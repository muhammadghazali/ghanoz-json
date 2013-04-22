test:
	mongo ghanozjson_test --eval "db.dropDatabase()"
	mongoimport --host localhost --db ghanozjson_test --collection events --file test/db/event.json
	NODE_ENV=testing npm test
	mongodump --db ghanozjson_test
	mongo ghanozjson_test --eval "db.dropDatabase()"

.PHONY: test
