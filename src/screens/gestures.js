import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {Gesture, PanGestureHandler} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withDecay,
  cancelAnimation,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

function Balls() {
  //Ball 1
  const pressed = useSharedValue(false);
  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#772E25' : '#1767AE',
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
  //const offset = useSharedValue({x: 0, y: 0});
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offsetX.value},
        {translateY: offsetY.value},
        {scale: withSpring(isPressed.value ? 1.2 : 1)},
      ],
      backgroundColor: isPressed.value ? '#772E25' : '#1767AE',
    };
  });

  const gestureHandler2 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      isPressed.value = true;
      cancelAnimation(offsetX);
      cancelAnimation(offsetY);
      ctx.start = {
        x: offsetX.value,
        y: offsetY.value,
      };
    },
    onActive: (e, ctx) => {
      offsetX.value = withSpring(ctx.start.x + e.translationX);
      offsetY.value = withSpring(ctx.start.y + e.translationY);
    },
    onEnd: (_, ctx) => {
      isPressed.value = false;
      offsetX.value = withSpring(ctx.start.x);
      offsetY.value = withSpring(ctx.start.y);
    },
  });

  //Ball 3
  const isPressed3 = useSharedValue(false);
  const offset3 = useSharedValue({x: 0, y: 0});

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

  //Ball 4
  const isPressed4 = useSharedValue(false);
  const x4 = useSharedValue(0);

  const animatedStyle4 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x4.value,
        },
        {scale: withSpring(isPressed4.value ? 1.2 : 1)},
      ],
      backgroundColor: isPressed4.value ? '#772E25' : '#1767AE',
    };
  });

  const gestureHandler4 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      isPressed4.value = true;
      ctx.startX = x4.value;
    },
    onActive: (event, ctx) => {
      x4.value = ctx.startX + event.translationX;
    },
    onEnd: evt => {
      x4.value = withDecay({
        velocity: evt.velocityX,
        velocityFactor: 1,
        clamp: [-200, 200], // optionally define boundaries for the animation
      });
    },
    onFinish: evt => {
      isPressed4.value = false;
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
      <PanGestureHandler onGestureEvent={gestureHandler4}>
        <Animated.View style={[styles.ball, animatedStyle4]} />
      </PanGestureHandler>

      <Button
        title="Move ball 2"
        onPress={() => (offsetX.value = withTiming(150, {duration: 3000}))}
      />
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
    <SafeAreaView style={{flex: 1}}>
      <Balls />
    </SafeAreaView>
  );
};
