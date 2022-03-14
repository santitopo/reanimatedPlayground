import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

function Box() {
  const radius = useSharedValue(50);
  const animatedProps = useAnimatedProps(() => {
    // draw a circle
    const path = `
      M 100, 100
      m -${radius.value}, 0
      a ${radius.value},${radius.value} 0 1,0 ${radius.value * 2},0
      a ${radius.value},${radius.value} 0 1,0 ${-radius.value * 2},0
      `;
    return {
      d: path,
      fill: `rgba(20,222,129,${radius.value / 50 - 0.5})`,
    };
  });

  // attach animated props to an SVG path using animatedProps
  return (
    <>
      <View style={{flex: 1, borderWidth: 2, alignItems: 'center'}}>
        <Svg>
          <AnimatedPath animatedProps={animatedProps} />
        </Svg>
      </View>
      <View style={{flex: 1}}>
        <Button
          title="Random size"
          onPress={() => {
            radius.value = withSpring((Math.random() + 0.5) * 50);
          }}
        />
      </View>
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
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Box />
    </View>
  );
};
