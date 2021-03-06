/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import gestures from './screens/gestures';
import GeneralScreen from './screens/generalUI';
import screen2 from './screens/modifiers';
import svg from './screens/svg';
import sharedValues from './screens/sharedValues';
import AnimatedDemo from './screens/animatedDemo';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#0097e6'},
          }}>
          <Stack.Screen name="Home" component={TabNav} />
          <Stack.Screen name="Sample" component={GeneralScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        unmountOnBlur: true,
      })}>
      <Tab.Screen name="Animated" component={AnimatedDemo} />
      <Tab.Screen name="SharedValue" component={sharedValues} />
      <Tab.Screen name="Modifiers" component={screen2} />
      <Tab.Screen name="Gestures" component={gestures} />
      <Tab.Screen name="SVG" component={svg} />
    </Tab.Navigator>
  );
};

export default App;
