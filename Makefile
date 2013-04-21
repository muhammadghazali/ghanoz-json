test:
	npm install
	npm install -d
	mongoimport --host localhost --db ghanoz_json_test --collection events --file test/db/event.json
	NODE_ENV=testing=npm test
	mongo ghanoz_json_test --eval "db.dropDatabase()"

.PHONY: test
