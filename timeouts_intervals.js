'use strict';

let OpenAndReadFile = (filename,res) => {
    const fname = 'OpenAndReadFile';
    require('fs').readFile(filename, null, function (err, f_inner) {
        console.log(
            err ? 'Could not find or open file for reading' : encodeURIComponent(f_inner)
        );
        res.end('<p>'+f_inner+'</p>', null, function () {
            console.log('done');
        });
    })
};


require('http').createServer((req,res) => {
    res.writeHead(200, null, {'Content-Type':'text/html; charset=utf-8'});
    let filename = 'main.txt';
    setTimeout(OpenAndReadFile, 500, filename, res);
}).listen(3000,'127.0.0.2',function () {
    process.stdout.write('Server ready\n');
});

