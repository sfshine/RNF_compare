/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {store} from '@src/common/redux';
import {ReactNavigation} from './RootStack';
import codePush from 'react-native-code-push';

const App: () => React.Node = () => {
  return (
    <Provider store={store}>
      <ReactNavigation />
    </Provider>
  );
};

export default codePush(App);
