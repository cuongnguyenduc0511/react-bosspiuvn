import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { AppLoader } from '../../component/Loader/AppLoader';

const Song = Loadable({
    loader: () => import('../Song'),
    loading() {
        return <AppLoader />
    }
});

const Request = Loadable({
    loader: () => import('../Request'),
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
        component: Request
    }
]

export default routes;
