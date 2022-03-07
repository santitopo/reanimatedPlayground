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

function Ball() {
  //Ball 1
  const pressed = useSharedValue(false);
  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#FEEF86' : '#1767AE',
      transform: [{scale: withSpring(pressed.value ? 1.2 : 1)}],
    };
  });

  const eventHandler = Gesture.Pan()
    .onBegin((event, ctx) => {
      pressed.value = true;
    })
    .onFinalize((event, ctx) => {
      pressed.value = false;
    });

  //Ball 2
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({x: 0, y: 0});
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withSpring(offset.value.x)},
        {translateY: withSpring(offset.value.y)},
        {scale: withSpring(isPressed.value ? 1.2 : 1)},
      ],
      backgroundColor: isPressed.value ? '#772E25' : '#1767AE',
    };
  });
  const start = useSharedValue({x: -0, y: 0});
  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
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

  return (
    <>
      <GestureDetector gesture={eventHandler}>
        <Animated.View style={[styles.ball, uas]} />
      </GestureDetector>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.ball, animatedStyles]} />
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
      <Ball />
    </View>
  );
};
