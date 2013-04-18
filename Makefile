test:
	export NODE_ENV=testing
	cd src/app/; npm install
	cd test/; npm install; npm test

.PHONY: test
