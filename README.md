# micro-sikker-sone-queue

Microservice for queue

## API

All API calls needs an Authorization header with valid jwt

```bash
$ curl -v -H "Authorization: Bearer <INSERT TOKEN>" https://queue.service.io/queue/next
```

### ```PUT /queue```

Add a new document to the queue

### ```GET /queue/next```

Get next document from queue

```bash
$ curl -v -H "Authorization: Bearer <INSERT TOKEN>" https://queue.service.io/queue/next
```

### ```DELETE /queue/:id```

Deletes document from queue

## Deployment - ZEIT/Now

Change content of [production.env](production.env) to match your environment.

Change content of now:alias in [package.json](package.json) to match your domains.

Deploy service.

```bash
$ npm run deploy
```

## License

[MIT](LICENSE)

![Robohash image of micro-sikker-sone-queue](https://robots.kebabstudios.party/micro-sikker-sone-queue.png "Robohash image of micro-sikker-sone-queue")
