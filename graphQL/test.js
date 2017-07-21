'use strict';

function strToArr( arr, ) {
    const join = [].join;
    return join.call( arguments, ":" )
}
console.log( strToArr(1,2,3) );

//--------------------------------------------------------------------------

class User {
    constructor() {
        // bind is necessary for use this in callbacks of this class like in handler
        this.handler = this.handler.bind(this);
    }
    handler() {
        console.log( this );
    }
}
let user = new User();
user.handler();

//--------------------------------------------------------------------------

import fs from 'fs';

function fileReading() {
    return new Promise( (res, rej) => {
        fs.readFile('.babelrc', null, function (err, data) {
            if(err) rej(err);
            else {
                res( data.toString() );
            }
        });
    } );
}
async function foo() {
    let receive = await fileReading();
    console.log( receive );
}
foo();

//--------------------------------------------------------------------------

function helper(str, ...keys) {
    console.log(str);
    console.log(keys);

    let outString = '<div>'+ str[0]+ keys[0] + str[1] + keys[1] +'</div>';
    process.stdout.write('\n'+outString+'\n\n');

}
const esth = 8;
const esth1 = 'so nice';
helper`ES${esth} is ${esth1}`;

//--------------------------------------------------------------------------