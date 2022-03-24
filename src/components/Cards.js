import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Card from './Card';

const Cards = ({list, square, removeItem}) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={[{flex: 1}, square && styles.wrap]}>
          {list.map((item, index) => (
            <Card
              square={square}
              hotel={item}
              onPress={() => removeItem(index)}
              key={item.name}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

export default Cards;
