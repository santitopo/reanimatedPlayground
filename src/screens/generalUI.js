import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTab from '../components/BottomTab';
import Cards from '../components/Cards';
import {hotels} from '../data/hotels';

const GeneralScreen = () => {
  const [list, setList] = useState([]);

  const onPress = () => {
    setList(current => {
      const newItem = hotels.find(item => current.indexOf(item) === -1);
      return [...current, newItem];
    });
  };

  const remove = removedIndex => {
    setList(current => {
      return current.filter((_, index) => removedIndex !== index);
    });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Cards removeItem={remove} list={list} />
      <BottomTab setList={setList} onPress={onPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#273c75',
  },
});

export default GeneralScreen;
