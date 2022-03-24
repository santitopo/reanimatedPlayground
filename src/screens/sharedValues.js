import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDecay,
  withDelay,
} from 'react-native-reanimated';

function Boxes() {
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
  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255, {
            damping: 200,
            stiffness: 90, //rigidez
          }),
        },
      ],
    };
  });
  const widthAnimationStyle = useAnimatedStyle(() => {
    return {
      width: withDelay(200, withTiming(offset.value * 255)),
    };
  });

  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Animated.View style={[styles.box, customSpringStyles]} />
      <Animated.View style={[styles.redBox, widthAnimationStyle]} />
      <Button
        //onPress={() => (offset.value = withSpring(Math.random()))}
        onPress={() => {
          offset.value = Math.random();
        }}
        title="Move"
      />
    </>
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
  redBox: {
    backgroundColor: '#c0392b',
    marginVertical: 15,
    height: 10,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
  },
});

export default () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Boxes />
    </View>
  );
};
