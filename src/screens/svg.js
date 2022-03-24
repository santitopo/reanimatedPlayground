import React from 'react';
import {Button, View} from 'react-native';

import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedProps,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

function Box() {
  const radius = useSharedValue(50);
  const animatedProps = useAnimatedProps(() => {
    // draw a circle
    const path = `
        M200 ${radius.value}
        L250 65
        L${radius.value} 25
        L25 ${radius.value}
        L${radius.value} 300
      `;
    return {
      d: path,
      fill: `rgba(20,222,129,${radius.value / 50 - 0.5})`,
      stroke: 'red',
    };
  });

  // attach animated props to an SVG path using animatedProps
  return (
    <>
      <View style={{flex: 1}}>
        <Svg>
          <AnimatedPath animatedProps={animatedProps} />
        </Svg>
      </View>
      <View style={{flex: 1}}>
        <Button
          title="Random size and opacity"
          onPress={() => {
            radius.value = withSpring((Math.random() + 0.5) * 250);
          }}
        />
      </View>
    </>
  );
}

export default () => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <Box />
    </SafeAreaView>
  );
};
