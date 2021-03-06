import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/app.css'
import './assets/css/loader.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faMusic, faAddressBook, faEdit, faLock, faTrash, faSave, faArrowLeft, faStickyNote, faCalendarAlt, faUser, faUserShield, faDownload, faStamp, faUsers } from '@fortawesome/free-solid-svg-icons'
import AppRoot from './AppRoot';
import store from './configureStore';

library.add([
    faSpinner, faMusic, faAddressBook, faEdit, faLock, faTrash, faSave, faArrowLeft,
    faStickyNote, faCalendarAlt, faUser, faUserShield, faDownload, faStamp, faUsers
])

ReactDOM.render(
    <AppRoot store={store}/>
    ,
    document.getElementById('app'));
