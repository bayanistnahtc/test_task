var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// home
server.route({
	method: 'GET',
	path: '/',
	handler: (request, reply) => {
		reply.view('index', {
			text : ''
		});
	}
});

server.route({
    method:'GET',
    path:'/api',
    handler: (request, reply) => {
        reply.view('index', {
            text: 'foo'
        });
    }
});



// Vision Templates
server.register(require('vision'), (err) => {
    if(err){
        throw err;
    }

    server.views({
        engines: {
            html:require('handlebars')
        },
        path: __dirname + '/views',
        layout : 'default-layout'
    });
});

// Start Server
server.start((err) => {
    if(err){
        throw err;
    }

    console.log(`Server started at: ${server.info.uri}`);
});


