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
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },

        handler: function (request, reply) {
            var data = request.payload;
            if (data.file) {
                var name = data.file.hapi.filename;
                var path = __dirname + "/uploads/" + name;
                var file = fs.createWriteStream(path);

                file.on('error', function (err) { 
                    console.error(err) 
                });

                data.file.pipe(file);

                data.file.on('end', function (err) { 
                    var ret = {
                        filename: data.file.hapi.filename,
                        headers: data.file.hapi.headers
                    }
                    reply(JSON.stringify(ret));
                })
            }

        }
    } 
});

server.start(function () {
    console.log('Server running at: ', server.info.uri);
});
