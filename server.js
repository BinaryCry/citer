// @server 1.1

// http
const http = require('http');
const PORT = 3000;
const IP   = '127.0.0.2';

// fs
const fs = require('fs');

// server
const server = http.createServer(
    (req, res) => {
        res.setHeader('Author', 'Alex Step');
        res.writeHead(200, 'msg: OK', {'Content-Type' : 'text/html; charset=utf-8'});
        res.write('<br>');
        res.end('<h5>Hello, World! текст</h5>', null, function () {
            console.log('done');
        });
    }
);
server.listen(PORT,IP, null, function () {
    console.log('Listening on '+IP+':'+PORT);
});

