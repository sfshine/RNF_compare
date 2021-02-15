/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './example/App';
import ShellApp from './shell/App';

AppRegistry.registerComponent('RNF', () => (__DEV__ ? App : ShellApp));
