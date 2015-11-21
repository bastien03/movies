# movies

## Local development
To start the app, just run `npm install` and `npm run dev`.

## Deployment
To deploy, put a `deployment.json` under `data/` containing your ssh credentials:
```json
{
  "username": SSH_USERNAME,
  "password": SSH_PASSWORD
}
```

Then run `npm run production`.
