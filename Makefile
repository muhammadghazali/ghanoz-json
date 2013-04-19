test:
	export NODE_ENV=testing
	cd src/app/; npm install
	mongoimport --host localhost --db ghanoz_json_test --collection events --file test/db/event.json
	cd test/; npm install; npm test
	mongo ghanoz_json_test --eval "db.dropDatabase()"

.PHONY: test
