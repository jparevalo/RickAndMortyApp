import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Character } from '../interfaces/characterInterface';
import CharacterCard from './CharacterCard';

interface Props {
  title?: string;
  characters: Character[];
}
const HorizontalSlider = ({ title, characters }: Props ) => {
  
  return (
    <View style={{ height: (title)? 260: 230}} >
      {
        // true && true
        title && <Text style={styles.titulo}>{title}</Text>
      }
      <FlatList 
        data={characters}
        renderItem={({ item }) => (<CharacterCard character={item} width={140} height={200}/>)}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default HorizontalSlider

const styles = StyleSheet.create({
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10
  }
})