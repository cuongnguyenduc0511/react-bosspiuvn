import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { AppLoader } from '../../component/Loader/AppLoader';

const Song = Loadable({
    loader: () => import('../Song'),
    loading() {
        return <AppLoader />
    }
});

const routes = [
    {
        path: '/',
        exact: true,
        component: Song
    },
    {
        path: '/song',
        component: Song,
    }
]

export default routes;
