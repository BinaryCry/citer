// @server 1.1

// http
const http = require('http');
const PORT = 3000;
const IP   = '127.0.0.2';

// fs
const fs = require('fs');

const server = http.createServer(
    (req, res) => {
        res.setHeader('Author', 'Alex Step');
        res.writeHead(200, 'msg: OK', {'Content-Type' : 'text/html; charset=utf-8'});
        fs.readFile('teach.txt', null, function (err, data) {
            if(err) {
                res.write('<div>Could not find or open file to read</div>');
            } else {
                let bool = data ? true : false; // if file exists return true (file can be empty); !!data
                res.write('<pre>'+bool+'</pre>');
                res.write('<pre>'+data+'</pre>');
                res.end(null, null, function () {
                    console.log('done');
                });
            }
        });
    }
).listen(PORT,IP, null, function () {
    console.log('Listening on '+IP+':'+PORT);
});

