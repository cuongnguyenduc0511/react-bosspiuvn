import * as actions from '../../src/app/actions/Auth/authActions';
import { authActions } from '../../src/app/actions/Auth/authActionTypes';
import store from '../../src/app/configureStore';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

describe('Login', () => {
  it('Login Fail', () => {

    const expectedActions = [
      { type: authActions.LOGIN_FAIL, payload: 'Invalid Password' }
    ]

    const value = {
      username: 'zhaox1995',
      password: '12345'
    }

    return store.dispatch(actions.authenticate(value)).then(() => {
      // return of async actions
      expect(store.getActions()).toContainEqual(expectedActions);
    })
  })
});