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


//--------------------------------------------------------------
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
//--------------------------------------------------------------
function FooRoot(props) {
    return <p>Function Component {props.data}</p>
}
const fooRootElem = <FooRoot data="PropsData" />;
ReactDOM.render(fooRootElem, document.getElementById('fooRoot'));
//--------------------------------------------------------------
class ClassRoot extends React.Component {
    render() {
        return <p>Class Component {this.props.data}</p>
    }
}
const classRootElem = <ClassRoot data="ClassRoot" />;
ReactDOM.render(classRootElem, document.getElementById('classRoot'));
//--------------------------------------------------------------
function foo() {
    return 111;
}
function HelloUser(props) {
    return <h5>Hello {props.name}</h5>
}
function AllHello() {
    return (
        <div>
            <HelloUser name="Alex" />
            <HelloUser name="Tina" />
            <HelloUser name="Arnold" />
            { foo() }
        </div>
    )
}
ReactDOM.render(
    <AllHello />,
    document.getElementById('allHello')
);
//--------------------------------------------------------------

const elem = document.getElementById('mainComponent');

class MainC extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dateTime: new Date() }
    }
    render() {
        return (
            <div>
                <hr/>
                <h3>MainC</h3>
                <p>{ this.state.dateTime.toLocaleString() }</p>
                <p>{ this.props.value }</p>
            </div>
        )
    }
    tick() {
        this.setState(
            {
                dateTime: new Date()
            }
        );
    }
    componentDidMount() {
        this.timerID = setInterval( () => {
            this.tick();
        }, 1000);

        // setTimeout( ()=> {
        //    this.props.value = 1000;
        //    this.setState(); // can be used for rewrite View with chanded data
        // }, 1500  )

    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
}

ReactDOM.render( <MainC value={ 1 } />, elem );
