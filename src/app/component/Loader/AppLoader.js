import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class AppLoader extends Component {
    render() {
        return (
            <div hidden={this.props.hidden} id='app-loader' className="b-loader">
                <FontAwesomeIcon className="spin-big" icon="spinner" spin />
            </div>
        )
    }
}