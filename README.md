# movies

## Local development

* npm install -g webpack

To start the app, be sure you run `npm install`. Then:
* be sure that you have a running mongo instance
* start local dev server: `npm run local:dev`

## Tests
### Frontend tests
They are written with jasmine and executed by karma in the browser: `npm run test`

### Backend tests
They are written with chai and executed by mocha in node: `npm run api:test`

## Deployment
Run `npm run build` and then `fly -l production`.
