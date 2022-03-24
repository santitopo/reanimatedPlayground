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
import customLayoutAnimations from './screens/customLayoutAnimations';
import eventsReanimated from './screens/eventsReanimated';
import GeneralScreen from './screens/generalUI';
import layoutAnimations from './screens/layoutAnimations';
import pager from './screens/pager';
import playground from './screens/playground';
import screen1 from './screens/screen1';
import screen2 from './screens/screen2';
import svg from './screens/svg';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#0097e6'},
          }}>
          <Tab.Screen name="Sample" component={GeneralScreen} />

          <Stack.Screen name="Home" component={TabNav} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        unmountOnBlur: true,
      })}>
      <Tab.Screen name="SVG" component={svg} />
      <Tab.Screen name="Playground" component={playground} />
      <Tab.Screen name="CustomLA" component={customLayoutAnimations} />
      <Tab.Screen name="LayoutAnimation" component={layoutAnimations} />
      <Tab.Screen name="Pager" component={pager} />
      <Tab.Screen name="Events_R" component={eventsReanimated} />
      <Tab.Screen name="Modifiers" component={screen2} />
      <Tab.Screen name="SharedValue" component={screen1} />
    </Tab.Navigator>
  );
};

export default App;
