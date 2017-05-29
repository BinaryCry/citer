'use strict';

// const un = <b>%username%!</b>;

var hw = React.createElement(
    'span',
    null,
    'Hallo, ',
    React.createElement(
        'b',
        null,
        '%username%!'
    )
);
var br = React.createElement('br', null);

// const hdr = {
//     type: 'h1',
//     props: {
//         className: 'header',
//         children: 'This is header'
//     }
// };


var element = React.createElement('div', { className: 'greeting', id: 'wrapper' }, hw, br, React.createElement('hr', null), hw);

ReactDOM.render(element, document.getElementById('root'));

var itrvArr = [];
itrvArr.push(setInterval(function () {
    ReactDOM.render(React.createElement(
        'span',
        null,
        new Date().toLocaleString()
    ), document.getElementById('time'));
}, 1000));

document.getElementById('stopItrvs').onclick = function (e) {
    if (itrvArr.length < 1) return false;else {
        for (var i = 0; i < itrvArr.length; i++) {
            clearInterval(itrvArr[i]);
        }
    }
};

