import React from 'react';
import {Image, TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  Layout,
  runOnJS,
  SlideInRight,
  SlideOutRight,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const defaultUrl = {
  uri: 'https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg',
};

const Button = () => {
  return (
    <View style={styles.button}>
      <Text style={styles.buttonLabel}>Book now</Text>
    </View>
  );
};

const Card = ({square, hotel}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={hotel.url} />
        <View style={{flex: 1, flexDirection: square ? 'column' : 'row'}}>
          <View style={styles.subContainer}>
            <Text
              allowFontScaling={square}
              numberOfLines={1}
              style={styles.title}>
              {hotel.name}
            </Text>
            <Text style={styles.subtitle}>{hotel.place}</Text>
          </View>
          {!square && <View style={styles.placeholder} />}
          <View>
            <View style={styles.row}>
              <View style={styles.placeholder} />
              <Image
                source={{
                  uri: 'https://cdn.picpng.com/star/star-icon-black-favorite-rating-73483.png',
                }}
                style={styles.starImage}
              />
              <Text style={styles.ratingText}>{hotel.stars}</Text>
            </View>
            <View style={styles.placeholder} />
            {!square && <Button />}
          </View>
        </View>
      </View>

      {square && <Button />}
    </View>
  );
};

const Wrapper = props => {
  //const pressed = useSharedValue(false);
  const offset = useSharedValue(0);
  const {width} = useWindowDimensions();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(offset.value)}],
    };
  });

  const deleteStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        `rgba(192, 57, 43,${offset.value / (width / 2)})`,
        {duration: 100},
      ),
    };
  });

  const trashStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(offset.value / (width / 2), {duration: 100}),
      transform: [
        {
          scale: interpolate(offset.value, [0, width / 2], [1, 1.6], {
            extrapolateRight: Extrapolation.CLAMP,
          }),
        },
      ],
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      //cancelAnimation(offset);
      ctx.start = offset.value;
    },
    onActive: (e, ctx) => {
      if (e.translationX > ctx.start) {
        offset.value = ctx.start + e.translationX;
      }
    },
    onEnd: (_, ctx) => {
      if (offset.value > width * (props.square ? 0.25 : 0.5)) {
        runOnJS(props.onPress)();
      } else {
        offset.value = ctx.start;
      }
    },
  });

  return (
    <Animated.View
      entering={SlideInRight}
      layout={Layout.springify()}
      style={{width: props.square ? '50%' : '100%'}}>
      {!props.square && (
        <Animated.View style={[styles.deleteContainer, {width}, deleteStyle]}>
          <Animated.Image
            style={[{tintColor: 'white', width: 30, height: 30}, trashStyle]}
            source={{
              uri: 'https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png',
            }}
          />
        </Animated.View>
      )}

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          exiting={SlideOutRight}
          style={[{flex: 1}, animatedStyle]}>
          <Card {...props} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  delete: {
    position: 'absolute',
    backgroundColor: '#c0392b',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0097e6',
    padding: 8,
    borderRadius: 8,
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 5,
  },
  container: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  deleteContainer: {
    position: 'absolute',
    marginTop: 10,
    justifyContent: 'center',
    paddingHorizontal: 50,
    height: 105,
  },
  starImage: {
    tintColor: '#fbc531',
    width: 25,
    height: 25,
  },
  placeholder: {
    flex: 1,
  },
  subContainer: {
    paddingHorizontal: 10,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
});

export default Wrapper;
