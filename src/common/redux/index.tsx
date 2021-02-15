import React, {useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {Log} from '../log';
import {ConstructorOf} from '../types';

export const ActionType = {
  reset: 'reset',
  merge: 'merge',
  replace: 'replace',
};
export class ReService {
  dispatchInner;
  pageIdentifierInner;

  constructor(dispatch) {
    this.dispatchInner = dispatch;
    this.pageIdentifierInner = this.constructor.name;
  }

  createAction(state) {
    return {
      pageIdentifier: this.getPageIdentifier(),
      type: ActionType.merge,
      state: state || {},
    };
  }

  dispatch(state) {
    this.dispatchInner(this.createAction(state));
  }

  getPageIdentifier() {
    return this.pageIdentifierInner;
  }
}

function createReducer() {
  return function reduce(state, action) {
    Log.i('reducer input>>>', 'state', state, 'action', action);
    let result = {...(state || {})};
    if (action.type == ActionType.reset) {
      result[action.pageIdentifier] = {};
    } else if (action.type == ActionType.replace) {
      result[action.pageIdentifier] = {...(action.state || {})};
    } else if (action.type == ActionType.merge) {
      result[action.pageIdentifier] = {
        ...(result[action.pageIdentifier] || {}),
        ...(action.state || {}),
      };
    } else {
      Log.i('reducer ignore<<<', action.type);
    }
    Log.i('reducer result<<<', result);
    return result;
  };
}

export const store = createStore(createReducer(), applyMiddleware(...[]));

export const view = <T extends ReService>(
  ui: (pageState, state) => {},
  action: (service: T, dispatch) => {},
  reServiceClass: ConstructorOf<T>,
) => (page) => {
  return function Wrapper(props) {
    const dispatch: Function = store.dispatch;
    const service = new reServiceClass(dispatch);
    const pageIdentifier = service.getPageIdentifier();
    Log.i('pageIdentifier', pageIdentifier);
    useEffect(() => {
      return () => {
        dispatch({type: ActionType.reset, pageIdentifier});
      };
    }, []);

    const Connect = connect(
      (state) => {
        return ui(state[pageIdentifier] || {}, state);
      },
      (dispatch) => {
        return action(service, dispatch);
      },
    )(page);
    return <Connect {...props} />;
  };
};
