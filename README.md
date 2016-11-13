# movies

## Local development

* global dependencies
  * `npm install -g webpack`
  * `npm install -g npm-check-updates`: run ncu to check whether there is some dependencies updates available
* To start the app, be sure you run `npm install`.
* The local server can be executed in different environments:
 * prod: `npm run local:prod` (like in production)
 * dev: `npm run local:dev` (uses some dev tools for making production easier)
 * test: `npm run local:test` uses an inmemory mongo instance (use user `testUser`)

Configuration is given into `config/{development|production}.json`

## Tests

### Browser tests
The frontend tests are written with jasmine and run by karma in the browser:
* `npm run app:test` (TDD mode, tests are executed each time code change)
* `npm run app:test-single` (single execution)

### API tests
The backend tests are written with chai and run by mocha in node:
* `npm run api:test`
API tests are using the application in test mode (see above).

### All tests
All tests can be executed by running `npm run test`.

## Deployment
Run `npm run deploy`.
