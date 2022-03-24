import React, {useState, useReducer} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTab from '../components/BottomTab';
import Cards from '../components/Cards';
import {hotels} from '../data/hotels';

const Squares = () => {
  return (
    <Image
      style={{tintColor: 'white', height: 50, width: 50}}
      source={{
        uri: 'https://i.pinimg.com/originals/8b/5c/49/8b5c498ed69a64d629249d9abe4f44a6.png',
      }}
    />
  );
};

const GeneralScreen = () => {
  const [list, setList] = useState([]);
  const [squares, toggle] = useReducer(p => !p, false);

  const onPress = () => {
    setList(current => {
      const newItem = hotels.find(item => current.indexOf(item) === -1);
      return newItem ? [...current, newItem] : [...current];
    });
  };

  const remove = removedIndex => {
    setList(current => {
      return current.filter((_, index) => removedIndex !== index);
    });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Cards square={squares} removeItem={remove} list={list} />
      <BottomTab setList={setList} onPress={onPress} />
      <TouchableOpacity style={{position: 'absolute'}} onPress={() => toggle()}>
        <Squares />
      </TouchableOpacity>
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
