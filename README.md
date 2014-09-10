Demo of multipart form/file uploads with a `hapi.js` server and various clients.


## Usage

    npm install
    npm run server
    npm run client


Change the first route in `server.js` to try the other clients:

```html
server.route({ 
    method: 'GET',
    path: '/upload',
    handler: function (request, reply) {
        reply.file('clients/html-form/index.html');
        // reply.file('clients/xhr-send/index.html');
        // reply.file('clients/xhr-bootstrap/index.html');
    },
});
```

