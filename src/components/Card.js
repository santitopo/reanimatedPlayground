import React from 'react';
import {Image, TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import Animated, {SlideInRight, SlideOutRight} from 'react-native-reanimated';

const defaultUrl = {
  uri: 'https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg',
};

const Card = ({hotel, onPress}) => {
  return (
    <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={hotel.url} />
            <View style={styles.subContainer}>
              <Text style={styles.title}>{hotel.name}</Text>
              <Text style={styles.subtitle}>{hotel.place}</Text>
            </View>
            <View style={styles.placeholder} />
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
              <View style={styles.button}>
                <Text style={styles.buttonLabel}>Book now</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
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

export default Card;
