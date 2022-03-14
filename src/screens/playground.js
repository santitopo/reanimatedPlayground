import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

function Box() {
  const widthRatio = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withSpring(widthRatio.value * 100),
    };
  });

  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button onPress={() => (widthRatio.value = Math.random())} title="Move" />
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
    alignSelf: 'center',
  },
});

export default () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Box />
    </View>
  );
};
