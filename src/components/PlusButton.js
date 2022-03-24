import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const PlusButton = ({onPress}) => {
  return (
    <View style={styles.round}>
      <View style={styles.aligned}>
        <TouchableOpacity onPress={onPress}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://cdn0.iconfinder.com/data/icons/ui-16px-perfect-megapack-line/16/82_Add-512.png',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aligned: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: 25,
    width: 25,
    tintColor: 'white',
  },
  round: {
    position: 'absolute',
    top: -30,
    height: 60,
    width: 60,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 50,
    backgroundColor: '#0097e6',
  },
});

export default PlusButton;
