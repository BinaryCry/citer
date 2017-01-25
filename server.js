// @server 1.1

const http = require('http');
const PORT = 3000;
const IP   = '127.0.0.2';

respreq = (req,res) => {
    console.log('1');
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<br>');
    res.end('<h1>Hello, World!</h1>');
};

const server = http.createServer(respreq);
server.listen(PORT,IP);
console.log('Listening on '+IP+':'+PORT+'...');
