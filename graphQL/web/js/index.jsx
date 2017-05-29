// const un = <b>%username%!</b>;

const hw = (
    <span>Hallo, <b>%username%!</b></span>
);
const br = <br />;

// const hdr = {
//     type: 'h1',
//     props: {
//         className: 'header',
//         children: 'This is header'
//     }
// };


const element = React.createElement(
    'div',
    {className: 'greeting', id: 'wrapper'},
    hw,
    br,
    <hr />,
    hw,
);

ReactDOM.render(
    element,
    document.getElementById('root')
);

let itrvArr = [];
itrvArr.push(
    setInterval( ()=>{
        ReactDOM.render(
            <span>{ new Date().toLocaleString() }</span>,
            document.getElementById('time')
        )
    } , 1000)
);

document.getElementById('stopItrvs').onclick = (e) => {
    if( itrvArr.length < 1 ) return false;
    else {
        for (let i = 0; i < itrvArr.length; i++) {
            clearInterval(itrvArr[i]);
        }
    }
};