import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
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

  const gestureHandler1 = useAnimatedGestureHandler({
    onStart: _ => {
      pressed.value = true;
    },
    onFinish: _ => {
      pressed.value = false;
    },
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

  const gestureHandler2 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      isPressed.value = true;
      ctx.start = {
        x: offset.value.x,
        y: offset.value.y,
      };
    },
    onActive: (e, ctx) => {
      offset.value = {
        x: ctx.start.x + e.translationX,
        y: ctx.start.y + e.translationY,
      };
    },
    onEnd: (_, ctx) => {
      isPressed.value = false;
      offset.value = {
        x: ctx.start.x,
        y: ctx.start.y,
      };
    },
  });

  //Ball 3
  const isPressed3 = useSharedValue(false);
  const offset3 = useSharedValue({x: 0, y: 50});

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

  const gestureHandler3 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      isPressed3.value = true;
      ctx.start = {
        x: offset3.value.x,
        y: offset3.value.y,
      };
    },
    onActive: (e, ctx) => {
      offset3.value = {
        x: ctx.start.x + e.translationX,
        y: ctx.start.y + e.translationY,
      };
    },
    onFinish: _ => {
      isPressed3.value = false;
    },
  });

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler1}>
        <Animated.View style={[styles.ball, animatedStyle1]} />
      </PanGestureHandler>
      <PanGestureHandler onGestureEvent={gestureHandler2}>
        <Animated.View style={[styles.ball, animatedStyle2]} />
      </PanGestureHandler>
      <PanGestureHandler onGestureEvent={gestureHandler3}>
        <Animated.View style={[styles.ball, animatedStyle3]} />
      </PanGestureHandler>
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
