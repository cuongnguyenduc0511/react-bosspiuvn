import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom'
import routes, { RouteWithSubRoutes } from './routes';
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config';
import { history } from '../../configureStore';
import NavigationBar from '../../component/Navigation';
import { getUserInformation } from '../../actions/Auth/authActions';

class App extends Component {
    constructor(props) {
        super(props);
        this.props.getUserInformation();
    }

    componentDidMount() {
        console.log('app component mounted');
    }

    render() {
        document.getElementsByTagName('body')[0].className = 'app-body';

        return (
            <div>
                <NavigationBar />
                <Switch>
                    {renderRoutes(routes)}
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInformation: () => {
            dispatch(getUserInformation());
        },
        getCommonData: () => {
            // dispatch(getCommonData());
            console.log('Get Common Data');
        }
    }
}

export default connect(null, mapDispatchToProps)(App)