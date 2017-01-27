console.log(
    process.execPath+
    '\n'+process.version+
    '\n'+process.platform+'\n'
);

cb = () => {
    process.stdout.write('(called on a next event listening iteration) ');
};
asyncFoo = ((foo) => {
    process.nextTick(function() { // даже при условии, что этот код стоит выше, его выполнение произойдет на следующем цыкле считывания событий. Выполнение совершенно ассинхронное
        // можно вкладывать nextTick друг в друга, есди это допустимо по логике вычислений
        foo();
    });
})(cb);

process.stdin.resume(); // по умолчанию поток stdin приостановлен
process.stdout.write("Input your text: "); // \r начнет перетирать при вводе; данный метод вывода только для текста
process.stdin.on('data', function (inputed) { // считывание с клавитуры
    process.stdout.write('was printed: '+inputed);
    // console.log('RSS: '+parseInt((process.memoryUsage().rss/1024)/1024)+' mBytes');
    console.log('V8 heap: '+parseInt((process.memoryUsage().heapTotal/1024)/1024)+' mBytes');
    console.log('V8 used: '+parseInt(process.memoryUsage().heapUsed/1024)+' kBytes');
});


// let buff = new Buffer('buffer', 'utf8');
// console.log(encodeURIComponent(buff));
// console.log(buff.length);