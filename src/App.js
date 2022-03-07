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
import {StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Events from './screens/events';
import events from './screens/events';
import screen1 from './screens/screen1';
import screen2 from './screens/screen2';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="SharedValue" component={screen1} />
          <Tab.Screen name="Modifiers" component={screen2} />
          <Tab.Screen name="Events" component={events} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
