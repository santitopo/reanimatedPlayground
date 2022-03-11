import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  TapGestureHandler,
} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

function Balls() {
  //Ball 1
  const pressed = useSharedValue(false);
  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#FEEF86' : '#1767AE',
      transform: [{scale: withSpring(pressed.value ? 1.2 : 1)}],
    };
  });

  const gesture1 = Gesture.Pan()
    .onBegin((event, ctx) => {
      pressed.value = true;
    })
    .onFinalize((event, ctx) => {
      pressed.value = false;
    });

  //Ball 2
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: -0, y: 0});

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withSpring(offset.value.x)},
        {translateY: withSpring(offset.value.y)},
        {scale: withSpring(isPressed.value ? 1.2 : 1)},
      ],
      backgroundColor: isPressed.value ? '#772E25' : '#1767AE',
    };
  });

  const gesture2 = Gesture.Pan()
    .onStart(() => {
      isPressed.value = true;
    })
    .onUpdate(e => {
      offset.value = {
        x: start.value.x + e.translationX,
        y: start.value.y + e.translationY,
      };
    })
    .onEnd(() => {
      offset.value = {
        x: start.value.x,
        y: start.value.y,
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  //Ball 3
  const isPressed3 = useSharedValue(false);
  const offset3 = useSharedValue({x: 0, y: 50});
  const start3 = useSharedValue(null);

  const animatedStyle3 = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withSpring(offset3.value.x)},
        {translateY: withSpring(offset3.value.y)},
        {scale: withSpring(isPressed3.value ? 1.2 : 1)},
      ],
      backgroundColor: isPressed3.value ? '#772E25' : '#1767AE',
    };
  });

  const gesture3 = Gesture.Pan()
    .onStart(() => {
      isPressed3.value = true;
      start3.value = {
        x: offset3.value.x,
        y: offset3.value.y,
      };
    })
    .onUpdate(e => {
      offset3.value = {
        x: start3.value.x + e.translationX,
        y: start3.value.y + e.translationY,
      };
    })
    .onEnd(() => {
      start3.value = {
        x: offset3.value.x,
        y: offset3.value.y,
      };
    })
    .onFinalize(() => {
      isPressed3.value = false;
    });

  return (
    <>
      <GestureDetector gesture={gesture1}>
        <Animated.View style={[styles.ball, animatedStyle1]} />
      </GestureDetector>
      <GestureDetector gesture={gesture2}>
        <Animated.View style={[styles.ball, animatedStyle2]} />
      </GestureDetector>
      <GestureDetector gesture={gesture3}>
        <Animated.View style={[styles.ball, animatedStyle3]} />
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#1767AE',
    alignSelf: 'center',
    marginVertical: 15,
  },
});

export default () => {
  return (
    <View style={{flex: 1}}>
      <Balls />
    </View>
  );
};
