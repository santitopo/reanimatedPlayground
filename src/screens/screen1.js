import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

function Box() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255),
        },
      ],
    };
  });

  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} />
      {/*
      #1
      <Button onPress={() => (offset.value = Math.random())} title="Move" /> */}

      <Button
        //onPress={() => (offset.value = withSpring(Math.random()))}
        onPress={() => (offset.value = Math.random())}
        title="Move"
      />
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#1767AE',
    height: 100,
    width: 100,
    borderRadius: 20,
  },
});

export default () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Box />
    </View>
  );
};
