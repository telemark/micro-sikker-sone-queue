[![Build Status](https://travis-ci.org/telemark/micro-sikker-sone-queue.svg?branch=master)](https://travis-ci.org/telemark/micro-sikker-sone-queue)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# micro-sikker-sone-queue

Microservice for queue

## API

All API calls needs an Authorization header with valid jwt

```bash
$ curl -X GET -H "Authorization: Bearer <token>" https://queue.service.io/queue/next
```

### ```PUT /queue```

Add a new document to the queue

```bash
$ curl -X PUT -H "Authorization: Bearer <token>" -d '{ "title": "Hello", "description": "World!" }' https://queue.service.io/queue
```

### ```GET /queue/next```

Get next document from queue

```bash
$ curl -X GET -H "Authorization: Bearer <token>" https://queue.service.io/queue/next
```

### ```GET /queue/all```

Get all documents in queue

```bash
$ curl -X GET -H "Authorization: Bearer <token>" https://queue.service.io/queue/all
```

### ```DELETE /queue/:id```

Deletes document from queue

```bash
$ curl -X DELETE -H "Authorization: Bearer <token>" https://queue.service.io/queue/5af938ee51450ae8f3b17e5f
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

