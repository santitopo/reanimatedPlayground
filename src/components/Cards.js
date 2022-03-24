import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {hotels} from '../data/hotels';
import Card from './Card';

const Cards = ({list, removeItem}) => {
  return (
    <ScrollView style={{flex: 1}}>
      {list.map((h, index) => (
        <Card
          key={`${h.name}+${index}`}
          hotel={h}
          onPress={() => removeItem(index)}
        />
      ))}
    </ScrollView>
  );
};

export default Cards;
