import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

function Box() {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  return (
    <>
      <Animated.View style={[styles.box, animatedStyle]} />

      <Button
        onPress={() => (rotation.value = withRepeat(withTiming(20), 6, true))}
        title="wobble (repeat)"
      />
      <Button
        onPress={() =>
          (rotation.value = withSequence(
            withTiming(-10, {duration: 100}),
            withRepeat(withTiming(20, {duration: 200}), 6, true),
            withTiming(0, {duration: 100}),
          ))
        }
        title="swing (sequence)"
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
});

export default () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Box />
    </View>
  );
};
