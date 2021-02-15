import React from 'react';
import {Text} from 'react-native';
import articleList from './pages/articleList';
import articleDetail from './pages/articleDetail';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {setTopLevelNavigator} from '@src/common/router';

const Stack = createStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: 'tomato'},
      }}>
      <Stack.Screen name="articleList" component={articleList} />
      <Stack.Screen name="articleDetail" component={articleDetail} />
    </Stack.Navigator>
  );
}

export function ReactNavigation() {
  const setRef = (ref) => setTopLevelNavigator(ref);
  return (
    <NavigationContainer ref={setRef}>
      <RootStack />
    </NavigationContainer>
  );
}
