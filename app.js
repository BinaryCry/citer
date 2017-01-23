// EcmaScript 5
// Object.keys()
// .isArray()
// .forEach(foo)
// .map(foo)
// console.log(
//     [1,2,3].map( function (v) {
//         return v+10;
//     } )
// );

// .trim()

'use strict';

console.log('1');
let foo = () => {
    // console.log( arguments.callee.name );
    console.log('foo');
};
setTimeout(foo,1000);
console.log('2');

// синхронная и ассинхронная обработка
const fs = require('fs');
let content = fs.readFileSync('./teach.txt');
fs.readFile('./teach.txt', function(err,content) {
    console.log(decodeURIComponent(content)+'2');
}); // ассинхронно
console.log(decodeURIComponent(content)+'1');
