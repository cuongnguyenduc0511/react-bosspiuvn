import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { AppLoader } from '../../component/Loader/AppLoader';
import Logout from '../Logout';

const Song = Loadable({
    loader: () => import('../Song'),
    loading() {
        return <AppLoader />
    }
});

const Request = Loadable({
    loader: () => import('../Request/main'),
    loading() {
        return <AppLoader />
    }
});

const RequestList = Loadable({
    loader: () => import('../Request/list'),
    loading() {
        return <AppLoader />
    }
});

const RequestEdit = Loadable({
    loader: () => import('../Request/edit'),
    loading() {
        return <AppLoader />
    }
});


const routes = [
    {
        path: '/song',
        component: Song
    },
    {
        path: '/request',
        component: Request,
        routes: [{
            path: '/request/edit/:id',
            exact: true,
            component: RequestEdit
        },
        {
            path: '/request',
            exact: true,
            component: RequestList
        }]
    },
    {
        path: '/logout',
        component: Logout
    }
]

export default routes;
