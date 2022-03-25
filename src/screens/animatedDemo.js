import {Animated, Button, StyleSheet, View} from 'react-native';
import React, {useRef, useEffect} from 'react';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

export default function AnimatedDemo() {
  const value = useRef(new Animated.Value(0)).current;
  const {width: deviceWidth} = useWindowDimensions();
  const animatedwidth = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, deviceWidth],
  });

  const toggle = () => {
    Animated.timing(value, {
      toValue: Math.random(),
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  //--- Uncomment for heavy work ----

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     for (let i = 0; i < 100000000; i++) {}
  //   }, 0);

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <View style={styles.main}>
      <Animated.View style={[styles.button, {width: animatedwidth}]} />
      <Button title="toggle" onPress={toggle} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 120,
    flex: 1,
    flexDirection: 'column',
  },
  button: {height: 80, backgroundColor: 'black', margin: 30},
});
