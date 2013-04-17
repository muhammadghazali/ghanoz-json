test:
	export NODE_ENV=testing
	cd test/; npm install; npm test

.PHONY: test
