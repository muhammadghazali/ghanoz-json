test:
	export NODE_ENV=testing
	npm install
	npm install -d
	mongoimport --host localhost --db ghanoz_json_test --collection events --file test/db/event.json
	npm test
	mongo ghanoz_json_test --eval "db.dropDatabase()"

.PHONY: test
