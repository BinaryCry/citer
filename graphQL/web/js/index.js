'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

//--------------------------------------------------------------
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
//--------------------------------------------------------------
function FooRoot(props) {
    return React.createElement(
        'p',
        null,
        'Function Component ',
        props.data
    );
}
var fooRootElem = React.createElement(FooRoot, { data: 'PropsData' });
ReactDOM.render(fooRootElem, document.getElementById('fooRoot'));
//--------------------------------------------------------------

var ClassRoot = function (_React$Component) {
    _inherits(ClassRoot, _React$Component);

    function ClassRoot() {
        _classCallCheck(this, ClassRoot);

        return _possibleConstructorReturn(this, (ClassRoot.__proto__ || Object.getPrototypeOf(ClassRoot)).apply(this, arguments));
    }

    _createClass(ClassRoot, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'p',
                null,
                'Class Component ',
                this.props.data
            );
        }
    }]);

    return ClassRoot;
}(React.Component);

var classRootElem = React.createElement(ClassRoot, { data: 'ClassRoot' });
ReactDOM.render(classRootElem, document.getElementById('classRoot'));
//--------------------------------------------------------------
function foo() {
    return 111;
}
function HelloUser(props) {
    return React.createElement(
        'h5',
        null,
        'Hello ',
        props.name
    );
}
function AllHello() {
    return React.createElement(
        'div',
        null,
        React.createElement(HelloUser, { name: 'Alex' }),
        React.createElement(HelloUser, { name: 'Tina' }),
        React.createElement(HelloUser, { name: 'Arnold' }),
        foo()
    );
}
ReactDOM.render(React.createElement(AllHello, null), document.getElementById('allHello'));
//--------------------------------------------------------------

var elem = document.getElementById('mainComponent');

var MainC = function (_React$Component2) {
    _inherits(MainC, _React$Component2);

    function MainC(props) {
        _classCallCheck(this, MainC);

        var _this2 = _possibleConstructorReturn(this, (MainC.__proto__ || Object.getPrototypeOf(MainC)).call(this, props));

        _this2.state = { dateTime: new Date() };
        return _this2;
    }

    _createClass(MainC, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement('hr', null),
                React.createElement(
                    'h3',
                    null,
                    'MainC'
                ),
                React.createElement(
                    'p',
                    null,
                    this.state.dateTime.toLocaleString()
                ),
                React.createElement(
                    'p',
                    null,
                    this.props.value
                )
            );
        }
    }, {
        key: 'tick',
        value: function tick() {
            this.setState({
                dateTime: new Date()
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            this.timerID = setInterval(function () {
                _this3.tick();
            }, 1000);

            // setTimeout( ()=> {
            //    this.props.value = 1000;
            //    this.setState(); // can be used for rewrite View with chanded data (props & state)
            // }, 1500  )
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.timerID);
            alert(1);
        }
    }]);

    return MainC;
}(React.Component);

ReactDOM.render(React.createElement(MainC, { value: 1 }), elem);
//--------------------------------------------------------------

var Evento = function (_React$Component3) {
    _inherits(Evento, _React$Component3);

    function Evento(props) {
        _classCallCheck(this, Evento);

        var _this4 = _possibleConstructorReturn(this, (Evento.__proto__ || Object.getPrototypeOf(Evento)).call(this, props));

        _this4.value = 1;

        // bind is necessary for use this in callbacks like in windowEcho:console.log( this )
        // it can be work only if variable (method) is already defined in class
        _this4.windowEcho = _this4.windowEcho.bind(_this4);
        _this4.consoleEcho = _this4.consoleEcho.bind(_this4);

        // this.foo = this.foo.bind(this); // error: foo in not defined in this class
        return _this4;
    }

    _createClass(Evento, [{
        key: 'windowEcho',
        value: function windowEcho(event) {
            event.preventDefault();

            console.log(this.value);

            alert(event);
        }
    }, {
        key: 'consoleEcho',
        value: function consoleEcho(event) {
            event.preventDefault();

            var obj = {};
            for (var i in event) {
                event.hasOwnProperty(i) ? obj[i] = event[i] : 0;
            }
            console.log(obj);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'button',
                    { onClick: this.consoleEcho },
                    'Click (console)'
                ),
                React.createElement(
                    'button',
                    { onClick: this.windowEcho },
                    'Click (window)'
                )
            );
        }
    }]);

    return Evento;
}(React.Component);

ReactDOM.render(React.createElement(Evento, null), document.getElementById('eventum'));

