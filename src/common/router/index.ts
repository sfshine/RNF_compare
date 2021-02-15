import {StackActions} from '@react-navigation/native';
import {Log} from '../log';

let _navigator;
export function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}
export interface NavigationParams {
  [key: string]: any;
}
export const reLaunch = () => {
  throw new Error('暂未实现');
};

export const redirectTo = (router: string, query: NavigationParams = {}) => {
  return _navigator.dispatch(StackActions.replace(router, query));
};

export function navigateTo(router: string, query: NavigationParams = {}) {
  return _navigator.dispatch(StackActions.push(router, query));
}

export const navigateBack = (delta = 1) => {
  if (delta <= 0) {
    Log.i('navigateBack', '返回层级必须大于等于1');
    throw new Error('返回层级必须大于等于1');
  }
  return _navigator.dispatch(StackActions.pop(delta));
};
