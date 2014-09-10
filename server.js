var Hapi = require('hapi');

var server = new Hapi.Server('localhost', 8080);

server.route({ 
    method: 'GET',
    path: '/upload',
    handler: function (request, reply) {
        // reply.file('clients/html-form/index.html');
        // reply.file('clients/xhr-send/index.html');
        reply.file('clients/xhr-bootstrap/index.html');
    },
});

server.route({ 
    method: 'POST', 
    path: '/submit', 
    config: { 
        payload: { output: 'stream' },
        handler: function (request, reply) {
            reply(request.payload);
        }
    } 
});

server.start(function () {
    console.log('Server running at: ', server.info.uri);
});
