/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import eventsGestureHandler from './screens/eventsReanimated';
import eventsReanimated from './screens/eventsReanimated';
import layoutAnimations from './screens/layoutAnimations';
import pager from './screens/pager';
import playground from './screens/playground';
import screen1 from './screens/screen1';
import screen2 from './screens/screen2';
import svg from './screens/svg';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={() => ({
            unmountOnBlur: true,
          })}>
          <Tab.Screen name="SVG" component={svg} />
          <Tab.Screen name="Playground" component={playground} />
          <Tab.Screen name="LayoutAnimation" component={layoutAnimations} />
          <Tab.Screen name="Pager" component={pager} />
          <Tab.Screen name="Events_R" component={eventsReanimated} />
          <Tab.Screen name="Modifiers" component={screen2} />
          <Tab.Screen name="SharedValue" component={screen1} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
