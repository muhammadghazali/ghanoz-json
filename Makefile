test:
	export NODE_ENV=testing
	cd src/app/; sudo npm install
	cd test/; sudo npm install; npm test

.PHONY: test
