# movies

## Local development

* npm install -g webpack

To start the app, be sure you run `npm install`. Then:
* be sure that you have a running mongo instance
* start babel server: `npm run buildAndWatch`
* start server: `npm run dev`

## Deployment
Run `npm run build` and then `fly -l production`.
