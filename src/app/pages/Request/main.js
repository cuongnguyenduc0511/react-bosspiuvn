import React, { Component } from 'react';
import {
    Container
} from 'reactstrap';
import { renderRoutes } from 'react-router-config';
import { Switch, Link, Route, withRouter } from 'react-router-dom';
import RequestEdit from '../Request/edit';

class Request extends Component {
    render() {
        const { route } = this.props;
        return (
            <div>
                <h1 className='text-center section-header'>Request Page</h1>
                <Switch>
                    { renderRoutes(route.routes) }
                </Switch>
            </div>
        );
    }
}

export default withRouter(Request)
