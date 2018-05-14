# micro-sikker-sone-queue

Microservice for queue

## API

All API calls needs an Authorization header with valid jwt

```bash
$ http GET https://queue.service.io/queue/next Authorization:"Bearer <jwt-token>"
```

### ```PUT /queue```

Add a new document to the queue

```bash
$ http PUT https://queue.service.io/queue title=Hello description=World Authorization:"Bearer <jwt-token>"
```

### ```GET /queue/next```

Get next document from queue

```bash
$ http GET https://queue.service.io/queue/next Authorization:"Bearer <jwt-token>"
```

### ```DELETE /queue/:id```

Deletes document from queue

```bash
$ http DELETE https://queue.service.io/queue/1234567 Authorization:"Bearer <jwt-token>"
```

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
