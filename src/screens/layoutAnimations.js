import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  SlideInRight,
  SlideOutRight,
  Layout,
} from 'react-native-reanimated';

const initialList = ['Pomi', 'Juanpa', 'Topo', 'Cata'];

function Box() {
  const [list, setList] = useState(initialList);

  return (
    <ScrollView>
      {list.map((e, i) => (
        <Animated.View
          key={i}
          entering={SlideInRight}
          exiting={SlideOutRight}
          style={styles.listElement}>
          <Text>{e}</Text>
        </Animated.View>
      ))}
      <TouchableOpacity
        onPress={() => {
          setList([...list, 'hola']);
        }}
        style={{alignSelf: 'center', marginVertical: 30}}>
        <Text style={{color: '#1767AE', textDecorationLine: 'underline'}}>
          Add Item
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setList(list.slice(0, list.length - 1));
        }}
        style={{alignSelf: 'center', marginBottom: 30}}>
        <Text style={{color: '#1767AE', textDecorationLine: 'underline'}}>
          Remove Item
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#1767AE',
    marginVertical: 15,
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  listElement: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#ffbe76',
  },
});

export default () => {
  return (
    <View style={{flex: 1}}>
      <Box />
    </View>
  );
};
