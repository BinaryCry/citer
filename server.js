// @server 1.2

// http
const http = require('http');
const PORT = 3000;
const IP   = '127.0.0.2';

// fs
const fs = require('fs');

// url
const url = require('url');

// querystring
const querystring = require('querystring');

const server = http.createServer(
    (req, res) => {
        res.setHeader('Author', 'Alex Step');
        res.writeHead(200, 'msg: OK', {'Content-Type' : 'text/html; charset=utf-8'});
        let file = querystring.parse(url.parse(req.url).query).file + '.txt'; // 'file' value from GET data (file='value')
        res.write(file);
        setTimeout(function () {
            fs.readFile(file, null, function (err, data) {
                if(err) res.write('<p>Could not to open or read file</p>');
                else {
                    res.write('<p>'+data+'</p>');
                    res.end(null, null, function () {
                        console.log('done');
                    });
                }
            });
        },2500);
    }
).listen(PORT,IP, null, function () {
    console.log('Listening on '+IP+':'+PORT);
});

