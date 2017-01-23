// @server 1.0

const http = require('http');
const port = 3000;
const IP   = '127.0.0.2';

respreq = (req,res) => {
    console.log('1');
};

const server = http.createServer(respreq);
server.listen(port,IP);
console.log('Listening on '+IP+':'+port+'...');