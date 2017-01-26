// @test 1.0
// start server.js before!

// http
const http = require('http');

let customQuery = {
    host : '127.0.0.2',
    port : '3000',
    path : '/?file=main',
    method : 'GET'
};

for (let i = 0; i < 10; i++) {
    http.request(customQuery, function () {
        console.log('request done');
    }).end();
}