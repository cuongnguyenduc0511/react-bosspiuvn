import React, { Component } from 'react';

export default class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
    }

    onClick = (e) => {
        this.setState({
            value: 'Yolo'
        })
    }

    render() {
        return (
            <div>
                <h1>Song Page</h1>
                <p>This is song page content</p>
                <button id='myButton' onClick={this.onClick}>Click this</button>
                <h3 hidden={!this.state.value} id='value'>{ this.state.value }</h3>
            </div>
        );
    }
}