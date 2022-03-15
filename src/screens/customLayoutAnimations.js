import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import Animated, {withTiming, SlideInRight} from 'react-native-reanimated';

const initialList = ['Pomi', 'Juanpa', 'Topo', 'Cata'];

const {width} = Dimensions.get('window');

function Box() {
  const [list, setList] = useState(initialList);

  const exiting = values => {
    'worklet';
    const animations = {
      originX: withTiming(width, {duration: 1000}),
    };
    const initialValues = {
      originX: values.currentOriginX,
      opacity: 1,
    };
    return {
      initialValues,
      animations,
    };
  };

  return (
    <ScrollView>
      {list.map((e, i) => (
        <Animated.View
          key={i}
          entering={SlideInRight}
          exiting={exiting}
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
