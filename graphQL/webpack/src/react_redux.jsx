'use strict'

import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

function playlist(state = ['Kampfbereit'], action) {
    switch (action.type) {
        case 'ADD' : return [...state, action.data]; break;
        default: return state;
    }
}

let store = createStore( playlist );

store.subscribe( () => {
    console.log( store.getState() );
} );

// button for redux store
const inp = document.getElementById('trackTitle');
const btn = document.getElementById('addTrack');
btn.addEventListener('click', e => {
    "use strict";
    let trackTitle = inp.value;
    if( trackTitle ) {
        store.dispatch({type: 'ADD', data: trackTitle});
    } else return false;
});

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { created: new Date() };
        this.tick = this.tick.bind(this);
    }
    render() {
        return (
            <div>
                { this.state.created.toLocaleString() }
            </div>
        );
    }
    tick() {
        let timestamp = new Date();
        this.setState(
            {
                created: timestamp.toLocaleString()
            }
        );
    }
    componentDidMount() {
        this.intervID = setInterval( () => {
            this.tick();
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervID);
        alert(1);
    }
}

ReactDOM.render( <ListItem />, document.getElementById('root'));




