import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom'
import routes from './routes';
import { renderRoutes } from 'react-router-config';
import { history } from '../../configureStore';

export class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('app component mounted');
    }

    render() {
        document.getElementsByTagName('body')[0].className = ''
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        {renderRoutes(routes)}
                    </Switch>
                </div>
            </Router>
        );
    }
}