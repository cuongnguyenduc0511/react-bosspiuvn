import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history';

const initialState = {};
export const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];

const store = createStore(
    rootReducer, 
    initialState, 
    applyMiddleware(...middleware)
);

store.subscribe(() => {
    console.log(store.getState());
})

export default store;