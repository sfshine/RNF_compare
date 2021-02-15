/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
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
import {Log} from '@src/common/log';
import CodePush from 'react-native-code-push';

const App: () => React.Node = () => {
  useEffect(() => {
    CodePush.sync({installMode: CodePush.InstallMode.IMMEDIATE})
      .then((result) => Log.w('CodePush Msg', result))
      .catch((e) => Log.w('CodePush Error', e));
  }, []);
  return <Text>程序加载中</Text>;
};
export default App;
