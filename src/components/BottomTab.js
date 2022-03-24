import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import Card from './Card';
import PlusButton from './PlusButton';

const BottomTab = ({onPress}) => {
  const {width} = useWindowDimensions();
  return (
    <View>
      <View style={[styles.round, styles.center, {width}]}>
        <PlusButton onPress={onPress} />
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
  center: {
    alignItems: 'center',
  },
  image: {
    height: 25,
    width: 25,
    tintColor: 'white',
  },
  round: {
    height: 80,
    borderTopLeftRadius: 35,
    borderTopEndRadius: 35,
    backgroundColor: '#0097e6',
  },
});

export default BottomTab;
